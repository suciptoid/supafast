<script lang="ts">
	import { onMount } from 'svelte';
	import Cursor from './cursor.svelte';
	import { supabase } from '$lib/supabase';
	import { channel, myPresenceState, players, room, user } from '$lib/store';
	import type { RealtimeChannel } from '@supabase/supabase-js';

	export let baseText = 'the quick brown fox jumps over the lazy dog';
	let typedText = '';
	let startAt: number;
	let lastTouch: number;
	let elapsed: number = 0;
	let timer: number;

	$: baseWords = baseText.split(' ');
	$: typedWords = typedText.split(' ');
	$: currentWordIndex = typedWords.length - 1;
	$: wpm = Math.round(typedWords.length / (elapsed / 60));

	$: display = baseWords.map((word, i) => {
		return {
			word,
			typed: typedWords[i],
			correct: word === typedWords[i],
			passed: typedWords.length > i + 1
		};
	});

	$: if (baseWords.length == typedWords.length) {
		clearInterval(timer);
	}

	$: playerIndex = $players
		.filter((f) => !f.is_me)
		.reduce((acc: { [key: number]: any }, obj) => {
			if (obj.word_index) {
				acc[obj.word_index] = obj;
			}
			return acc;
		}, {});

	function onKeyDown(e: KeyboardEvent) {
		if (!startAt) {
			startAt = Date.now();
			startTimer();
		}
		lastTouch = Date.now();

		track();
		// console.log('my presence', channel.presence);

		const allowed = 'abcdefghijklmnopqrstuvwxyz1234567890-=!@#$%^&*()_+[]\\{}|;\':",./<>?`~'.split(
			''
		);
		if (allowed.includes(e.key.toLocaleLowerCase()) || e.code == 'Space') {
			typedText += e.key;
		} else if (e.key == 'Backspace') {
			typedText = typedText.slice(0, -1);
		} else if (e.code == 'Enter') {
			typedText += ' ';
		}
	}

	function track() {
		const state = { ...$myPresenceState };
		delete state.is_me;
		$channel?.track({
			...state,
			word_index: currentWordIndex,
			letter_index: typedText.length - 1,
			wpm: wpm
		});
	}

	function startTimer() {
		timer = setInterval(() => {
			elapsed = Math.round((Date.now() - startAt) / 1000);
		}, 1000);
	}

	onMount(() => {
		// supabase.channel(`room:${$room}`).subscribe();
	});
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="typist text-2xl leading-10 text-center font-medium w-full max-w-4xl">
	<div class="text-sm font-normal">
		<!-- {JSON.stringify(playerIndex)} -->
	</div>
	<div>
		{#each display as { word, typed, correct, passed }, i}
			<span
				class="relative {correct && passed
					? 'text-blue-500'
					: !passed
						? 'text-gray-500'
						: 'text-red-500'}"
			>
				{#if currentWordIndex === i}
					<Cursor {word} {typed} {wpm} name={$user?.user_metadata.full_name || 'Me'} />
				{:else if playerIndex[i]}
					<Cursor
						{word}
						typed={word}
						me={false}
						wpm={playerIndex[i].wpm ?? '~'}
						name={playerIndex[i].user_name}
					/>
				{:else}
					{word}
				{/if}
			</span>
		{/each}
	</div>
</div>
