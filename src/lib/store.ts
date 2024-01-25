import { persistentWritable } from '$lib/utils';
import { derived } from 'svelte/store';

function createMatchStore() {
    const { subscribe, set, update } = persistentWritable('match', []);
    return {
        subscribe,
        addGame: (teamIndex, points) => update(match => [...match, { team: teamIndex, points, time: new Date().getTime() }]),
        revertLastGame: () => update(match => match.filter((_, index) => index + 1 < match.length)),
        reset: () => set([]),
    };
}

export const match = createMatchStore();
export const endPoints = persistentWritable('endPoints', 18);

export const getMatchScore = derived(match, $match => {
    const score = [0, 0];
    $match.forEach(game => (score[game.team] += game.points));
    return score;
});
export const isMatchFinished = derived([getMatchScore, endPoints], ([$getMatchScore, $endPoints]) => $getMatchScore.some(score => score >= $endPoints));
