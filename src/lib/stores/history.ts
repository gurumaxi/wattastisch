import type { Match } from '$lib/types';
import { persistentWritable } from '$lib/utils';

function createHistoryStore() {
    const { subscribe, update } = persistentWritable<Match[]>('matchHistory', []);

    return {
        subscribe,
        addMatch: (match: Match) => {
            update(history => [match, ...history]);
        },
    };
}

export const matchHistory = createHistoryStore();
