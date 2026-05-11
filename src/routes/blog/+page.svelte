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
			<div class="title-bar-text">Blog - Grant Redfearn</div>
		</div>
		<div class="window-body">

			<h1>Blog Posts</h1>

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
