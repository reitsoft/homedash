import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DATA_DIR = process.env.DATA_DIR ?? join(process.cwd(), 'data');
const TZ = 'Europe/Berlin';

async function lies(datei, fallback) {
	try {
		return JSON.parse(await readFile(join(DATA_DIR, datei), 'utf8'));
	} catch (e) {
		console.error(`[agenda] ${datei} nicht lesbar:`, e);
		return fallback;
	}
}

/** Heutiges Datum als YYYY-MM-DD in deutscher Zeit (unabhängig von der Server-Zeitzone) */
export function heuteBerlin() {
	return new Intl.DateTimeFormat('sv-SE', { timeZone: TZ }).format(new Date());
}

export async function ladeTage(anzahl = 7) {
	const [plan, ferien, termine] = await Promise.all([
		lies('stundenplan.json', { zeiten: [], tage: {} }),
		lies('ferien.json', []),
		lies('termine.json', [])
	]);

	const heute = heuteBerlin();
	const wochentag = new Intl.DateTimeFormat('de-DE', { weekday: 'long', timeZone: 'UTC' });
	const kurz = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'short', timeZone: 'UTC' });

	return Array.from({ length: anzahl }, (_, i) => {
		// 12:00 UTC als Anker: keine Probleme mit Sommer-/Winterzeit
		const d = new Date(`${heute}T12:00:00Z`);
		d.setUTCDate(d.getUTCDate() + i);
		const datum = d.toISOString().slice(0, 10);
		const f = ferien.find((x) => datum >= x.von && datum <= x.bis);

		const unterricht = f
			? []
			: (plan.tage[String(d.getUTCDay())] ?? []).map((u) => {
					const z = plan.zeiten.find((z) => z.nr === u.nr);
					return { ...u, von: z?.von ?? '', bis: z?.bis ?? '' };
				});

		return {
			datum,
			wochentag: wochentag.format(d),
			kurz: kurz.format(d),
			istHeute: i === 0,
			ferien: f?.name,
			unterricht,
			termine: termine
				.filter((t) => datum >= t.datum && datum <= (t.bis ?? t.datum))
				.sort((a, b) => (a.zeit ?? '').localeCompare(b.zeit ?? ''))
		};
	});
}
