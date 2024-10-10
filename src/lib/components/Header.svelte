<script lang="ts">
    import { swiper } from '$lib/stores/swiper';

    interface Props {
        text: string;
        buttonIcon?: string;
        onButtonClick?: () => void;
    }

    const { text, buttonIcon, onButtonClick = () => null }: Props = $props();
</script>

<header>
    <button class="icon header-buttons" onclick={() => $swiper?.slideTo(0)}>menu</button>
    <div id="header-text">{text}</div>
    {#if buttonIcon}
        <button class="icon header-buttons" onclick={onButtonClick}>{buttonIcon}</button>
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
