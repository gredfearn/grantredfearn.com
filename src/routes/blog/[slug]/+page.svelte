<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// Configure marked with highlight.js
	marked.use(markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	}));

	marked.setOptions({
		breaks: true,
		gfm: true
	});

	// Render markdown to HTML
	const htmlContent = $derived(marked.parse(data.content) as string);
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
				{@html htmlContent}
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

	.blog-content :global(pre) {
		background-color: var(--bg-elevated);
		color: var(--accent-light);
		padding: 16px;
		border-radius: 4px;
		overflow-x: auto;
		margin: 24px 0;
		border: 1px solid var(--border);
	}

	.blog-content :global(pre code) {
		background: none;
		padding: 0;
		color: inherit;
		font-size: 14px;
		font-family: 'Courier New', Courier, monospace;
		line-height: 1.6;
	}

	.blog-content :global(code) {
		background-color: var(--bg-elevated);
		color: var(--accent-beige);
		padding: 2px 6px;
		border-radius: 3px;
		font-family: 'Courier New', Courier, monospace;
		font-size: 14px;
		border: 1px solid var(--border);
	}

	/* Syntax highlighting with custom color palette */
	.blog-content :global(.hljs) {
		display: block;
		overflow-x: auto;
		padding: 0;
		background: transparent;
		color: var(--accent-light);
	}

	.blog-content :global(.hljs-comment),
	.blog-content :global(.hljs-quote) {
		color: #8a8c85;
		font-style: italic;
	}

	.blog-content :global(.hljs-keyword),
	.blog-content :global(.hljs-selector-tag),
	.blog-content :global(.hljs-type) {
		color: var(--accent-beige);
		font-weight: 600;
	}

	.blog-content :global(.hljs-string),
	.blog-content :global(.hljs-regexp),
	.blog-content :global(.hljs-template-variable),
	.blog-content :global(.hljs-attribute) {
		color: #a8b89f;
	}

	.blog-content :global(.hljs-number),
	.blog-content :global(.hljs-literal),
	.blog-content :global(.hljs-meta) {
		color: #b8a68c;
	}

	.blog-content :global(.hljs-function),
	.blog-content :global(.hljs-title) {
		color: var(--accent-light);
		font-weight: 600;
	}

	.blog-content :global(.hljs-variable),
	.blog-content :global(.hljs-name) {
		color: #d4d9c8;
	}

	.blog-content :global(.hljs-tag),
	.blog-content :global(.hljs-section) {
		color: var(--accent-beige);
	}

	.blog-content :global(.hljs-built_in),
	.blog-content :global(.hljs-builtin-name) {
		color: #9fa892;
	}

	.blog-content :global(.hljs-params) {
		color: #b5b9a8;
	}

	.blog-content :global(.hljs-emphasis) {
		font-style: italic;
	}

	.blog-content :global(.hljs-strong) {
		font-weight: bold;
	}
</style>
