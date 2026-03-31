<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<main class="container mt-6 mx-auto box-border flex flex-1 flex-col px-4 py-4 sm:px-6">
		{@render children()}
	</main>
</div>
