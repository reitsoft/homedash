import { ladeTage } from '#lib/server/agenda';
import { ladeWetter } from '#lib/server/wetter';

export const load = async ({ depends }) => {
	depends('app:agenda');
	const [tage, wetter] = await Promise.all([ladeTage(7), ladeWetter()]);
	return { tage, wetter };
};
