<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex h-full flex-col items-center overflow-auto px-4">
	{@render children()}
</div>

<svelte:head>
	<title>banana lol!</title>
</svelte:head>
