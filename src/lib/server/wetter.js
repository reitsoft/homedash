import { env } from '$app/env/private';

import { heuteBerlin } from './agenda';

// Koordinaten per .env setzen: WETTER_LAT / WETTER_LON (Default: Singen)
const LAT = env.WETTER_LAT ?? '47.76';
const LON = env.WETTER_LON ?? '8.84';
const TTL_MS = 15 * 60 * 1000;
const ANZEIGE_STUNDEN = [6, 9, 12, 15, 18, 21];

let cache = null;

export async function ladeWetter() {
	if (cache && Date.now() - cache.geladen < TTL_MS && cache.daten.datum === heuteBerlin()) {
		return cache.daten;
	}
	try {
		const url = new URL('https://api.open-meteo.com/v1/forecast');
		url.search = new URLSearchParams({
			latitude: LAT,
			longitude: LON,
			timezone: 'Europe/Berlin',
			forecast_days: '1',
			current: 'temperature_2m,weather_code,is_day',
			hourly: 'temperature_2m,precipitation_probability,weather_code,is_day',
			daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset'
		}).toString();

		const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const j = await res.json();

		const daten = {
			datum: j.daily.time[0],
			jetzt: {
				temp: j.current.temperature_2m,
				code: j.current.weather_code,
				tag: j.current.is_day === 1
			},
			min: Math.round(j.daily.temperature_2m_min[0]),
			max: Math.round(j.daily.temperature_2m_max[0]),
			regenMax: j.daily.precipitation_probability_max[0] ?? 0,
			sonnenaufgang: j.daily.sunrise[0].slice(11, 16),
			sonnenuntergang: j.daily.sunset[0].slice(11, 16),
			// forecast_days=1 → Index im hourly-Array entspricht der Uhrzeit
			stunden: ANZEIGE_STUNDEN.map((h) => ({
				zeit: `${String(h).padStart(2, '0')}:00`,
				temp: Math.round(j.hourly.temperature_2m[h]),
				regen: j.hourly.precipitation_probability[h] ?? 0,
				code: j.hourly.weather_code[h],
				tag: j.hourly.is_day[h] === 1
			}))
		};
		cache = { geladen: Date.now(), daten };
		return daten;
	} catch (e) {
		console.error('[wetter] Abruf fehlgeschlagen:', e);
		return cache?.daten ?? null; // lieber veraltete Daten als gar nichts
	}
}
