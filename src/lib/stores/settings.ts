import { translations } from '$lib/translations';
import { Language, type TranslationKeys } from '$lib/types';
import { persistentWritable } from '$lib/utils';
import { derived } from 'svelte/store';

export const language = persistentWritable<Language>('language', Language.HOCHDEUTSCH);
export const pointGoal = persistentWritable('endPoints', 18);

export const t = derived(language, $language => {
    return (key: keyof TranslationKeys) => translations[$language][key];
});
