import type { Match } from '$lib/types';
import { persistentWritable } from '$lib/utils';

function createHistoryStore() {
    const { subscribe, update, set } = persistentWritable<Match[]>('matchHistory', []);

    return {
        subscribe,
        delete: () => set([]),
        addMatch: (match: Match) => {
            update(history => {
                const matchIndex = history.findIndex(m => m.id === match.id);
                return matchIndex >= 0 ? history : [match, ...history];
            });
        },
    };
}

export const matchHistory = createHistoryStore();
