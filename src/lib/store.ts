import { persistentWritable } from "$lib/utils";
import { translations } from "$lib/translations";
import { writable, derived } from "svelte/store";
import { locale } from "svelte-i18n";
import type { Swiper } from "swiper/types";

function createMatchStore() {
    const { subscribe, set, update } = persistentWritable("match", []);
    return {
        subscribe,
        addGame: (teamIndex, points) => update(match => [...match, { team: teamIndex, points: points, time: new Date().getTime() }]),
        revertLastGame: () => update(match => match.filter((_, index) => index + 1 < match.length)),
        reset: () => set([])
    };
}

export const match = createMatchStore();
export const swiper = writable<Swiper | null>(null);
export const endPoints = persistentWritable("endPoints", 18);
export const language = persistentWritable("language", Object.keys(translations)[0]);
language.subscribe(value => locale.set(value));

export const getMatchScore = derived(match, $match => {
    const score = [0, 0];
    $match.forEach(game => (score[game.team] += game.points));
    return score;
});
export const isMatchFinished = derived([getMatchScore, endPoints], ([$getMatchScore, $endPoints]) => $getMatchScore.some(score => score >= $endPoints));
