<script lang="ts">
	import { user } from '$lib/store';

	export let word: string;
	export let typed: string;
	export let wpm: number;
	export let name: string = $user?.user_metadata.full_name || 'Guest';
	export let me: boolean = true;
</script>

<div class="inline-block">
	{#each word as letter, i}
		<letter
			class="relative inline-block {letter == typed[i]
				? 'text-blue-600'
				: typed.length > i
					? 'text-red-500'
					: 'text-gray-500'}"
		>
			{letter}
			{#if i == typed.length - 1 || (typed.length == 0 && i == 0)}
				<div
					class="{typed.length == 0 && i == 0 ? 'right-[0.75rem]' : '-right-1'} {!me
						? 'bg-pink-400'
						: 'bg-teal-400'} -xright-1 absolute whitespace-nowrap rounded-sm -top-[25px] px-3 text-white z-10 shadow text-sm py-1"
				>
					{name ?? 'Guest'}
					{isFinite(wpm) ? wpm : '~'}wpm
					<div class="relative">
						<div
							class=" -right-[8px] h-8 w-0.5 top-0 {!me ? 'bg-pink-400' : 'bg-teal-400'} absolute"
						></div>
					</div>
				</div>
			{/if}
		</letter>
	{/each}
</div>
