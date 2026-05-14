<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const posts = data.posts;
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Blog</div>
		</div>
		<div class="window-body">

			<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
				<h1 style="margin: 0;">Blog Posts</h1>
				<a href="/rss.xml" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--accent-beige); font-size: 14px;">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M4 11a9 9 0 0 1 9 9"></path>
						<path d="M4 4a16 16 0 0 1 16 16"></path>
						<circle cx="5" cy="19" r="1"></circle>
					</svg>
					RSS Feed
				</a>
			</div>

			{#each posts as post}
				<article class="window" style="margin-bottom: 20px;">
					<div class="title-bar">
						<div class="title-bar-text">{post.title}</div>
					</div>
					<div class="window-body">
						<p><strong>Date:</strong> {post.date}</p>
						<p>{post.excerpt}</p>
						<a href="/blog/{post.slug}"><button>Read More</button></a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</div>
