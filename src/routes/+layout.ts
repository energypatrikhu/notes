// Libs
import { api } from '$libs/api';
import type { Notes } from '$types/Note';

// Layout types
import type { LayoutLoad } from './$types';

export const load = (async () => {
	const savedNotes: Notes = (await api.get('notes')).data;

	return {
		savedNotes,
	};
}) satisfies LayoutLoad;
