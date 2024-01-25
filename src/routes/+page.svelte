<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { match, getMatchScore, isMatchFinished } from '$lib/stores/match';
    import { pointGoal } from '$lib/stores/settings';
    import Popup from '$lib/components/Popup.svelte';
    import { draggable, type DragOptions } from '@neodrag/svelte';
    import confetti from 'canvas-confetti';
    import { browser } from '$app/environment';
    import { swiper } from '$lib/stores/swiper';

    onMount(checkBoardState);

    let footerScrolledToLeft = true;
    let showPopup = false;

    $: $match, checkBoardState();
    $: isStroken = (index: number) => $getMatchScore[index] >= $pointGoal - 2;

    const dropBoxSelector = '.drop-box-half';
    const dropBoxHoverClass = 'drop-over';
    const startingPosition = { x: 0, y: 0 };

    const dragOptions: DragOptions = {
        bounds: 'main',
        // needed for resetting position on drop
        position: startingPosition,
        disabled: $isMatchFinished,
        onDrag: ({ currentNode }) => {
            const dropBoxes = document.querySelectorAll(dropBoxSelector);
            for (const box of dropBoxes) {
                if (areElementsOverlapping(currentNode, box)) {
                    box.classList.add(dropBoxHoverClass);
                } else {
                    box.classList.remove(dropBoxHoverClass);
                }
            }
        },
        onDragEnd: ({ currentNode }) => {
            const dropBoxes = document.querySelectorAll(dropBoxSelector);
            for (const box of dropBoxes) {
                if (!areElementsOverlapping(currentNode, box)) {
                    continue;
                }
                const index = box.id === 'drop-box-1' ? 0 : 1;
                const points = Number(currentNode.innerHTML);
                box.classList.remove(dropBoxHoverClass);
                match.addGame(index, points);
            }

            // always reset chip position
            dragOptions.position = startingPosition;
        },
    };

    function areElementsOverlapping(element1: Element, element2: Element): boolean {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        const overlapX = Math.max(
            0,
            Math.min(rect1.x + rect1.width, rect2.x + rect2.width) - Math.max(rect1.x, rect2.x)
        );
        const overlapY = Math.max(
            0,
            Math.min(rect1.y + rect1.height, rect2.y + rect2.height) - Math.max(rect1.y, rect2.y)
        );
        const areaElement1 = rect1.width * rect1.height;
        const areaElement2 = rect2.width * rect2.height;
        return overlapX * overlapY > 0.5 * Math.min(areaElement1, areaElement2);
    }

    function getHeader(index: number) {
        return $pointGoal.toString().split('')[index];
    }

    function checkBoardState() {
        scrollToBottom();
        dragOptions.disabled = $isMatchFinished;
        if ($isMatchFinished) {
            showPopup = true;
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
            });
        }
    }

    async function scrollToBottom() {
        if (!browser) {
            return;
        }
        await tick();
        const scoreBoxContent = document.querySelector('#score-box-content');
        scoreBoxContent?.scrollTo({ top: scoreBoxContent.scrollHeight, behavior: 'smooth' });
    }
</script>

