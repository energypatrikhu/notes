<script lang="ts">
	// SMUI
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';

	// Custom components
	import Error from '$components/Error.svelte';
	import Note from '$components/Note.svelte';
	import DeleteNote from '$components/DeleteNote.svelte';

	// Stores
	import { notes, isNoteSaveFailed, isNoteSaving } from '$stores/notes';
	import { page } from '$app/stores';

	// Page Types
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ noteContent } = data);

	// Get the note from the notes store
	$: note = Object.entries($notes).find(
		([_, note]) => note.handle === $page.params.handle,
	);
</script>

<svelte:head>
	<title>{note ? `Notes - ${note[1].title}` : 'Notes'}</title>
</svelte:head>

{#if note}
	<TopAppBar
		class="w-[inherit] px-2"
		variant="fixed"
		color="secondary"
		dense
	>
		<Row>
			<Section align="start">
				<DeleteNote id="{parseInt(note[0])}" />
			</Section>
			<Section align="end">
				<div class="flex flex-col items-center">
					{#if $isNoteSaving}
						<span>Mentés folyamatban...</span>
					{:else if $isNoteSaveFailed}
						<span>Mentés sikertelen!</span>
					{:else}
						<span>Utoljára módosítva:</span>
						<span
							>{new Date(
								note[1].timestamp,
							).toLocaleString()}</span
						>
					{/if}
				</div>
			</Section>
		</Row>
	</TopAppBar>

	<Note
		id="{parseInt(note[0])}"
		content="{noteContent}"
	/>
{:else}
	<Error text="Jegyzet nem található!" />
{/if}
