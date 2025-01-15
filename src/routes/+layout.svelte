<script lang="ts">
	// Styles
	import '$static/styles/smui.css';
	import '$static/styles/app.css';

	// Custom components
	import CreateNote from '$components/CreateNote.svelte';
	import NoteSelector from '$components/NoteSelector.svelte';

	// Stores
	import { notes } from '$stores/notes';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: notes.set(data.savedNotes);
</script>

<div class="h-full flex flex-row">
	<div class="fixed w-80 flex flex-col bg-neutral-700 h-full">
		<aside
			class="fixed h-[calc(100%-44px)] w-[inherit] flex flex-col overflow-auto gap-1 p-1"
		>
			{#if Object.entries($notes).length === 0}
				<span class="flex justify-center items-center h-full"
					>Nincsenek jegyzetek!</span
				>
			{:else}
				{#each Object.entries($notes) as [_, note]}
					<NoteSelector
						handle="{note.handle}"
						title="{note.title}"
						timestamp="{note.timestamp}"
					/>
				{/each}
			{/if}
		</aside>
		<div class="w-[inherit] p-1 fixed bottom-0">
			<CreateNote class="w-full" />
		</div>
	</div>
	<main
		class="fixed h-full right-0 w-[calc(100%-20rem)] overflow-auto box-border"
	>
		<slot />
	</main>
</div>
