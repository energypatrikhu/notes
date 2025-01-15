// Libs
import { parseSearchParams } from '$libs/parseSearchParams';
import { prisma } from '$libs/prisma';

// SvelteKit built-ins
import { error, json } from '@sveltejs/kit';

// Types
import type { RequestHandler } from './$types';

// Lekérjük a jegyzet tartalmát a handle alapján
export const GET: RequestHandler = async ({ url }) => {
	const searchParams = parseSearchParams(url.searchParams);

	if (!('handle' in searchParams)) {
		return error(400);
	}

	const note = await prisma.notes.findFirst({
		where: {
			handle: searchParams.handle as string,
		},
		select: {
			content: true,
		},
	});

	if (!note) {
		return error(404, 'Note not found');
	}

	return json(note.content);
};
