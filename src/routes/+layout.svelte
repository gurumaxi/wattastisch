<script lang="ts">
    import Menu from '$lib/components/Menu.svelte';
    import { fade } from 'svelte/transition';
    import { register } from 'swiper/element/bundle';
    import { swiper } from '$lib/stores/swiper';
    import '../global.css';

    register();

    let showMenuBackground = false;

    function onSwiperInit(event: any) {
        $swiper = event.detail[0];
    }

    function onSlideChange() {
        showMenuBackground = $swiper?.activeIndex === 0;
    }
</script>

<div id="app">
    <swiper-container
        slides-per-view="auto"
        initial-slide={1}
        resistance-ratio={0}
        slide-to-clicked-slide={true}
        on:swiperprogress={onSwiperInit}
        on:swiperslidechange={onSlideChange}
    >
        <swiper-slide id="menu-slide">
            <Menu />
        </swiper-slide>
        <swiper-slide>
            {#if showMenuBackground}
                <div id="menu-background" transition:fade={{ duration: 150 }} />
            {/if}
            <slot />
        </swiper-slide>
    </swiper-container>
</div>

<style>
    swiper-container {
        height: 100%;
    }

    :global(#menu-slide) {
        width: 280px !important;
        z-index: 100;
    }

    #menu-background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5000;
        background-color: black;
        opacity: 0.3;
    }
</style>
