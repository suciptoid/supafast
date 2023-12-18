<script lang="ts">
	import { channel, onlineCount, room, user, players, type Player, presenceId } from '$lib/store';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	function join() {
		$channel = supabase.channel(`room:${$room}`, {
			config: {
				presence: {
					key: $presenceId
				}
			}
		});
		$channel
			?.on('presence', { event: 'sync' }, () => {
				const presences = $channel!.presenceState();
				console.log('sync presence', $channel!.presence.joinRef, presences);

				const presencePlayers = Object.entries(presences).map(([id, presence]) => {
					const p = presence.at(0);

					return {
						id,
						is_me: $presenceId == id,
						...p
					} as Player;
				});

				players.set(presencePlayers);

				console.log('presence players', presencePlayers);

				const count = Object.keys(presences).length;
				onlineCount.set(count);
			})
			.subscribe(async (status) => {
				if (status == 'SUBSCRIBED') {
					const track = await $channel?.track({
						online: new Date().toISOString(),
						user_id: $user?.id,
						user_name: $user?.user_metadata.full_name
					});
					console.log('track', track, channel);
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
	<div class="text-gray-500 relative">
		{$players.length} online

		<div class="absolute right-0 top-5 flex items-center gap-2 bg-white z-10">
			{$players.map((p) => `${p.user_name ?? 'Guest'} ${p.is_me ? '(me)' : ''}- ${p.wpm}wpm`)}
		</div>
	</div>
</div>
