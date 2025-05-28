<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex h-full flex-col overflow-auto px-4">
	{@render children()}
</div>

<svelte:head>
	<title>are we tilted</title>
</svelte:head>
