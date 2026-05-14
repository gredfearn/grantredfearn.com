<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />

<div class="desktop">
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">About</div>
		</div>
		<div class="window-body">
			<section>
				<h2>Contact</h2>
				<ul>
					<li>Email: <a href="mailto:grantredfearn@gmail.com">grantredfearn@gmail.com</a></li>
					<li>GitHub: <a href="https://github.com/gredfearn" target="_blank" rel="noopener noreferrer">github.com/gredfearn</a></li>
					<li>LinkedIn: <a href="https://linkedin.com/in/gredfearn" target="_blank" rel="noopener noreferrer">linkedin.com/in/gredfearn</a></li>
				</ul>
			</section>

			<section>
				<h2>Summary</h2>
				<p>Principal DevOps Engineer with a big-picture mindset and deep experience in Kubernetes, platform engineering, and infrastructure automation. Over the past decade, I’ve built and maintained production Kubernetes environments at scale, developed operators and tooling in Go, and automated workflows using Bash and Nix. I enjoy simplifying complex systems, improving developer workflows, and building platforms that are both resilient and easy to operate.</p>
			</section>

			<section>
				<h2>Experience</h2>
				<div class="field-row-stacked">
					<h3>Principal DevOps Engineer</h3>
                    <h4>Spec</h4>
					<p><em>Aug 2021 - Current</em></p>
					<ul>
                        <li>Architected and operated a Kubernetes-based platform supporting large-scale real-time data analytics workloads</li>
						<li>Led SOC 2 and PCI compliance initiatives, including audit preparation, infrastructure hardening, and security controls implementation</li>
                        <li>Extended Kubernetes functionality through Crossplane integrations and development of custom Kubernetes operators</li> 
                        <li>Designed and implemented client platform integrations to support secure and scalable onboarding workflows</li>
                        <li>Architected and integrated Kafka-based data pipelines for high-throughput distributed event processing</li>
                        <li>Managed and optimized Amazon RDS infrastructure at scale, focusing on reliability, performance, and operational efficiency</li>
					</ul>
				</div>
				<div class="field-row-stacked">
					<h3>Senior Software Engineer/DevOps Engineer</h3>
                    <h4>Springbox, a Prophet Company</h4>
					<p><em>Nov 2017 - Aug 2021</em></p>
					<ul>
                        <li>Developed custom web applications for global enterprise clients, tailored to complex business and operational requirements</li>
                        <li>Designed, automated, and maintained scalable infrastructure platforms to support high-availability production environments</li>
                        <li>Served as a technical solutions architect across cross-functional initiatives, translating business requirements into scalable engineering solutions</li>
					</ul>
				</div>
				<div class="field-row-stacked">
					<h3>Lead Software Developer</h3>
                    <h4>Clutch Analytics</h4>
					<p><em>May 2016 - Nov 2017</em></p>
					<ul>
                        <li>Led development of a core insurance rating engine responsible for policy pricing and underwriting calculations</li>
						<li>Integrated internal systems with multiple third-party vendors and external APIs to streamline data exchange and business workflows</li>
						<li>Optimized business rules engine performance and scalability, improving processing efficiency and system reliability</li>
					</ul>
				</div>
			</section>

			<section>
				<h2>Education</h2>
				<div class="field-row-stacked">
					<h4>Applied Technology, Sound Design - University of Central Oklahoma</h4>
					<p><em>2015</em></p>
				</div>
				<div class="field-row-stacked">
					<h4>Music Production - University of Central Oklahoma</h4>
					<p><em>2011</em></p>
				</div>
				<div class="field-row-stacked">
					<h4>Advanced Software Engineering Immersive - Hack Reactor</h4>
					<p><em>2016</em></p>
				</div>
			</section>

			<section>
				<h2>Skills</h2>
				<ul>
					<li>Kubernetes Platform Engineering</li>
					<li>Infrastructure Automation and DevOps</li>
					<li>Distributed Systems and Data Pipeline Architecture</li>
                    <li>Cloud Infrastructure Architecture and Scalability</li>
                    <li>Go (Golang) Development and Kubernetes Operators</li>
				</ul>
			</section>
		</div>
	</div>
</div>
