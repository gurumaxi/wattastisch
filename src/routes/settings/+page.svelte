<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import { settingsStore, t } from '$lib/stores/settings.svelte';
    import { Language } from '$lib/types';

    const availablePoints = [11, 15, 18, 21];
</script>

<div class="view">
    <Header text={t('einstellungen')} />
    <main>
        <div class="box">
            <div class="box-header">
                <div class="box-header-text">{t('endPunkteZahl')}</div>
            </div>
            <div class="box-content">
                {#each availablePoints as item}
                    <button
                        class="box-button"
                        class:active={settingsStore.pointGoal === item}
                        onclick={() => (settingsStore.pointGoal = item)}
                    >
                        {item}
                    </button>
                {/each}
            </div>
        </div>
        <div class="box">
            <div class="box-header">
                <div class="box-header-text">{t('sprache')}</div>
            </div>
            <div class="box-content">
                <select bind:value={settingsStore.language}>
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
        background-color: var(--secondaryColor);
    }

    .active {
        background-color: var(--primaryColor);
        color: white;
    }
</style>
