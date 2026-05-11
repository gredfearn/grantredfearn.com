import type { PageServerLoad } from './$types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export const load: PageServerLoad = async () => {
	try {
		// Get the latest blog post
		const blogDir = join(process.cwd(), 'src/content/blog');
		const files = readdirSync(blogDir).filter(file => file.endsWith('.md'));

		let latestPost = null;

		if (files.length > 0) {
			const posts = files.map(file => {
				const filePath = join(blogDir, file);
				const fileContent = readFileSync(filePath, 'utf-8');

				const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
				const match = fileContent.match(frontmatterRegex);

				if (match) {
					const frontmatterText = match[1];
					const frontmatter: Record<string, string> = {};

					frontmatterText.split('\n').forEach(line => {
						const [key, ...valueParts] = line.split(':');
						if (key && valueParts.length) {
							frontmatter[key.trim()] = valueParts.join(':').trim();
						}
					});

					return {
						slug: file.replace('.md', ''),
						title: frontmatter.title || 'Untitled',
						date: frontmatter.date || '',
						excerpt: frontmatter.excerpt || ''
					};
				}
				return null;
			}).filter(Boolean);

			// Sort by date and get the latest
			posts.sort((a, b) => (b?.date || '').localeCompare(a?.date || ''));
			latestPost = posts[0];
		}

		return {
			latestPost
		};
	} catch (error) {
		console.error('Error loading home page data:', error);
		return {
			latestPost: null
		};
	}
};
