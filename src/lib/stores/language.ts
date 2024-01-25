import { translations } from '$lib/translations';
import { Language, type TranslationKeys } from '$lib/types';
import { persistentWritable } from '$lib/utils';
import { derived } from 'svelte/store';

export const language = persistentWritable<Language>('language', Language.HOCHDEUTSCH);

export const t = derived(language, $language => {
    return (key: keyof TranslationKeys) => translations[$language][key];
});
