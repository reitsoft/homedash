import { ladeTage } from '#lib/server/agenda';
import { ladeWetter } from '#lib/server/wetter';

// Kiosk-Seite: nur im Browser rendern (Uhr/Zeitvergleiche ohne Hydration-Abweichungen)
export const ssr = false;

export const load = async ({ depends }) => {
	depends('app:agenda');
	const [tage, wetter] = await Promise.all([ladeTage(7), ladeWetter()]);
	return { tage, wetter };
};
