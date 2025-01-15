<script lang="ts">
	// Libs
	import { api } from '$libs/api';

	// Stores
	import { goto } from '$app/navigation';
	import { notes, isNoteSaving, isNoteSaveFailed } from '$stores/notes';

	let titleContainer: HTMLDivElement;
	let titleContainerHeight: number;

	export let id: number;
	export let content: string;

	$: titleContainerHeight =
		titleContainer !== undefined ? titleContainer.offsetHeight : 0;
	$: note = $notes[id];

	$isNoteSaveFailed = false;

	let saveTimeout: NodeJS.Timeout;
	function handleSave() {
		clearTimeout(saveTimeout);
		saveTimeout = setTimeout(async () => {
			$isNoteSaveFailed = false;
			$isNoteSaving = true;

			try {
				const patchResponse = (
					await api.patch('notes', { ...$notes[id], content })
				).data;

				$notes[id] = patchResponse;

				if (note.handle !== patchResponse.handle) {
					goto(`/note/${patchResponse.handle}`);
				}
			} catch {
				alert('Hiba történt a mentés során!');
				$isNoteSaveFailed = true;
			}

			$isNoteSaving = false;
		}, 1000);
	}
</script>

<div class="flex flex-col top-12 absolute w-full h-[calc(100%-3rem)]">
	<div
		bind:this="{titleContainer}"
		class="z-10 top-0 absolute w-full py-2 px-4 bg-neutral-900 border-b border-b-neutral-600"
	>
		<input
			class="text-xl bg-transparent w-full outline-none"
			placeholder="Cím"
			spellcheck="{true}"
			on:keyup="{handleSave}"
			bind:value="{note.title}"
		/>
	</div>
	<textarea
		class="py-2 px-4 resize-none bg-transparent w-full outline-none absolute bottom-0"
		style="height: calc(100% - {titleContainerHeight}px);"
		bind:value="{content}"
		on:keyup="{handleSave}"
	></textarea>
</div>
