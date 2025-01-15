// Libs
import { parseSearchParams } from '$libs/parseSearchParams';
import { prisma } from '$libs/prisma';
import { generateHandle } from '$libs/generateHandle';
import { compareNumbers } from '$libs/compareNumbers';

// SvelteKit built-ins
import { error, json } from '@sveltejs/kit';

// Types
import type { RequestHandler } from './$types';
import type { Notes } from '$types/Note';

// CORS
export const OPTIONS: RequestHandler = async () => new Response();

// Jegyzet létrehozása
export const PUT: RequestHandler = async () => {
	const untitledNotes = await prisma.notes.findMany({
		select: {
			title: true,
		},
		where: {
			title: {
				startsWith: 'Névtelen jegyzet (',
			},
		},
		orderBy: {
			title: 'desc',
		},
	});

	const foundNumbers = [];
	for (const note of untitledNotes) {
		const foundNote = note.title.match(/Névtelen jegyzet \(\d+\)/);

		if (!foundNote) {
			continue;
		}

		foundNumbers.push(parseInt(foundNote[0].slice(18, -1)));
	}

	const lastNumber = foundNumbers.sort(compareNumbers).pop() || 0;
	const title = `Névtelen jegyzet (${lastNumber + 1})`;
	const handle = generateHandle(title);

	const note = await prisma.notes.create({
		data: {
			handle,
			title,
			content: '',
			timestamp: new Date().toISOString(),
		},
	});

	return json(note);
};

// Jegyzet törlése
export const DELETE: RequestHandler = async ({ url }) => {
	const searchParams = parseSearchParams(url.searchParams);

	if (!('id' in searchParams)) {
		return error(400, 'Missing id');
	}

	const checkIdExists = await prisma.notes.findUnique({
		where: {
			id: parseInt(searchParams.id as string),
		},
	});

	if (!checkIdExists) {
		return error(404, 'Note not found');
	}

	await prisma.notes.delete({
		where: {
			id: parseInt(searchParams.id as string),
		},
	});

	return new Response(null, { status: 204 });
};

// Jegyzet szerkesztése
export const PATCH: RequestHandler = async ({ request }) => {
	const requestData = await request.json();

	if (
		!('id' in requestData) ||
		(!('title' in requestData) && !('content' in requestData))
	) {
		return error(400, 'Missing id, title or content');
	}

	const checkIdExists = await prisma.notes.findUnique({
		where: {
			id: requestData.id,
		},
	});

	if (!checkIdExists) {
		return error(404, 'Note not found');
	}

	const checkTitleExists = await prisma.notes.findFirst({
		select: {
			id: true,
			title: true,
		},
		where: {
			title: requestData.title,
		},
	});

	if (
		(!checkTitleExists || checkTitleExists.id !== requestData.id) &&
		checkIdExists.title === requestData.title
	) {
		return error(400, 'Title is the same');
	}

	const handle = generateHandle(requestData.title);

	const note = await prisma.notes.update({
		select: {
			id: true,
			handle: true,
			title: true,
			timestamp: true,
		},
		where: {
			id: requestData.id,
		},
		data: {
			title: requestData.title,
			handle,
			content: requestData.content,
			timestamp: new Date().toISOString(),
		},
	});

	return json(note);
};

// Jegyzetek lekérése
export const GET: RequestHandler = async () => {
	const savedNotes = await prisma.notes.findMany({
		select: {
			id: true,
			handle: true,
			title: true,
			timestamp: true,
		},
	});

	const notes: Notes = {};
	for (const note of savedNotes) {
		notes[note.id] = note;
	}

	return json(notes);
};
