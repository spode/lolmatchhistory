<script lang="ts">
	import type { PageData } from './$types';

	import Form from './Form.svelte';
	import Player from './Player.svelte';

	let { data }: { data: PageData } = $props();

	// $inspect('helo', data);
</script>

<!-- <div class="grid auto-cols-max grid-flow-col">
	<div class="h-24 bg-blue-500">Item 1</div>
	<div class="h-24 bg-green-500">Item 2</div>
	<div class="h-24 bg-red-500">Item 3</div>
	<div class="h-24 bg-yellow-500">Item 4</div>
	<div class="h-24 bg-purple-500">Item 5</div>
</div> -->

<Form />

<div class="grid auto-cols-max grid-flow-col">
	{#each data.matchesDataDB.players as playerData}
		<Player {playerData} />
	{/each}
</div>
