<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const images = data.images;

	let selectedImage: typeof images[0] | null = $state(null);

	function openModal(image: typeof images[0]) {
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
		</div>
		<div class="window-body">
			<h1>Astrophotography Gallery</h1>
			<p>A collection of my deep sky astrophotography images.</p>

			{#if images.length === 0}
				<p style="color: var(--text-secondary); margin-top: 20px;">No images found. Check the S3 bucket configuration.</p>
			{/if}

			<div class="image-grid">
				{#each images as image}
					<div class="grid-item" onclick={() => openModal(image)}>
						<img src={image.url} alt={image.title} />
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
				<div class="modal-body">
					<img src={selectedImage.url} alt={selectedImage.title} />
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
		border: 1px solid var(--border);
		background: var(--bg-elevated);
		border-radius: 8px;
		overflow: hidden;
		transition: transform 0.2s, border-color 0.2s;
	}

	.grid-item:hover {
		transform: translateY(-4px);
		border-color: var(--accent-beige);
	}

	.grid-item img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		display: block;
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
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
	}

	.modal-body {
		background: var(--bg-primary);
		padding: 20px;
	}

	.modal-body img {
		width: 100%;
		height: auto;
		max-height: 70vh;
		object-fit: contain;
		border-radius: 4px;
	}

	.modal-body p {
		margin-top: 16px;
		text-align: center;
		color: var(--text-secondary);
	}
</style>
