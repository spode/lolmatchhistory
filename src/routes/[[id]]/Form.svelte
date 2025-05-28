<script lang="ts">
	import { enhance } from '$app/forms';
	let creating = $state(false);
</script>

<form
	class="group block flex-1 space-y-3 rounded-lg p-4 shadow-lg ring-1 ring-gray-900/5 dark:bg-white/5 dark:ring-white/10"
	method="POST"
	action="?/create"
	use:enhance={() => {
		creating = true;
		return async ({ update }) => {
			await update();
			creating = false;
		};
	}}
>
	<label class="block">
		<textarea
			placeholder="Enter summoners..."
			name="summoners"
			required
			autocomplete="off"
			class="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800"
			rows="3"
		></textarea>
	</label>

	<input
		class="rounded-md bg-sky-500 px-5 py-2.5 text-sm leading-5 font-semibold text-white hover:bg-sky-700 dark:bg-gray-800"
		id="mySubmit"
		type="submit"
	/>
	{#if creating}
		<p>loading more data.....</p>
	{/if}
</form>
