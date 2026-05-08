<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';

	interface BlogPost {
		id: number;
		title: string;
		date: string;
		excerpt: string;
	}

	const posts: BlogPost[] = [
		{
			id: 1,
			title: 'My First Blog Post',
			date: '2026-05-08',
			excerpt: 'This is my first blog post on my new Windows 95-themed website!'
		},
		{
			id: 2,
			title: 'Why I Love Retro UI',
			date: '2026-05-07',
			excerpt: 'Exploring the nostalgia and simplicity of Windows 95 design.'
		}
	];
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Blog - Grant Redfearn</div>
			<div class="title-bar-controls">
				<button aria-label="Minimize"></button>
				<button aria-label="Maximize"></button>
				<button aria-label="Close"></button>
			</div>
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
						<button onclick={() => alert('Blog post page coming soon!')}>Read More</button>
					</div>
				</article>
			{/each}
		</div>
	</div>
</div>
