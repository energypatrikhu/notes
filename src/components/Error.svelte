<script lang="ts">
	// Custom components
	import CreateNote from '$components/CreateNote.svelte';

	export let text: string;
</script>

<div
	class="w-full h-full flex flex-col gap-8 justify-center items-center text-xl"
>
	<span>{text}</span>
	<CreateNote></CreateNote>
</div>
