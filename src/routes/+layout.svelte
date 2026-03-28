<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Header />

	<main class="container mx-auto box-border flex flex-1 flex-col px-4 py-4 sm:px-6">
		{@render children()}
	</main>

	<footer class="footer footer-center bg-transparent p-4 text-sm text-base-content/70">
		<p>footer text</p>
	</footer>
</div>
