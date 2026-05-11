import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const bucketName = 'grantredfearn-astrophoto';
	const region = 'us-east-1'; // Update this to your bucket's region if different
	const s3BaseUrl = `https://${bucketName}.s3.amazonaws.com`;

	try {
		// Fetch the bucket listing XML (works if bucket allows public ListBucket)
		const response = await fetch(`https://${bucketName}.s3.${region}.amazonaws.com/`);

		if (!response.ok) {
			console.error('Failed to list bucket contents:', response.statusText);
			return { images: [] };
		}

		const xmlText = await response.text();

		// Parse XML to extract image files
		const keyMatches = xmlText.matchAll(/<Key>([^<]+)<\/Key>/g);
		const lastModifiedMatches = xmlText.matchAll(/<LastModified>([^<]+)<\/LastModified>/g);

		const keys = Array.from(keyMatches).map(match => match[1]);
		const dates = Array.from(lastModifiedMatches).map(match => match[1]);

		// Filter for image files
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP'];
		const images = keys
			.filter(key => imageExtensions.some(ext => key.endsWith(ext)))
			.map((key, index) => {
				const filename = key.split('/').pop() || key;
				const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
				const title = nameWithoutExt.replace(/[-_]/g, ' ');
				const date = dates[keys.indexOf(key)]?.split('T')[0] || '';

				return {
					id: index + 1,
					url: `${s3BaseUrl}/${key}`,
					title: title.charAt(0).toUpperCase() + title.slice(1),
					date
				};
			})
			.sort((a, b) => b.date.localeCompare(a.date)); // Sort by date, newest first

		return {
			images
		};
	} catch (error) {
		console.error('Error loading images from S3:', error);
		return {
			images: []
		};
	}
};
