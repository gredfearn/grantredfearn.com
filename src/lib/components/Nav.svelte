<script lang="ts">
	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	// Generate random stars
	const stars = Array.from({ length: 50 }, (_, i) => ({
		id: i,
		left: Math.random() * 100,
		top: Math.random() * 100,
		size: Math.random() * 2 + 1,
		animationDelay: Math.random() * 3,
		animationDuration: Math.random() * 2 + 2
	}));
</script>

<nav class="navbar">
	<div class="stars-container">
		{#each stars as star}
			<div
				class="star"
				style="left: {star.left}%; top: {star.top}%; width: {star.size}px; height: {star.size}px; animation-delay: {star.animationDelay}s; animation-duration: {star.animationDuration}s;"
			></div>
		{/each}
	</div>
	<div class="nav-container">
		<div class="nav-brand">
			<a href="/">Grant Redfearn</a>
		</div>

		<button class="hamburger" onclick={toggleMenu} aria-label="Toggle menu">
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
		</button>

		<ul class="nav-menu" class:active={isOpen}>
			<li class="nav-item">
				<a href="/" class="nav-link" onclick={closeMenu}>Home</a>
			</li>
			<li class="nav-item">
				<a href="/about" class="nav-link" onclick={closeMenu}>About</a>
			</li>
			<li class="nav-item">
				<a href="/blog" class="nav-link" onclick={closeMenu}>Blog</a>
			</li>
			<li class="nav-item">
				<a href="/astrophotography" class="nav-link" onclick={closeMenu}>Astrophotography</a>
			</li>
			<li class="nav-item">
				<a href="/music" class="nav-link" onclick={closeMenu}>Music</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	.navbar {
		background: #515751;
		border-bottom: 1px solid #C2C1A5;
		padding: 10px 0;
		position: sticky;
		top: 0;
		z-index: 100;
		width: 100%;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
		overflow: hidden;
		position: relative;
	}

	.stars-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}

	.star {
		position: absolute;
		background: #F5F9E9;
		border-radius: 50%;
		animation: twinkle 3s ease-in-out infinite;
	}

	@keyframes twinkle {
		0%, 100% {
			opacity: 0.7;
		}
		50% {
			opacity: 1;
		}
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		position: relative;
		z-index: 1;
	}

	.nav-brand a {
		font-weight: 600;
		font-size: 1.2rem;
		color: #C2C1A5;
		text-decoration: none;
		padding: 10px 0;
		display: block;
		font-family: 'Windows 95', sans-serif;
	}

	.nav-menu {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 5px;
	}

	.nav-item {
		margin: 0;
	}

	.nav-link {
		display: block;
		padding: 8px 16px;
		color: #F5F9E9;
		text-decoration: none;
		border: 2px solid transparent;
		border-radius: 6px;
		transition: all 0.2s;
	}

	.nav-link:hover {
		background: rgba(194, 193, 165, 0.1);
		border: 2px solid rgba(194, 193, 165, 0.3);
		color: #C2C1A5;
	}

	.nav-link:active {
		background: rgba(194, 193, 165, 0.2);
		border: 2px solid #C2C1A5;
	}

	.hamburger {
		display: none;
		flex-direction: column;
		background: transparent;
		border: 2px solid #515751;
		padding: 8px;
		cursor: pointer;
		gap: 4px;
		border-radius: 6px;
		transition: all 0.2s;
	}

	.hamburger:hover {
		background: rgba(194, 193, 165, 0.1);
		border-color: #C2C1A5;
	}

	.hamburger:active {
		background: rgba(194, 193, 165, 0.2);
	}

	.hamburger-line {
		width: 25px;
		height: 3px;
		background: #F5F9E9;
		display: block;
	}

	/* Mobile styles */
	@media screen and (max-width: 768px) {
		.hamburger {
			display: flex;
		}

		.nav-menu {
			position: fixed;
			left: -100%;
			top: 68px;
			flex-direction: column;
			background: #515751;
			width: 100%;
			border-bottom: 1px solid #C2C1A5;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
			transition: left 0.3s ease;
			gap: 0;
			padding: 10px 0;
		}

		.nav-menu.active {
			left: 0;
		}

		.nav-item {
			width: 100%;
		}

		.nav-link {
			width: 100%;
			padding: 15px 20px;
		}
	}
</style>
