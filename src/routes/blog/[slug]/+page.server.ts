import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	try {
		// Read the markdown file
		const filePath = join(process.cwd(), 'src/content/blog', `${slug}.md`);
		const fileContent = readFileSync(filePath, 'utf-8');

		// Parse frontmatter and content
		const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
		const match = fileContent.match(frontmatterRegex);

		if (!match) {
			throw error(404, 'Invalid blog post format');
		}

		const [, frontmatterText, content] = match;

		// Parse frontmatter
		const frontmatter: Record<string, string> = {};
		frontmatterText.split('\n').forEach(line => {
			const [key, ...valueParts] = line.split(':');
			if (key && valueParts.length) {
				frontmatter[key.trim()] = valueParts.join(':').trim();
			}
		});

		return {
			title: frontmatter.title || 'Untitled',
			date: frontmatter.date || '',
			excerpt: frontmatter.excerpt || '',
			content: content.trim(),
			slug
		};
	} catch (err) {
		throw error(404, 'Blog post not found');
	}
};

// Generate static paths for all blog posts
export const entries = () => {
	try {
		const blogDir = join(process.cwd(), 'src/content/blog');
		const files = readdirSync(blogDir);
		return files
			.filter(file => file.endsWith('.md'))
			.map(file => ({
				slug: file.replace('.md', '')
			}));
	} catch {
		return [];
	}
};
