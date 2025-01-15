<script lang="ts">
	// SMUI
	import Button, { Label, Icon } from '@smui/button';
	import { mdiPlus } from '@mdi/js';

	// Libs
	import { api } from '$libs/api';

	// Stores
	import { goto } from '$app/navigation';
	import { notes } from '$stores/notes';

	let _class = '';
	export { _class as class };

	function createNote() {
		api.put('notes').then((response) => {
			notes.update((notes) => {
				notes[response.data.id] = response.data;
				return notes;
			});

			goto(`/note/${response.data.handle}`, {
        invalidateAll: true,
      })
		});
	}
</script>

<Button
	class="{_class}"
	variant="raised"
	on:click="{createNote}"
>
	<Icon
		tag="svg"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="{mdiPlus}"
		></path>
	</Icon>
	<Label>Jegyzet létrehozása!</Label>
</Button>
