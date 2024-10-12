import { translations } from '$lib/translations';
import { Language, type TranslationKeys } from '$lib/types';
import { getValueFromLocalStorage, setValueToLocalStorage } from '$lib/utils';

const LANGUAGE_KEY = 'language';
const POINT_GOAL_KEY = 'endPoints';

class SettingsStore {
    private _language = $state(getValueFromLocalStorage<Language>(LANGUAGE_KEY, Language.HOCHDEUTSCH));
    private _pointGoal = $state(getValueFromLocalStorage<number>(POINT_GOAL_KEY, 18));

    t = $derived((key: keyof TranslationKeys) => translations[this._language][key]);

    get language(): Language {
        return this._language;
    }

    set language(value: Language) {
        this._language = value;
        setValueToLocalStorage(LANGUAGE_KEY, value);
    }

    get pointGoal(): number {
        return this._pointGoal;
    }

    set pointGoal(value: number) {
        this._pointGoal = value;
        setValueToLocalStorage(POINT_GOAL_KEY, value);
    }
}

export const settingsStore = new SettingsStore();

// import shortcut
export const t = settingsStore.t;
