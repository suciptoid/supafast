<script lang="ts">
	import { onlineCount, room, user } from '$lib/store';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let channel = supabase.channel(`room:${$room}`);

	function join() {
		channel
			.on('presence', { event: 'sync' }, () => {
				const presences = channel.presenceState();
				console.log('sync presence', presences);

				const count = Object.keys(presences).length;
				onlineCount.set(count);
			})
			.subscribe(async (status) => {
				if (status == 'SUBSCRIBED') {
					await channel.track({
						online: new Date().toISOString(),
						user_id: $user?.id
					});
				}
			});
	}

	onMount(() => {
		join();
	});
</script>

<div id="room" class="absolute top-0 right-0 px-4 py-2 text-sm font-medium flex items-center gap-2">
	<div class="text-blue-600">
		{$room}
	</div>
	<div class="text-gray-500">
		{$onlineCount} online
	</div>
</div>
