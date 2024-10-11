<script lang="ts">
    import { self } from 'svelte/legacy';
    import { settingsStore } from '$lib/stores/settings.svelte';
    import { fade, fly } from 'svelte/transition';

    type Props = {
        text: string;
        onClose: (x: boolean) => void;
    };

    const { text, onClose }: Props = $props();
</script>

<div
    id="dialog-container"
    class="swiper-no-swiping"
    onclick={self(() => onClose(false))}
    role="presentation"
    transition:fade={{ duration: 150 }}
>
    <div class="box" transition:fly={{ y: 300, duration: 250 }}>
        <div class="dialog-header">{text}</div>
        <div class="box-content">
            <button class="box-button" onclick={() => onClose(false)}>{settingsStore.t('nein')}</button>
            <button class="box-button" onclick={() => onClose(true)}>{settingsStore.t('ja')}</button>
        </div>
    </div>
</div>

<style>
    #dialog-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 9901;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dialog-header {
        font-size: 20px;
        padding: 30px 10px;
        text-align: center;
        font-weight: 500;
    }

    .box {
        width: calc(100% - 50px);
        max-width: 500px;
        max-height: calc(100% - 100px);
    }

    .box-content {
        padding: 10px;
        padding-top: 0;
    }

    .box-button {
        border-radius: 10px;
    }
</style>
