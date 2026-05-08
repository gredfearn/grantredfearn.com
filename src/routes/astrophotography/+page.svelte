<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';

	interface AstroImage {
		id: number;
		url: string;
		title: string;
		date: string;
	}

	// Mock data - will eventually come from S3
	const images: AstroImage[] = [
		{
			id: 1,
			url: '/images/betty-white-1.jpg',
			title: 'Andromeda Galaxy',
			date: '2026-03-15'
		},
		{
			id: 2,
			url: '/images/betty-white-1.jpg',
			title: 'Orion Nebula',
			date: '2026-02-20'
		},
		{
			id: 3,
			url: '/images/betty-white-1.jpg',
			title: 'Pleiades Cluster',
			date: '2026-01-10'
		},
		{
			id: 4,
			url: '/images/betty-white-1.jpg',
			title: 'Horsehead Nebula',
			date: '2026-04-05'
		}
	];

	let selectedImage: AstroImage | null = $state(null);

	function openModal(image: AstroImage) {
		selectedImage = image;
	}

	function closeModal() {
		selectedImage = null;
	}
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Astrophotography - Grant Redfearn</div>
			<div class="title-bar-controls">
				<button aria-label="Minimize"></button>
				<button aria-label="Maximize"></button>
				<button aria-label="Close"></button>
			</div>
		</div>
		<div class="window-body">
			<h1>Astrophotography Gallery</h1>
			<p>A collection of my deep sky astrophotography images.</p>

			<div class="image-grid">
				{#each images as image}
					<div class="grid-item" onclick={() => openModal(image)}>
						<img src={image.url} alt={image.title} />
						<div class="image-info">
							<strong>{image.title}</strong>
							<span>{image.date}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

{#if selectedImage}
	<div class="modal" onclick={closeModal}>
		<div class="modal-content" onclick={(e) => e.stopPropagation()}>
			<div class="modal-window">
				<div class="title-bar">
					<div class="title-bar-text">{selectedImage.title}</div>
					<div class="title-bar-controls">
						<button aria-label="Close" onclick={closeModal}></button>
					</div>
				</div>
				<div class="modal-body">
					<img src={selectedImage.url} alt={selectedImage.title} />
					<p><strong>Date:</strong> {selectedImage.date}</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}

	.grid-item {
		cursor: pointer;
		border: 2px solid #000;
		background: #fff;
		padding: 5px;
		transition: transform 0.2s;
	}

	.grid-item:hover {
		transform: scale(1.05);
		box-shadow: 2px 2px 0 #000;
	}

	.grid-item img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		display: block;
	}

	.image-info {
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.image-info strong {
		font-size: 14px;
	}

	.image-info span {
		font-size: 12px;
		color: #666;
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-content {
		max-width: 90%;
		max-height: 90%;
	}

	.modal-window {
		background: #c0c0c0;
	}

	.modal-body {
		background: #fff;
		padding: 10px;
	}

	.modal-body img {
		width: 100%;
		height: auto;
		max-height: 70vh;
		object-fit: contain;
	}

	.modal-body p {
		margin-top: 10px;
		text-align: center;
	}
</style>
