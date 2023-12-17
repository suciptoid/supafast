import { type User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const user = writable<User | undefined>(undefined);
export const room = writable<string>('global');
export const onlineCount = writable<number>(0);
