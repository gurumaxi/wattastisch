import type { Match } from '$lib/types';
import { getValueFromLocalStorage, setValueToLocalStorage } from '$lib/utils';

const HISTORY_KEY = 'matchHistory';

class HistoryStore {
    private _history = $state(getValueFromLocalStorage<Match[]>(HISTORY_KEY, []));

    get history() {
        return this._history;
    }

    reset() {
        this._history = [];
        setValueToLocalStorage(HISTORY_KEY, []);
    }

    addMatch(match: Match) {
        const historyMatch = this._history.find(m => m.id === match.id);
        if (!historyMatch) {
            this._history = [match, ...this._history];
            setValueToLocalStorage(HISTORY_KEY, this._history);
        }
    }
}

export const historyStore = new HistoryStore();
