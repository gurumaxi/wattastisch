<script lang="ts">
    import { self } from 'svelte/legacy';
    import { fade, fly } from 'svelte/transition';
    import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
    import { tick } from 'svelte';
    import { base } from '$app/paths';
    import { matchStore } from '$lib/stores/match.svelte';
    import { settingsStore } from '$lib/stores/settings.svelte';

    interface Props {
        onClose: () => void;
    }

    const { onClose }: Props = $props();

    let confirmDialog = $state(false);

    function oneBack() {
        matchStore.revertLastGame();
        onClose();
    }

    function getHeaderText() {
        if (!matchStore.isFinished()) {
            return settingsStore.t('headerText');
        }
        if (matchStore.getScore(0) > matchStore.getScore(1)) {
            return settingsStore.t('spielFertigSie');
        }
        return settingsStore.t('spielFertigMir');
    }

    function newGame() {
        if (matchStore.isFinished()) {
            resetMatch();
        } else {
            confirmDialog = true;
        }
    }

    function resetMatch() {
        matchStore.reset();
        onClose();
    }

    async function onConfirmDialogClose(accepted: boolean) {
        confirmDialog = false;
        if (accepted) {
            await tick();
            resetMatch();
        }
    }
</script>

<div
    id="popup-container"
    class="swiper-no-swiping"
    onclick={self(onClose)}
    role="presentation"
    transition:fade={{ duration: 150 }}
>
    <div class="box" transition:fly={{ y: 300, duration: 250 }}>
        <div class="popup-header">
            {getHeaderText()}
        </div>
        <div class="box-content">
            <button class="box-button" onclick={newGame}>
                <div class="box-button-icon icon">note_add</div>
                <div class="box-button-text">{settingsStore.t('neuesSpiel')}</div>
            </button>
            {#if matchStore.isFinished()}
                <a class="box-button" href="{base}/stats">
                    <div class="box-button-icon icon">timeline</div>
                    <div class="box-button-text">{settingsStore.t('statistiken')}</div>
                </a>
            {:else}
                <button class="box-button" onclick={oneBack}>
                    <div class="box-button-icon icon">fast_rewind</div>
                    <div class="box-button-text">{settingsStore.t('zugZurueck')}</div>
                </button>
            {/if}
        </div>
    </div>
</div>

{#if confirmDialog}
    <ConfirmDialog text={settingsStore.t('neuesSpielConfirm')} onClose={onConfirmDialogClose} />
{/if}

<style>
    #popup-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 9900;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup-header {
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

    .box-button-icon {
        font-size: 40px;
        color: var(--textColor);
        padding: 3px;
    }

    .box-button-text {
        font-size: 16px;
        margin-top: 5px;
    }
</style>
