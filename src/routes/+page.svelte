<script lang="ts">
	import Profile from '$lib/components/profile.svelte';
	import Room from '$lib/components/room.svelte';
	import { room } from '$lib/store';
</script>

<svelte:head>
	<title>Supa Fast - Challenge Your Typing Speed</title>
</svelte:head>

<main>
	<Profile />
	<Room />
</main>
