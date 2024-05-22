import type { Match } from '$lib/types';
import { persistentWritable } from '$lib/utils';

function createHistoryStore() {
    const { subscribe, update } = persistentWritable<Match[]>('matchHistory', []);

    return {
        subscribe,
        addMatch: (match: Match) => {
            update(history => {
                const matchIndex = history.findIndex(m => m.id === match.id);
                if (matchIndex >= 0) {
                    history[matchIndex] = match;
                    return history;
                }
                return [match, ...history];
            });
        },
    };
}

export const matchHistory = createHistoryStore();
