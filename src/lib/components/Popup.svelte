<script lang="ts">
    import { t } from '$lib/stores/settings';
    import { match, getMatchScore, isMatchFinished } from '$lib/stores/match';
    import { fade, fly } from 'svelte/transition';

    export let onClose: () => unknown;

    function oneBack() {
        match.revertLastGame();
        onClose();
    }

    function getHeaderText() {
        if (!$isMatchFinished) return $t('headerText');
        if ($getMatchScore[0] > $getMatchScore[1]) return $t('spielFertigSie');
        return $t('spielFertigMir');
    }

    function newGame() {
        const resetMatch = $isMatchFinished ? true : confirm($t('neuesSpielConfirm'));
        if (resetMatch) {
            match.reset();
        }
        onClose();
    }
</script>

<div
    id="popup-container"
    class="swiper-no-swiping"
    on:click|self={onClose}
    role="presentation"
    transition:fade={{ duration: 150 }}
>
    <div class="box" transition:fly={{ y: 300, duration: 250 }}>
        <div class="popup-header">
            {getHeaderText()}
        </div>
        <div class="box-content">
            <button class="box-button" on:click={newGame}>
                <div class="box-button-icon icon">note_add</div>
                <div class="box-button-text">{$t('neuesSpiel')}</div>
            </button>
            {#if $isMatchFinished}
                <a class="box-button" href="/stats">
                    <div class="box-button-icon icon">timeline</div>
                    <div class="box-button-text">{$t('statistiken')}</div>
                </a>
            {:else}
                <button class="box-button" on:click={oneBack}>
                    <div class="box-button-icon icon">fast_rewind</div>
                    <div class="box-button-text">{$t('zugZurueck')}</div>
                </button>
            {/if}
        </div>
    </div>
</div>

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
