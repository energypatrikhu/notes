<script lang="ts">
	// SMUI
	import Button, { Label, Icon } from '@smui/button';
	import { mdiTrashCan } from '@mdi/js';

	// Libs
	import { api } from '$libs/api';

	// Stores
	import { goto } from '$app/navigation';
	import { notes } from '$stores/notes';

	let _class = '';
	export let id: number;
	export { _class as class };

	function deleteNote() {
		const confirmDelete = confirm(
			'Biztosan törölni szeretnéd a jegyzetet?',
		);

		if (!confirmDelete) return;

		api.delete('notes', { params: { id } }).then(() => {
			notes.update((notes) => {
				delete notes[id];
				return notes;
			});

			goto('/');
		});
	}
</script>

<Button
	class="{_class}"
	variant="raised"
	on:click="{deleteNote}"
>
	<Icon
		tag="svg"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="{mdiTrashCan}"
		></path>
	</Icon>
	<Label>Jegyzet törlése</Label>
</Button>
