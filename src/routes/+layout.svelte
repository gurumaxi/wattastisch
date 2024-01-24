<script lang="ts">
    import Menu from '$lib/components/Menu.svelte';
    import { swiper } from '$lib/store';
    import { fade } from 'svelte/transition';
    import { Swiper, SwiperSlide } from 'swiper/svelte';

    // css
    import 'swiper/css';
    import '$lib/style/global.css';
    import '$lib/style/ui.css';

    let showMenuBackground = false;

    function onSlideChange() {
        showMenuBackground = $swiper?.activeIndex === 0;
    }
</script>

<div id="app">
    <Swiper
        slidesPerView={'auto'}
        initialSlide={1}
        resistanceRatio={0}
        slideToClickedSlide={true}
        on:swiper={(e) => ($swiper = e.detail[0])}
        on:slideChange={onSlideChange}
    >
        <SwiperSlide id="menu-slide">
            <Menu />
        </SwiperSlide>
        <SwiperSlide>
            {#if showMenuBackground}
                <div id="menu-background" transition:fade={{ duration: 150 }} />
            {/if}
            <slot />
        </SwiperSlide>
    </Swiper>
</div>

<style>
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
