<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';

	interface MusicEmbed {
		id: number;
		title: string;
		platform: 'soundcloud' | 'bandcamp';
		embedUrl: string;
		description: string;
	}

	// Example embeds - replace with your actual SoundCloud/Bandcamp URLs
	const musicEmbeds: MusicEmbed[] = [
		{
			id: 1,
			title: 'Latest Track',
			platform: 'soundcloud',
			embedUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234567890&color=%2310b981&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false',
			description: 'My latest composition exploring ambient soundscapes'
		},
		{
			id: 2,
			title: 'Album Release',
			platform: 'bandcamp',
			embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=1234567890/size=large/bgcol=1a1f26/linkcol=10b981/tracklist=false/artwork=small/transparent=true/',
			description: 'Full length album available on Bandcamp'
		}
	];
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Music - Grant Redfearn</div>
			<div class="title-bar-controls">
				<button aria-label="Minimize"></button>
				<button aria-label="Maximize"></button>
				<button aria-label="Close"></button>
			</div>
		</div>
		<div class="window-body">
			<h1>My Music</h1>
			<p>Listen to my latest tracks and albums on SoundCloud and Bandcamp.</p>

			<div class="music-grid">
				{#each musicEmbeds as embed}
					<article class="music-card">
						<div class="music-header">
							<h3>{embed.title}</h3>
							<span class="platform-badge {embed.platform}">
								{embed.platform === 'soundcloud' ? '🔊 SoundCloud' : '🎵 Bandcamp'}
							</span>
						</div>
						<p>{embed.description}</p>

						{#if embed.platform === 'soundcloud'}
							<iframe
								title="{embed.title} - SoundCloud"
								width="100%"
								height="166"
								scrolling="no"
								frameborder="no"
								allow="autoplay"
								src={embed.embedUrl}
							></iframe>
						{:else if embed.platform === 'bandcamp'}
							<iframe
								title="{embed.title} - Bandcamp"
								style="border: 0; width: 100%; height: 120px;"
								src={embed.embedUrl}
								seamless
							></iframe>
						{/if}
					</article>
				{/each}
			</div>

			<div class="instructions">
				<h2>How to Add Your Music</h2>
				<div class="instruction-cards">
					<div class="instruction-card">
						<h4>SoundCloud</h4>
						<ol>
							<li>Go to your track on SoundCloud</li>
							<li>Click "Share" button</li>
							<li>Click "Embed" tab</li>
							<li>Copy the embed code URL</li>
							<li>Add to the <code>musicEmbeds</code> array</li>
						</ol>
					</div>
					<div class="instruction-card">
						<h4>Bandcamp</h4>
						<ol>
							<li>Go to your album/track on Bandcamp</li>
							<li>Click "Share / Embed"</li>
							<li>Customize the player options</li>
							<li>Copy the embed code URL</li>
							<li>Add to the <code>musicEmbeds</code> array</li>
						</ol>
					</div>
				</div>
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

	.platform-badge.soundcloud {
		background: rgba(255, 85, 0, 0.2);
		color: #ff8c42;
		border: 1px solid rgba(255, 85, 0, 0.3);
	}

	.platform-badge.bandcamp {
		background: rgba(16, 185, 129, 0.2);
		color: var(--accent-green-light);
		border: 1px solid rgba(16, 185, 129, 0.3);
	}

	.music-card p {
		color: var(--text-secondary);
		margin-bottom: 16px;
	}

	iframe {
		border-radius: 8px;
	}

	.instructions {
		margin-top: 50px;
		padding-top: 30px;
		border-top: 1px solid var(--divider);
	}

	.instructions h2 {
		color: var(--accent-green);
		margin-bottom: 20px;
	}

	.instruction-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
	}

	.instruction-card {
		background: var(--bg-elevated);
		padding: 20px;
		border-radius: 8px;
		border: 1px solid var(--border);
	}

	.instruction-card h4 {
		color: var(--text-primary);
		margin-top: 0;
		margin-bottom: 12px;
	}

	.instruction-card ol {
		color: var(--text-secondary);
		padding-left: 20px;
		line-height: 1.8;
	}

	.instruction-card code {
		background: var(--bg-primary);
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 13px;
		color: var(--accent-green-light);
	}
</style>
