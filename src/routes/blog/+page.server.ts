import type { PageServerLoad } from './$types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export const load: PageServerLoad = async () => {
	try {
		const blogDir = join(process.cwd(), 'src/content/blog');
		const files = readdirSync(blogDir).filter(file => file.endsWith('.md'));

		const posts = files.map(file => {
			const filePath = join(blogDir, file);
			const fileContent = readFileSync(filePath, 'utf-8');

			// Parse frontmatter
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

		// Sort by date, newest first
		posts.sort((a, b) => (b?.date || '').localeCompare(a?.date || ''));

		return {
			posts
		};
	} catch (error) {
		console.error('Error loading blog posts:', error);
		return {
			posts: []
		};
	}
};
