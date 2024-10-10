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

export function areElementsOverlapping(element1: Element, element2: Element): boolean {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    const overlapX = Math.max(
        0,
        Math.min(rect1.x + rect1.width, rect2.x + rect2.width) - Math.max(rect1.x, rect2.x),
    );
    const overlapY = Math.max(
        0,
        Math.min(rect1.y + rect1.height, rect2.y + rect2.height) - Math.max(rect1.y, rect2.y),
    );
    const areaElement1 = rect1.width * rect1.height;
    const areaElement2 = rect2.width * rect2.height;
    return overlapX * overlapY > 0.5 * Math.min(areaElement1, areaElement2);
}
