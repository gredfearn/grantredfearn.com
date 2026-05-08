<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';

	interface Technology {
		name: string;
		category: string;
		description: string;
		url: string;
	}

	const technologies: Technology[] = [
		{
			name: 'SvelteKit',
			category: 'Framework',
			description: 'Modern web framework with server-side rendering',
			url: 'https://kit.svelte.dev/'
		},
		{
			name: 'Svelte 5',
			category: 'UI Library',
			description: 'Reactive component framework with runes',
			url: 'https://svelte.dev/'
		},
		{
			name: 'TypeScript',
			category: 'Language',
			description: 'Typed superset of JavaScript',
			url: 'https://www.typescriptlang.org/'
		},
		{
			name: 'Vite',
			category: 'Build Tool',
			description: 'Fast development server and bundler',
			url: 'https://vitejs.dev/'
		},
		{
			name: 'CSS3',
			category: 'Styling',
			description: 'Modern CSS with animations and grid',
			url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
		},
		{
			name: 'AWS S3',
			category: 'Storage',
			description: 'Cloud object storage for images (planned)',
			url: 'https://aws.amazon.com/s3/'
		}
	];

	const categories = [...new Set(technologies.map(t => t.category))];
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">About - Grant Redfearn</div>
			<div class="title-bar-controls">
				<button aria-label="Minimize"></button>
				<button aria-label="Maximize"></button>
				<button aria-label="Close"></button>
			</div>
		</div>
		<div class="window-body">
			<h1>About This Website</h1>
			<p>This website is a modern personal portfolio built with cutting-edge web technologies and a sleek dark design featuring twinkling stars and a clean green accent color.</p>

			<h2>Technologies Used</h2>

			{#each categories as category}
				<section class="tech-section">
					<h3>{category}</h3>
					<div class="tech-grid">
						{#each technologies.filter(t => t.category === category) as tech}
							<div class="tech-card">
								<div class="tech-header">
									<strong>{tech.name}</strong>
								</div>
								<p>{tech.description}</p>
								<a href={tech.url} target="_blank" rel="noopener noreferrer">Learn more →</a>
							</div>
						{/each}
					</div>
				</section>
			{/each}

			<h2>Design Philosophy</h2>
			<ul>
				<li><strong>Dark Theme:</strong> Easy on the eyes with a modern aesthetic</li>
				<li><strong>Green Accent:</strong> Emerald green (#10b981) provides visual interest</li>
				<li><strong>Starfield Navigation:</strong> Nostalgic twinkling stars effect</li>
				<li><strong>Clean Typography:</strong> Modern sans-serif fonts for readability</li>
				<li><strong>Responsive Design:</strong> Works seamlessly on desktop and mobile</li>
			</ul>

			<h2>Open Source</h2>
			<p>This website is built with open source technologies and modern web standards. Feel free to explore the code and reach out with any questions!</p>
		</div>
	</div>
</div>

<style>
	.tech-section {
		margin: 30px 0;
	}

	.tech-section h3 {
		color: var(--accent-green);
		font-size: 18px;
		margin-bottom: 15px;
		border-bottom: 1px solid var(--divider);
		padding-bottom: 8px;
	}

	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 15px;
		margin-bottom: 20px;
	}

	.tech-card {
		background: var(--bg-elevated);
		padding: 16px;
		border-radius: 8px;
		border: 1px solid var(--border);
		transition: transform 0.2s, border-color 0.2s;
	}

	.tech-card:hover {
		transform: translateY(-2px);
		border-color: var(--accent-green);
	}

	.tech-header {
		margin-bottom: 8px;
	}

	.tech-header strong {
		color: var(--text-primary);
		font-size: 16px;
	}

	.tech-card p {
		color: var(--text-secondary);
		font-size: 14px;
		margin: 8px 0;
		line-height: 1.5;
	}

	.tech-card a {
		color: var(--accent-green);
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
	}

	.tech-card a:hover {
		color: var(--accent-green-light);
	}

	ul {
		color: var(--text-secondary);
		line-height: 1.8;
	}

	ul strong {
		color: var(--text-primary);
	}
</style>
