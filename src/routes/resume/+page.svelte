<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Resume - Grant Redfearn</div>
			<div class="title-bar-controls">
				<button aria-label="Minimize"></button>
				<button aria-label="Maximize"></button>
				<button aria-label="Close"></button>
			</div>
		</div>
		<div class="window-body">

			<h1>Grant Redfearn</h1>

			<section>
				<h2>Contact</h2>
				<ul>
					<li>Email: your.email@example.com</li>
					<li>GitHub: github.com/yourusername</li>
					<li>LinkedIn: linkedin.com/in/yourprofile</li>
				</ul>
			</section>

			<section>
				<h2>Summary</h2>
				<p>Add your professional summary here.</p>
			</section>

			<section>
				<h2>Experience</h2>
				<div class="field-row-stacked">
					<h3>Job Title - Company Name</h3>
					<p><em>Date Range</em></p>
					<ul>
						<li>Achievement or responsibility</li>
						<li>Another achievement or responsibility</li>
					</ul>
				</div>
			</section>

			<section>
				<h2>Education</h2>
				<div class="field-row-stacked">
					<h3>Degree - University Name</h3>
					<p><em>Graduation Year</em></p>
				</div>
			</section>

			<section>
				<h2>Skills</h2>
				<ul>
					<li>Skill 1</li>
					<li>Skill 2</li>
					<li>Skill 3</li>
				</ul>
			</section>
		</div>
	</div>
</div>
