<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Grant Redfearn - Home</div>
			<div class="title-bar-controls">
				<button aria-label="Minimize"></button>
				<button aria-label="Maximize"></button>
				<button aria-label="Close"></button>
			</div>
		</div>
		<div class="window-body">
			<h1>Welcome to My Personal Website</h1>
			<p>Hello! I'm Grant Redfearn. This is my personal website built with SvelteKit and a retro Windows 95 theme.</p>

			<div class="field-row">
				<button onclick={() => window.location.href='/resume'}>View Resume</button>
				<button onclick={() => window.location.href='/blog'}>Read Blog</button>
			</div>
		</div>
	</div>
</div>
