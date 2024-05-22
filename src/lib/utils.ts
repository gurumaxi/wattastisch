import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export function leadingZero(value: number): string {
    return (value < 10 ? '0' : '') + value;
}

export function persistentWritable<T>(localStorageKey: string, defaultValue: T): Writable<T> {
    if (!browser) {
        return writable(defaultValue);
    }

    const localStorageValue = localStorage.getItem(localStorageKey);
    const initialValue = localStorageValue ? JSON.parse(localStorageValue) : defaultValue;
    const store = writable(initialValue);
    store.subscribe(value => localStorage.setItem(localStorageKey, JSON.stringify(value)));
    return store;
}
