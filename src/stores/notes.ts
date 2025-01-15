import { writable } from 'svelte/store';

import type { Notes } from '$types/Note';

export const notes = writable<Notes>(Object.create({}));
export const isNoteSaving = writable(false);
export const isNoteSaveFailed = writable(false);
