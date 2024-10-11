export function leadingZero(value: number): string {
    return (value < 10 ? '0' : '') + value;
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

export function getValueFromLocalStorage<T>(key: string, defaultValue: T): T {
    if (typeof localStorage === 'undefined') {
        return defaultValue;
    }
    const localStorageValue = localStorage.getItem(key);
    try {
        return localStorageValue ? JSON.parse(localStorageValue) : defaultValue;
    } catch {
        return defaultValue;
    }
}

export function setValueToLocalStorage(key: string, value: unknown) {
    if (typeof localStorage === 'undefined') {
        return undefined;
    }
    localStorage.setItem(key, JSON.stringify(value));
}
