import Sun from '@lucide/svelte/icons/sun';
import Moon from '@lucide/svelte/icons/moon';
import CloudSun from '@lucide/svelte/icons/cloud-sun';
import CloudMoon from '@lucide/svelte/icons/cloud-moon';
import Cloud from '@lucide/svelte/icons/cloud';
import CloudFog from '@lucide/svelte/icons/cloud-fog';
import CloudDrizzle from '@lucide/svelte/icons/cloud-drizzle';
import CloudRain from '@lucide/svelte/icons/cloud-rain';
import CloudSnow from '@lucide/svelte/icons/cloud-snow';
import CloudLightning from '@lucide/svelte/icons/cloud-lightning';

/** WMO-Wettercodes (Open-Meteo) → Icon */
export function wetterIcon(code, tag) {
	if (code <= 1) return tag ? Sun : Moon;
	if (code === 2) return tag ? CloudSun : CloudMoon;
	if (code === 3) return Cloud;
	if (code === 45 || code === 48) return CloudFog;
	if (code >= 51 && code <= 57) return CloudDrizzle;
	if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return CloudRain;
	if ((code >= 71 && code <= 77) || code === 85 || code === 86) return CloudSnow;
	if (code >= 95) return CloudLightning;
	return Cloud;
}

export function wetterText(code) {
	if (code === 0) return 'Klar';
	if (code === 1) return 'Überwiegend klar';
	if (code === 2) return 'Wolkig';
	if (code === 3) return 'Bedeckt';
	if (code === 45 || code === 48) return 'Nebel';
	if (code >= 51 && code <= 57) return 'Nieselregen';
	if (code >= 61 && code <= 67) return 'Regen';
	if (code >= 71 && code <= 77) return 'Schnee';
	if (code >= 80 && code <= 82) return 'Regenschauer';
	if (code === 85 || code === 86) return 'Schneeschauer';
	if (code >= 95) return 'Gewitter';
	return '–';
}
