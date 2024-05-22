<script lang="ts">
    import { swiper } from '$lib/stores/swiper';

    export let text: string;
    export let buttonIcon: string | null = null;
    export let onButtonClick: () => void = () => null;
</script>

<header>
    <button class="icon header-buttons" on:click={() => $swiper?.slideTo(0)}>menu</button>
    <div id="header-text">{text}</div>
    {#if buttonIcon}
        <button class="icon header-buttons" on:click={onButtonClick}>{buttonIcon}</button>
    {/if}
</header>

<style>
    header {
        width: 100%;
        height: 60px;
        background-color: var(--primaryColor);
        color: white;
        display: flex;
        justify-content: center;
    }

    .header-buttons {
        width: 60px;
        height: 60px;
        flex-shrink: 0;
    }

    #header-text {
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        font-weight: 500;
    }
</style>
