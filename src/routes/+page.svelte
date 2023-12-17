<script lang="ts">
	import Profile from '$lib/components/profile.svelte';
	import Room from '$lib/components/room.svelte';
	import Typist from '$lib/components/typist.svelte';
	import { room } from '$lib/store';
</script>

<svelte:head>
	<title>Supa Fast - Challenge Your Typing Speed</title>
</svelte:head>

<Profile />
<Room />

<main>
	<div class="flex items-center justify-center mt-20">
		<Typist
			baseText="The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How razorback-jumping frogs can level six piqued gymnasts! Mr Jock, TV quiz PhD, bags few lynx. Crazy Fredericka bought many very exquisite opal jewels. Sixty zippers were quickly picked from the woven jute bag. A quick movement of the enemy will jeopardize six gunboats."
		/>
	</div>
</main>
