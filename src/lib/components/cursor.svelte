<script lang="ts">
	import { user } from '$lib/store';

	export let word: string;
	export let typed: string;
	export let wpm: number;
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
					class="{typed.length == 0 && i == 0
						? 'right-[0.75rem]'
						: '-right-1'} -xright-1 absolute whitespace-nowrap rounded-sm bg-yellow-400 -top-[25px] px-3 text-white z-10 border-yellow-300 text-sm py-1"
				>
					{$user ? $user.user_metadata.full_name : 'Guest'}
					{isFinite(wpm) ? wpm : '~'}wpm
					<div class="relative">
						<div
							class="{i == 0 && typed.length == 0
								? 'xright-4'
								: '-xright-0'} -right-[9px] h-8 w-0.5 top-0 bg-yellow-400 absolute right-2"
						></div>
					</div>
				</div>
			{/if}
		</letter>
	{/each}
</div>
