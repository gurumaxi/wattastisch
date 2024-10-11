<script lang="ts">
    import { settingsStore } from '$lib/stores/settings.svelte';
    import { page } from '$app/stores';
    import { browser, version } from '$app/environment';
    import type { MenuItem } from '$lib/types';
    import { uiStore } from '$lib/stores/swiper.svelte';
    import { base } from '$app/paths';

    const items: MenuItem[] = [
        { icon: 'assignment', name: 'zumBlock', path: '/' },
        { icon: 'timeline', name: 'statistiken', path: '/stats' },
        { icon: 'history', name: 'vergangenePartien', path: '/history' },
        { icon: 'settings', name: 'einstellungen', path: '/settings' },
    ];

    function shareApp() {
        navigator.share({
            title: 'Wattastisch',
            text: settingsStore.t('teilenText'),
            url: '',
        });
    }
</script>

<div id="menu">
    <div id="menu-header">
        <div id="app-logo"></div>
        <div id="app-title">Wattastisch</div>
    </div>
    <div id="menu-content">
        {#each items as item}
            <a
                class="menu-item"
                href={base + item.path}
                onclick={() => uiStore.swiper?.slideTo(1)}
                class:active={$page.url.pathname === item.path}
            >
                <div class="icon menu-square-icon">{item.icon}</div>
                <div class="menu-square-label">{settingsStore.t(item.name)}</div>
            </a>
        {/each}
        {#if browser && navigator}
            <button class="menu-item" onclick={shareApp}>
                <div class="icon menu-square-icon">share</div>
                <div class="menu-square-label">{settingsStore.t('teilen')}</div>
            </button>
        {/if}
    </div>
    <div id="menu-footer">
        <div>Version {version}</div>
        <div>Max Rialto</div>
        <!-- <div>maxrialto98@gmail.com</div> -->
    </div>
</div>

<style>
    #menu {
        width: 100%;
        height: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
    }

    #menu-header {
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--primaryColor);
        flex-shrink: 0;
    }

    #app-logo {
        width: 100px;
        height: 100px;
        background: url($lib/assets/images/logo.webp) no-repeat center/80px;
    }

    #app-title {
        font-size: 18px;
        color: white;
        font-weight: 500;
    }

    #menu-content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }

    .menu-item {
        width: 100%;
        height: 55px;
        display: flex;
        flex-direction: row;
    }

    .menu-square-icon {
        width: 55px;
        height: 55px;
        font-size: 30px;
        color: var(--primaryColor);
    }

    .menu-square-label {
        width: calc(100% - 55px);
        height: 100%;
        line-height: 55px;
        font-size: 16px;
        font-weight: 500;
    }

    #menu-footer {
        width: 100%;
        height: 80px;
        color: gray;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        flex-shrink: 0;
    }

    #menu-footer div {
        margin-bottom: 2px;
    }

    .active {
        background-color: var(--secondaryColor);
    }
</style>
