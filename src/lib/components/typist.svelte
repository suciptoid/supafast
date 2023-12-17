<script lang="ts">
	export let baseText = 'the quick brown fox jumps over the lazy dog';
	let typedText = '';
	let startAt: number;
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

	function onKeyDown(e: KeyboardEvent) {
		if (!startAt) {
			startAt = Date.now();
			startTimer();
		}

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

	function startTimer() {
		timer = setInterval(() => {
			elapsed = Math.round((Date.now() - startAt) / 1000);
		}, 1000);
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="typist text-2xl leading-10 text-center font-medium w-full max-w-4xl">
	{elapsed}s / {wpm} wpm
	<div>
		{#each display as { word, typed, correct, passed }, i}
			<span
				class="relative {correct && passed
					? 'text-blue-600'
					: !passed
						? 'text-gray-500'
						: 'text-red-500'}"
			>
				{word}
				{#if currentWordIndex === i}
					<span class="text-blue-600 z-10 absolute left-0">{typed}</span>
				{/if}
			</span>
		{/each}
	</div>

	<!-- <div>typed: {typedText}</div> -->
</div>
