<script lang="ts">
    import { swiper } from '$lib/store';

    export let text: string;
</script>

<header>
    <div class="header-padding">
        <button class="icon header-buttons" on:click={() => $swiper?.slideTo(0)}>menu</button>
        <div id="header-text">{text}</div>
    </div>
</header>

<style>
    header {
        width: 100%;
        height: 60px;
        background-color: var(--color1);
        color: white;
    }

    .header-padding {
        width: 100%;
        margin: auto;
        overflow: hidden;
    }

    .header-buttons {
        width: 60px;
        height: 60px;
        float: left;
    }

    #header-text {
        width: calc(100% - 60px);
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        font-weight: 500;
        float: left;
    }
</style>
