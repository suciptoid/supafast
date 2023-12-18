import { RealtimeChannel, type User } from '@supabase/supabase-js';
import { derived, readable, writable } from 'svelte/store';

export type Player = {
	id: string;
	presence_ref: string | undefined;
	user_id: string | undefined;
	user_name: string | undefined;
	word_index: number;
	letter_index: number;
	wpm: number;
	is_me: boolean;
};

export const presenceId = readable<string>(crypto.randomUUID());
export const channel = writable<RealtimeChannel | undefined>(undefined);
export const user = writable<User | undefined>(undefined);
export const room = writable<string>('global');
export const onlineCount = writable<number>(0);
export const players = writable<Player[]>([]);
export const myPresenceState = derived([presenceId, players], ([id, players]) => {
	const player = players.find((p) => p.id === id);
	return player;
});
