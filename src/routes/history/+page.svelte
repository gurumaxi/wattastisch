<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import { matchHistory } from '$lib/stores/history';
    import { computeMatchScore } from '$lib/stores/match';
    import { t } from '$lib/stores/settings';
</script>

<div id="history-view" class="view">
    <Header text={$t('vergangenePartien')} />
    <main class:center={!$matchHistory.length}>
        {#each $matchHistory as match}
            {@const score = computeMatchScore(match)}
            <div class="box">
                <div class="box-header">
                    <div class="box-header-text">
                        {new Date(match.games[match.games.length - 1].time).toLocaleDateString()}
                    </div>
                </div>
                <div class="box-content">
                    <div class="score">{score[0]} - {score[1]}</div>
                </div>
            </div>
        {:else}
            <div class="empty-icon icon">history</div>
            <div class="empty-text">{$t('noHistory')}</div>
        {/each}
    </main>
</div>

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
    }
</style>
