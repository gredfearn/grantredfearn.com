import type { RequestHandler } from './$types';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const siteUrl = 'https://grantredfearn.com';
const siteTitle = 'Grant Redfearn';
const siteDescription = 'Principal DevOps Engineer, astrophotographer, and musician. Technical writing, astrophotography, and experimental music.';

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async () => {
	try {
		const blogDir = join(process.cwd(), 'src/content/blog');
		const files = readdirSync(blogDir).filter(file => file.endsWith('.md'));

		const posts = files
			.map(file => {
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

					// Extract content after frontmatter
					const content = fileContent.replace(frontmatterRegex, '').trim();

					return {
						slug: file.replace('.md', ''),
						title: frontmatter.title || 'Untitled',
						date: frontmatter.date || '',
						excerpt: frontmatter.excerpt || '',
						content: content
					};
				}

				return null;
			})
			.filter(Boolean);

		// Sort by date, newest first
		posts.sort((a, b) => (b?.date || '').localeCompare(a?.date || ''));

		// Generate RSS XML
		const rssItems = posts
			.map(post => {
				if (!post) return '';

				const postUrl = `${siteUrl}/blog/${post.slug}`;
				const pubDate = new Date(post.date).toUTCString();

				return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${postUrl}</link>
			<guid isPermaLink="true">${postUrl}</guid>
			<description>${escapeXml(post.excerpt)}</description>
			<pubDate>${pubDate}</pubDate>
		</item>`;
			})
			.join('');

		const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(siteTitle)}</title>
		<description>${escapeXml(siteDescription)}</description>
		<link>${siteUrl}</link>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
		<language>en</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${rssItems}
	</channel>
</rss>`;

		return new Response(rss, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=0, s-maxage=3600'
			}
		});
	} catch (error) {
		console.error('Error generating RSS feed:', error);
		return new Response('Error generating RSS feed', { status: 500 });
	}
};

export const prerender = true;
