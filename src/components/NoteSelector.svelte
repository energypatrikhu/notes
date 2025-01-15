<script lang="ts">
	// SMUI
	import Paper, { Title, Content } from '@smui/paper';

	export let handle: string;
	export let title: string;
	export let timestamp: Date;

	let isHovering = false;
</script>

<a href="/note/{handle}">
	<Paper
		class="px-4 pt-2 hover:!cursor-pointer"
		color="{isHovering ? 'secondary' : 'default'}"
		on:mouseenter="{() => (isHovering = true)}"
		on:mouseleave="{() => (isHovering = false)}"
	>
		<Title>{title}</Title>
		<Content class="float-right !text-sm !text-neutral-300">
			{new Date(timestamp).toLocaleString()}
		</Content>
	</Paper>
</a>
