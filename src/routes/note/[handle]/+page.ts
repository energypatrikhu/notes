// Libs
import { api } from '$libs/api';

// Page types
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	try {
		const noteContent = (
			await api.get('note', {
				params: {
					handle: params.handle,
				},
			})
		).data;

		return { noteContent };
	} catch {
		return { noteContent: '' };
	}
}) satisfies PageLoad;
