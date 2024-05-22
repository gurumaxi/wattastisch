import { translations } from '$lib/translations';
import { Language, type TranslationKeys } from '$lib/types';
import { persistentWritable } from '$lib/utils';
import { derived } from 'svelte/store';

export const language = persistentWritable<Language>('wattastisch_language', Language.HOCHDEUTSCH);
export const pointGoal = persistentWritable('wattastisch_endPoints', 18);

export const t = derived(language, $language => {
    return (key: keyof TranslationKeys) => translations[$language][key];
});
