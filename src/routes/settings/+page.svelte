<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import { pointGoal } from '$lib/stores/settings';
    import { language, t } from '$lib/stores/settings';
    import { Language } from '$lib/types';

    const availablePoints = [11, 15, 18, 21];
</script>

<div id="settings-view" class="view">
    <Header text={$t('einstellungen')} />
    <main>
        <div class="box">
            <div class="box-header">
                <div class="box-header-text">{$t('endPunkteZahl')}</div>
            </div>
            <div class="box-content">
                {#each availablePoints as item}
                    <button class="box-button" class:active={$pointGoal === item} on:click={() => ($pointGoal = item)}>
                        {item}
                    </button>
                {/each}
            </div>
        </div>
        <div class="box">
            <div class="box-header">
                <div class="box-header-text">{$t('sprache')}</div>
            </div>
            <div class="box-content">
                <select bind:value={$language}>
                    {#each Object.values(Language) as lang}
                        <option value={lang}>{lang}</option>
                    {/each}
                </select>
            </div>
        </div>
    </main>
</div>

<style>
    .box-button {
        width: 25%;
        margin-right: 0;
        background-color: var(--color2);
    }

    .active {
        background-color: var(--color1);
        color: white;
    }
</style>
