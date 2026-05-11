<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Home - Grant Redfearn</div>
		</div>
		<div class="window-body">
			<!-- Intro Section -->
			<section class="intro">
				<div class="intro-photo">
					<img src="/images/grant.jpg" alt="Grant Redfearn" />
				</div>
				<h1>Hello, I'm Grant Redfearn</h1>
				<p class="lead">Principal DevOps Engineer, astrophotographer, and musician. I build resilient platforms at scale, capture the night sky, and create experimental music. Welcome to my corner of the internet.</p>
			</section>

			<!-- What I Do Section -->
			<section class="what-i-do">
				<h2>What I Do</h2>
				<div class="cards">
					<div class="card">
						<h3>Platform Engineering</h3>
						<p>Building and operating Kubernetes platforms at scale. I specialize in infrastructure automation, developer tooling, and system reliability.</p>
						<a href="/about"><button>Learn More</button></a>
					</div>
					<div class="card">
						<h3>Astrophotography</h3>
						<p>Capturing deep sky objects from dark sky locations. From nebulae to galaxies, I document the cosmos one exposure at a time.</p>
						<a href="/astrophotography"><button>View Gallery</button></a>
					</div>
					<div class="card">
						<h3>Music Production</h3>
						<p>Creating ambient and experimental soundscapes. My work explores texture, space, and the intersection of acoustic and electronic sound.</p>
						<a href="/music"><button>Listen Now</button></a>
					</div>
				</div>
			</section>

			<!-- Latest Blog Post -->
			{#if data.latestPost}
				<section class="featured">
					<h2>Latest From The Blog</h2>
					<div class="featured-post">
						<div class="featured-content">
							<h3>{data.latestPost.title}</h3>
							<p class="date">{data.latestPost.date}</p>
							<p>{data.latestPost.excerpt}</p>
							<a href="/blog/{data.latestPost.slug}"><button>Read More</button></a>
						</div>
					</div>
				</section>
			{/if}

			<!-- CTA Section -->
			<section class="cta">
				<h2>Get In Touch</h2>
				<p>Interested in collaborating or just want to say hello? I'd love to hear from you.</p>
				<div class="cta-buttons">
					<a href="mailto:grantredfearn@gmail.com"><button>Email Me</button></a>
					<a href="https://github.com/gredfearn" target="_blank" rel="noopener noreferrer"><button>GitHub</button></a>
					<a href="https://linkedin.com/in/gredfearn" target="_blank" rel="noopener noreferrer"><button>LinkedIn</button></a>
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	.intro {
		text-align: center;
		margin-bottom: 40px;
		padding-bottom: 32px;
		border-bottom: 1px solid var(--divider);
	}

	.intro-photo {
		margin-bottom: 24px;
	}

	.intro-photo img {
		width: 180px;
		height: 180px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid var(--accent-beige);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.intro h1 {
		margin-top: 0;
		margin-bottom: 16px;
		color: var(--text-primary);
	}

	.lead {
		font-size: 18px;
		line-height: 1.6;
		color: var(--text-primary);
		max-width: 700px;
		margin: 0 auto;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 20px;
		margin-bottom: 48px;
	}

	.stat-card {
		background: var(--bg-elevated);
		padding: 24px;
		border-radius: 8px;
		border: 1px solid var(--border);
		text-align: center;
	}

	.stat-number {
		font-size: 36px;
		font-weight: 700;
		color: var(--accent-beige);
		margin-bottom: 8px;
		font-family: 'Windows 95', sans-serif;
	}

	.stat-label {
		font-size: 14px;
		color: var(--text-secondary);
	}

	.what-i-do {
		margin-bottom: 48px;
	}

	.what-i-do h2 {
		text-align: center;
		margin-bottom: 32px;
		color: var(--accent-beige);
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 24px;
	}

	.card {
		background: var(--bg-elevated);
		padding: 24px;
		border-radius: 8px;
		border: 1px solid var(--border);
		transition: transform 0.2s, border-color 0.2s;
	}

	.card:hover {
		transform: translateY(-4px);
		border-color: var(--accent-beige);
	}

	.card h3 {
		margin-top: 0;
		margin-bottom: 12px;
		color: var(--text-primary);
	}

	.card p {
		margin-bottom: 16px;
		font-size: 15px;
		line-height: 1.5;
	}

	.card button {
		width: 100%;
	}

	.featured {
		margin-bottom: 48px;
	}

	.featured h2 {
		text-align: center;
		margin-bottom: 24px;
		color: var(--accent-beige);
	}

	.featured-post {
		background: var(--bg-elevated);
		padding: 32px;
		border-radius: 8px;
		border: 1px solid var(--border);
	}

	.featured-content h3 {
		margin-top: 0;
		margin-bottom: 8px;
		color: var(--text-primary);
	}

	.date {
		font-size: 14px;
		color: var(--text-muted);
		margin-bottom: 16px;
	}

	.featured-content p:not(.date) {
		margin-bottom: 20px;
	}

	.cta {
		text-align: center;
		padding-top: 32px;
		border-top: 1px solid var(--divider);
	}

	.cta h2 {
		margin-bottom: 16px;
		color: var(--accent-beige);
	}

	.cta p {
		margin-bottom: 24px;
		font-size: 16px;
	}

	.cta-buttons {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.cta-buttons button {
		min-width: 120px;
	}

	@media screen and (max-width: 768px) {
		.stats {
			grid-template-columns: 1fr;
		}

		.cards {
			grid-template-columns: 1fr;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: stretch;
		}

		.cta-buttons button {
			width: 100%;
		}
	}
</style>