<div id="board-view" class="view">
    <header>
        <div class="header-padding">
            <button class="icon header-buttons" on:click={() => $swiper?.slideTo(0)}>menu</button>
            <div id="header-points">{$getMatchScore[0]}-{$getMatchScore[1]}</div>
            <button
                class="icon header-buttons special-button"
                class:shown={$match.length > 0}
                on:click={() => (showPopup = true)}
            >
                more_vert
            </button>
        </div>
    </header>
    <main>
        <div class="box" id="game-box">
            <div id="forst" />
            <div id="sub-box">
                <div id="score-box">
                    <div id="score-box-header">
                        <div class="box-item">
                            <div class="half">{getHeader(0)}</div>
                            <div class="half">{getHeader(1)}</div>
                        </div>
                    </div>
                    <div id="score-box-content">
                        {#each $match as game}
                            <div class="box-item">
                                <div class="half">{game.team === 0 ? game.points : '-'}</div>
                                <div class="half">{game.team === 1 ? game.points : '-'}</div>
                            </div>
                        {/each}
                    </div>
                </div>
                <div id="drop-box">
                    {#each Array(2) as _, i}
                        <div class="drop-box-half" id="drop-box-{i + 1}">
                            <div class="line" hidden={!isStroken(i)} />
                        </div>
                        <div id="border{i + 1}" />
                    {/each}
                </div>
            </div>
        </div>
        <div id="chips" class="swiper-no-swiping">
            <div id="chips2" class:moved={!footerScrolledToLeft}>
                <div class="chip-box">
                    <div class="chip" use:draggable={dragOptions}>2</div>
                </div>
                <div class="chip-box">
                    <div class="chip" use:draggable={dragOptions}>3</div>
                </div>
                <div class="chip-box">
                    <div class="chip" use:draggable={dragOptions}>4</div>
                </div>
                <div class="chip-box">
                    <div class="chip" use:draggable={dragOptions}>5</div>
                </div>
                <button class="icon arrow" id="arrow1" on:click={() => (footerScrolledToLeft = false)}>
                    keyboard_arrow_right
                </button>
                <button class="icon arrow" id="arrow2" on:click={() => (footerScrolledToLeft = true)}>
                    keyboard_arrow_left
                </button>
                <div class="chip-box">
                    <div class="chip" use:draggable={dragOptions}>6</div>
                </div>
                <div class="chip-box">
                    <div class="chip" use:draggable={dragOptions}>7</div>
                </div>
                <div class="chip-box">
                    <div class="chip" use:draggable={dragOptions}>8</div>
                </div>
                <div class="chip-box">
                    <div class="chip" use:draggable={dragOptions}>-2</div>
                </div>
            </div>
        </div>
    </main>
</div>

{#if showPopup}
    <Popup onClose={() => (showPopup = false)} />
{/if}

<style>
    header {
        width: 100%;
        height: 60px;
        background-color: var(--color1);
        color: white;
    }

    .header-padding {
        width: 100%;
        overflow: hidden;
        margin: auto;
    }

    .header-buttons {
        width: 60px;
        height: 60px;
        float: left;
    }

    .special-button {
        margin-top: -60px;
        transition: 0.3s;
    }

    .special-button.shown {
        margin-top: 0;
    }

    #header-points {
        width: calc(100% - 120px);
        height: 60px;
        line-height: 70px;
        font-size: 50px;
        text-align: center;
        float: left;
        font-family: Kalam, cursive;
    }

    main {
        padding-bottom: 0 !important;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #game-box {
        height: calc(100% - 80px);
        padding: 0;
        font-family: Kalam, cursive;
        position: relative;
        margin-bottom: 0;
    }

    #forst {
        width: 100%;
        height: 70px;
        padding-top: 5px;
        background: url($lib/assets/images/forst.webp) no-repeat center/100px;
    }

    #sub-box {
        width: 100%;
        height: calc(100% - 70px);
        position: relative;
        padding: 0 10px 10px;
    }

    #drop-box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .drop-box-half {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }

    .drop-box-half:first-child {
        padding-left: 8px;
    }

    :global(.drop-over) {
        background-color: #e2e2e2;
    }

    #border1,
    .line {
        width: 10px;
        height: 100%;
        background: url($lib/assets/images/border1.png) no-repeat center/cover;
    }

    #border2 {
        width: calc(100% - 20px);
        height: 10px;
        position: absolute;
        top: 35px;
        transition: 0.1s;
        background: url($lib/assets/images/border2.png) no-repeat center/cover;
    }

    #score-box {
        width: calc(100% - 20px);
        height: calc(100% - 10px);
        position: absolute;
        z-index: 600;
    }

    #score-box-header .box-item {
        line-height: 48px;
        font-size: 35px;
    }

    #score-box-content {
        height: calc(100% - 40px);
        padding-top: 10px;
        overflow-y: auto;
        transition: 0.3s;
    }

    .box-item {
        width: 100%;
        height: 40px;
        line-height: 45px;
        text-align: center;
        font-size: 30px;
        display: flex;
        flex-direction: row;
    }

    .half {
        width: 50%;
    }

    #chips {
        width: 100%;
        height: 80px;
    }

    #chips2 {
        width: 200%;
        height: 80px;
        display: flex;
        flex-direction: row;
        transition: 0.3s;
    }

    .chip-box {
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-grow: 3;
        flex-basis: 0;
    }

    :global(.chip) {
        width: 60px;
        height: 60px;
        line-height: 64px;
        text-align: center;
        position: absolute;
        background-color: var(--color1) !important;
        font-size: 45px;
        color: white;
        z-index: 4000;
        border: 3px solid #4b5215;
        font-family: Kalam, cursive;
        touch-action: none;
        user-select: none;
        border-radius: 10px;
    }

    .arrow {
        height: 80px;
        font-size: 40px;
        flex-grow: 2;
        flex-basis: 0;
        color: gray;
    }

    .moved {
        transform: translate3d(-50%, 0px, 0px);
    }
</style>
