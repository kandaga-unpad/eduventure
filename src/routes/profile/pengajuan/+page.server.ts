import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PRIVATE_EDUVENTURE_APITOKEN } from '$env/static/private';

import { readItems } from '@directus/sdk';
import getDirectusInstance from '$lib/server/directus-cf';

export const load: PageServerLoad = async ({ url, locals }) => {
	const session = await locals.auth();

	if (!session?.user) {
		redirect(303, '/');
	}

	const directus = getDirectusInstance(fetch);

	const page = Number(url.searchParams.get('page')) || 1;
	const limit = 10;
	const offset = (page - 1) * limit;

	try {
		const filter = JSON.stringify({
			email_pemohon: session.user.email
		});
		const countResponse = await fetch(
			`${directus.url}/items/pengajuan_eduventure_lite?meta=total_count&filter=${encodeURIComponent(filter)}`,
			{
				headers: {
					Authorization: `Bearer ${PRIVATE_EDUVENTURE_APITOKEN}`
				}
			}
		);
		const countData = await countResponse.json();
		const total = countData.meta.total_count;

		const result = await directus.request(
			readItems('pengajuan_eduventure_lite', {
				filter: {
					email_pemohon: session.user.email
				},
				sort: '-date_created',
				limit,
				offset,
				fields: ['*']
			})
		);

		return {
			pengajuan: result,
			total,
			page,
			limit
		};
	} catch (error) {
		console.error('Error loading pengajuan:', error);
		return {
			pengajuan: [],
			total: 0,
			page,
			limit
		};
	}
};
