import { writable } from 'svelte/store';
import type Swiper from 'swiper';

export const swiper = writable<Swiper | null>(null);
