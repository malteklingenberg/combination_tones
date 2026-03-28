<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const path = $derived(page.url.pathname);
	const homeBtnClass = $derived(
		`btn btn-sm uppercase tracking-wider btn-primary ${path === '/' ? 'btn-outline' : 'btn-ghost'}`
	);
	const aboutBtnClass = $derived(
		`btn btn-sm uppercase tracking-wider btn-primary ${path === '/about' ? 'btn-outline' : 'btn-ghost'}`
	);
</script>

<header class="navbar bg-base-100/80 shadow-sm backdrop-blur-sm">
	<div class="navbar-start"></div>
	<div class="navbar-center gap-1">
		<a class={homeBtnClass} href={resolve('/')}>Home</a>
		<a class={aboutBtnClass} href={resolve('/about')}>About</a>
	</div>
	<div class="navbar-end"></div>
</header>
