<script lang="ts">
	import { user } from '$lib/store';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	function login() {
		supabase.auth.signInWithOAuth({ provider: 'google' });
	}
	function logout() {
		supabase.auth.signOut();
	}

	onMount(() => {
		supabase.auth.onAuthStateChange((_evt, session) => {
			user.set(session?.user);
		});
	});
</script>

<div
	id="profile"
	class="absolute top-0 left-0 px-4 py-2 flex items-center gap-3 text-sm font-medium"
>
	{#if $user}
		<div class="text-sm font-medium text-blue-600">
			{$user.user_metadata.full_name || $user.email}
		</div>
		<button on:click={logout}>logout</button>
	{:else}
		<button on:click={login}>Sign In With Google</button>
	{/if}
</div>
