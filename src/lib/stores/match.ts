import { pointGoal } from '$lib/stores/settings';
import type { Match } from '$lib/types';
import { leadingZero, persistentWritable } from '$lib/utils';
import { derived, get } from 'svelte/store';

function createMatchStore() {
    const { subscribe, set, update } = persistentWritable<Match>('match', []);
    return {
        subscribe,
        addGame: (teamIndex: 0 | 1, points: number) => update(match => [...match, {
            team: teamIndex,
            points,
            time: new Date().getTime(),
        }]),
        revertLastGame: () => update(match => match.filter((_, index) => index + 1 < match.length)),
        reset: () => set([]),
    };
}

export const match = createMatchStore();

export const getMatchScore = derived(match, $match => {
    const score = [0, 0];
    $match.forEach(game => (score[game.team] += game.points));
    return score;
});

export const isMatchFinished = derived([getMatchScore, pointGoal], ([$getMatchScore, $pointGoal]) => {
    return $getMatchScore.some(score => score >= $pointGoal);
});

export const averageGameTime = derived(match, $match => {
    if ($match.length > 1) {
        let result = 0;
        let counter = 0;
        for (let i = 1; i < $match.length; i++) {
            const secondsDiff = Math.round(($match[i].time - $match[i - 1].time) / 1000);
            if (secondsDiff <= 900) {
                result += secondsDiff;
                counter++;
            }
        }
        result /= counter;
        return Math.floor(result / 60) + ':' + leadingZero(Math.floor(result % 60));
    } else {
        return '-';
    }
});

export function getChartData() {
    const labels: string[] = ['Start'];
    const data1: number[] = [0];
    const data2: number[] = [0];

    const matchData = get(match);

    for (const game of matchData) {
        if (game.team === 0) {
            data1.push(data1[data1.length - 1] + game.points);
            data2.push(data2[data2.length - 1]);
        } else {
            data1.push(data1[data1.length - 1]);
            data2.push(data2[data2.length - 1] + game.points);
        }
        const currentDate = new Date(game.time);
        labels.push(leadingZero(currentDate.getHours()) + ':' + leadingZero(currentDate.getMinutes()));
    }

    return {
        labels,
        data1,
        data2,
    };
}
