<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';

	interface MusicEmbed {
		id: number;
		title: string;
		platform: 'bandcamp';
		albumId: string;
		description: string;
	}

	const musicEmbeds: MusicEmbed[] = [
		{
			id: 1,
			title: 'MPC Beats',
			platform: 'bandcamp',
			albumId: '1235033405',
			description: 'Sound journal, latest beats.'
		},
		{
			id: 2,
			title: 'Silver One EP',
			platform: 'bandcamp',
			albumId: '3296272892',
			description: 'All heavenly comforts rarify into air'
		},
		{
			id: 3,
			title: 'Jockabird EP',
			platform: 'bandcamp',
			albumId: '1464575648',
			description: 'Collection of songs written between 2013-2015'
		}
	];

	let isMobile = $state(false);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const checkMobile = () => {
				isMobile = window.innerWidth <= 768;
			};
			checkMobile();
			window.addEventListener('resize', checkMobile);
			return () => window.removeEventListener('resize', checkMobile);
		}
	});

	function getEmbedUrl(albumId: string) {
		const size = isMobile ? 'small' : 'large';
		const tracklist = isMobile ? '' : '/tracklist=false';
		const artwork = isMobile ? '' : '/artwork=small';
		return `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=${size}/bgcol=515751/linkcol=C2C1A5${tracklist}${artwork}/transparent=true/`;
	}
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Music</div>
		</div>
		<div class="window-body">
			<h1>My Music</h1>
            <a>A few recordings, experiments, and late-night ideas.</a>
			<div class="music-grid">
				{#each musicEmbeds as embed}
					<article class="music-card">
						<div class="music-header">
							<h3>{embed.title}</h3>
							<span class="platform-badge {embed.platform}">🎵 Bandcamp</span>
						</div>
						<p>{embed.description}</p>

						<iframe
							title="{embed.title} - Bandcamp"
							class="bandcamp-player"
							src={getEmbedUrl(embed.albumId)}
							seamless
						></iframe>

						<div style="margin-top: 16px;">
							<a href="https://grantredfearn.bandcamp.com/album/jockabird-ep" target="_blank" rel="noopener noreferrer" class="bandcamp-link">
								View on Bandcamp →
							</a>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.music-grid {
		display: flex;
		flex-direction: column;
		gap: 30px;
		margin-top: 30px;
	}

	.music-card {
		background: var(--bg-elevated);
		padding: 24px;
		border-radius: 8px;
		border: 1px solid var(--border);
	}

	.music-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
		flex-wrap: wrap;
		gap: 10px;
	}

	.music-header h3 {
		color: var(--text-primary);
		margin: 0;
		font-size: 20px;
	}

	.platform-badge {
		padding: 4px 12px;
		border-radius: 6px;
		font-size: 12px;
		font-weight: 600;
	}

	.platform-badge.bandcamp {
		background: rgba(194, 193, 165, 0.2);
		color: var(--accent-beige);
		border: 1px solid var(--accent-beige);
	}

	.music-card p {
		color: var(--text-secondary);
		margin-bottom: 16px;
	}

	.bandcamp-player {
		border: 0;
		width: 100%;
		height: 120px;
		border-radius: 8px;
	}

	@media screen and (max-width: 768px) {
		.bandcamp-player {
			height: 42px;
		}
	}

	.bandcamp-link {
		color: var(--accent-beige);
		text-decoration: none;
		font-weight: 600;
		display: inline-block;
		transition: color 0.2s;
	}

	.bandcamp-link:hover {
		color: var(--accent-beige-hover);
		text-decoration: underline;
	}
</style>
