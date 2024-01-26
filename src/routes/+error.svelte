<script>
    import logo from '$lib/assets/images/logo.webp';
    import { base } from '$app/paths';
</script>

<div class="view">
    <img width="150" src={logo} alt="logo" />
    <div class="error-text">Ein Fehler ist aufgetreten</div>
    <a class="button" href="{base}/">Zum Block</a>
</div>

<style>
    .view {
        background-color: var(--primaryColor);
        color: var(--secondaryColor);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .error-text {
        margin-top: 10px;
    }

    .button {
        background-color: var(--secondaryColor);
        color: var(--primaryColor);
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
        font-weight: 500;
    }
</style>
