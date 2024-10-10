<script lang="ts">
    import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
    import Header from '$lib/components/Header.svelte';
    import { matchHistory } from '$lib/stores/history';
    import { computeMatchScore } from '$lib/stores/match';
    import { t } from '$lib/stores/settings';

    let confirmDialog = $state(false);

    function onConfirmDialogClose(accepted: boolean) {
        confirmDialog = false;
        if (accepted) {
            matchHistory.delete();
        }
    }
</script>

<div id="history-view" class="view">
    <Header text={$t('vergangenePartien')} buttonIcon="delete" onButtonClick={() => (confirmDialog = true)} />
    {#if $matchHistory.length}
        <main>
            {#each $matchHistory as match}
                {@const score = computeMatchScore(match)}
                {@const lastGame = match.games[match.games.length - 1]}
                <div class="box">
                    <div class="box-header">
                        <div class="box-header-text">
                            {new Date(lastGame.time).toLocaleDateString()}
                            -
                            {new Date(lastGame.time).toLocaleTimeString('de-DE', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </div>
                    <div class="box-content">
                        <div class="score">{score[0]} - {score[1]}</div>
                    </div>
                </div>
            {/each}
        </main>
    {:else}
        <main class="center">
            <div class="empty-icon icon">history</div>
            <div class="empty-text">{$t('noHistory')}</div>
        </main>
    {/if}
</div>

{#if confirmDialog}
    <ConfirmDialog text={$t('confirmHistoryDeletion')} onClose={onConfirmDialogClose} />
{/if}

<style>
    main {
        overflow-y: auto;
    }

    main.center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .empty-icon {
        color: gray;
        font-size: 100px;
        margin-bottom: 10px;
    }

    .empty-text {
        width: 80%;
        font-weight: 500;
        color: gray;
        text-align: center;
    }

    .score {
        width: 100%;
        text-align: center;
        font-family: var(--kalam);
        font-size: 40px;
        padding: 10px 0;
    }
</style>
