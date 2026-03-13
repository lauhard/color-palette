<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "$lib/css/main.css";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<header>
		<nav>
			<ul>
				<li>
					<a href="/">CoolColorPalettes</a>
				</li>
				<li>
					<a href="/new">New</a>
				</li>
			</ul>
		</nav>
	</header>
	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		position: relative;
		height: auto;
		width: 100%;
		header {
			position: fixed;
			display: flex;
			justify-content: center;
			max-height: var(--header-height);
			height: var(--header-height);
			width: 100%;
			z-index: 100;
			background-color: var(--color-ld-white-400);
			nav {
				ul {
					display: flex;
					flex-direction: row;
					gap: 1rem;
				}
			}
		}
		main {
			height: inherit;
			padding-top: var(--header-height);
			max-width: var(--content-width);
			padding-inline: var(--side);
		}
	}
</style>
