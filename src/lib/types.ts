export enum Language {
    HOCHDEUTSCH = 'Hochdeutsch',
    UNTERLOND = 'Unterlond',
    LAIVESOTT = 'Laivesott',
    PUSTOTOL = 'Pustotol',
    TELDRARISCH = 'Teldrarisch',
    LADIN = 'Ladin'
}

export type TranslationKeys = {
    zumBlock: string;
    neuesSpiel: string;
    neuesSpielConfirm: string;
    statistiken: string;
    einstellungen: string;
    teilen: string;
    headerText: string;
    spielFertigSie: string;
    spielFertigMir: string;
    zugZurueck: string;
    endPunkteZahl: string;
    sprache: string;
    noStats: string;
    stats1: string;
    stats2: string;
    stats3: string;
    teilenText: string;
};

export type MenuItem = {
    icon: string;
    name: keyof TranslationKeys;
    path: string;
};