import type Swiper from 'swiper';

class UIStore {
    swiper = $state<Swiper | undefined>();
}

export const uiStore = new UIStore();
