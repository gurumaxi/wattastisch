import { browser } from "$app/environment";
import { writable } from "svelte/store";

export function leadingZero(value: number) {
    return (value < 10 ? "0" : "") + value;
}

export function persistentWritable(localStorageKey: string, defaultValue: unknown) {
    if (!browser) {
        return writable(defaultValue);
    }

    const initialValue = JSON.parse(localStorage.getItem("wattastisch_" + localStorageKey)) ?? defaultValue;
    const store = writable(initialValue);
    store.subscribe(value => localStorage.setItem("wattastisch_" + localStorageKey, JSON.stringify(value)));
    return store;
}
