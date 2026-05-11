<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// Simple markdown to HTML converter (basic support)
	function renderMarkdown(markdown: string): string {
		let html = markdown;

		// Headers
		html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
		html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
		html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

		// Bold
		html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

		// Italic
		html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

		// Links
		html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

		// Lists
		html = html.replace(/^\- (.*)$/gim, '<li>$1</li>');
		html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

		// Paragraphs
		html = html.split('\n\n').map(para => {
			if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<li>')) {
				return para;
			}
			return `<p>${para}</p>`;
		}).join('\n');

		return html;
	}
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Blog - {data.title}</div>
		</div>
		<div class="window-body">
			<div class="blog-meta">
				<span class="date">{data.date}</span>
				<a href="/blog" class="back-link">← Back to Blog</a>
			</div>

			<article class="blog-content">
				{@html renderMarkdown(data.content)}
			</article>
		</div>
	</div>
</div>

<style>
	.blog-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
		padding-bottom: 16px;
		border-bottom: 1px solid var(--divider);
	}

	.date {
		color: var(--text-secondary);
		font-size: 14px;
	}

	.back-link {
		color: var(--accent-beige);
		text-decoration: none;
		font-size: 14px;
	}

	.back-link:hover {
		color: var(--accent-beige-hover);
		text-decoration: underline;
	}

	.blog-content {
		color: var(--accent-light);
		line-height: 2;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
		font-size: 18px;
		max-width: 700px;
		letter-spacing: 0.01em;
	}

	.blog-content :global(h1) {
		color: var(--accent-light);
		margin-top: 0;
		margin-bottom: 24px;
		font-size: 32px;
		font-weight: 600;
		line-height: 1.3;
	}

	.blog-content :global(h2) {
		color: var(--accent-beige);
		margin-top: 48px;
		margin-bottom: 20px;
		font-size: 24px;
		font-weight: 600;
		line-height: 1.4;
	}

	.blog-content :global(h3) {
		color: var(--accent-light);
		margin-top: 32px;
		margin-bottom: 16px;
		font-size: 20px;
		font-weight: 600;
	}

	.blog-content :global(p) {
		margin-bottom: 24px;
		line-height: 2;
	}

	.blog-content :global(ul) {
		margin-bottom: 16px;
		padding-left: 24px;
	}

	.blog-content :global(li) {
		margin-bottom: 12px;
		color: var(--accent-light);
		line-height: 1.8;
	}

	.blog-content :global(a) {
		color: var(--accent-beige);
		text-decoration: none;
	}

	.blog-content :global(a:hover) {
		color: var(--accent-beige-hover);
		text-decoration: underline;
	}

	.blog-content :global(strong) {
		color: var(--accent-light);
		font-weight: 700;
	}

	.blog-content :global(em) {
		font-style: italic;
	}
</style>
