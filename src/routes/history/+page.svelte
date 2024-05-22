<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import { matchHistory } from '$lib/stores/history';
    import { computeMatchScore } from '$lib/stores/match';
    import { t } from '$lib/stores/settings';
</script>

<div id="history-view" class="view">
    <Header text={$t('vergangenePartien')} />
    <main>
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
            no matches
        {/each}
    </main>
</div>

<style>
    main {
        overflow-y: auto;
    }

    .score {
        width: 100%;
        text-align: center;
        font-family: var(--kalam);
        font-size: 40px;
    }
</style>
