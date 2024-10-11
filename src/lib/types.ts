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
    sie: string;
    mir: string;
    ja: string;
    nein: string;
    vergangenePartien: string;
    noHistory: string;
    confirmHistoryDeletion: string;
};

export type MenuItem = {
    icon: string;
    name: keyof TranslationKeys;
    path: string;
};

export type Match = {
    id: number;
    games: Game[];
};

export type Game = {
    winningTeam: 0 | 1;
    points: number;
    time: number;
};
