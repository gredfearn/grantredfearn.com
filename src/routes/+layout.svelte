<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '@themesberg/windows-95-ui-kit/css/w95.css';
	import './styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Grant Redfearn</title>
</svelte:head>

{@render children()}
