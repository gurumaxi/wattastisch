import { settingsStore } from '$lib/stores/settings.svelte';
import type { Match } from '$lib/types';
import { leadingZero } from '$lib/utils';

export function getScore(match: Match, teamIndex: number): number {
    const score = [0, 0];
    match.games.forEach(game => (score[game.winningTeam] += game.points));
    return score[teamIndex];
}

class MatchStore {
    match = $state<Match>({
        id: new Date().getTime(),
        games: [],
    });

    reset() {
        this.match = {
            id: new Date().getTime(),
            games: [],
        };
    }

    addGame(teamIndex: 0 | 1, points: number) {
        this.match.games.push({
            winningTeam: teamIndex,
            points,
            time: new Date().getTime(),
        });
    }

    revertLastGame() {
        this.match.games = this.match.games.filter((_, index) => index + 1 < this.match.games.length);
    }

    getScore(teamIndex: number): number {
        return getScore(this.match, teamIndex);
    }

    isFinished(): boolean {
        return this.getScore(0) >= settingsStore.pointGoal || this.getScore(1) >= settingsStore.pointGoal;
    }

    isTeamStroken(teamIndex: number): boolean {
        return this.getScore(teamIndex) >= settingsStore.pointGoal - 2;
    }

    averageGameTime() {
        if (!this.match.games.length) {
            return '-';
        }

        let result = 0;
        let counter = 0;
        for (let i = 1; i < this.match.games.length; i++) {
            const secondsDiff = Math.round((this.match.games[i].time - this.match.games[i - 1].time) / 1000);
            if (secondsDiff <= 900) {
                result += secondsDiff;
                counter++;
            }
        }
        result /= counter;
        return `${Math.floor(result / 60)}:${leadingZero(Math.floor(result % 60))}`;
    }

    getChartData() {
        const labels: string[] = ['Start'];
        const data1: number[] = [0];
        const data2: number[] = [0];

        for (const game of this.match.games) {
            if (game.winningTeam === 0) {
                data1.push(data1[data1.length - 1] + game.points);
                data2.push(data2[data2.length - 1]);
            } else {
                data1.push(data1[data1.length - 1]);
                data2.push(data2[data2.length - 1] + game.points);
            }
            const currentDate = new Date(game.time);
            labels.push(`${leadingZero(currentDate.getHours())}:${leadingZero(currentDate.getMinutes())}`);
        }

        return {
            labels,
            data1,
            data2,
        };
    }
}

export const matchStore = new MatchStore();
