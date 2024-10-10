<script lang="ts">
    import { tick } from 'svelte';
    import { getMatchScore, isMatchFinished, match } from '$lib/stores/match';
    import { pointGoal } from '$lib/stores/settings';
    import Popup from '$lib/components/Popup.svelte';
    import { type DragOptions, draggable } from '@neodrag/svelte';
    import confetti from 'canvas-confetti';
    import { browser } from '$app/environment';
    import { swiper } from '$lib/stores/swiper';
    import { matchHistory } from '$lib/stores/history';
    import { areElementsOverlapping } from '$lib/utils';

    const dropBoxSelector = '.drop-box-half';
    const dropBoxHoverClass = 'drop-over';
    const startingPosition = { x: 0, y: 0 };

    let footerScrolledToLeft = $state(true);
    let showPopup = $state(false);

    const dragOptions: DragOptions = $state({
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
    });

    const isStroken = $derived((index: number) => $getMatchScore[index] >= $pointGoal - 2);

    $effect(() => {
        if ($match) {
            checkBoardState();
        }
    });

    function getHeader(index: number) {
        return $pointGoal.toString().split('')[index];
    }

    async function scrollToBottom() {
        if (!browser) {
            return;
        }
        await tick();
        const scoreBoxContent = document.querySelector('#score-box-content');
        scoreBoxContent?.scrollTo({ top: scoreBoxContent.scrollHeight, behavior: 'smooth' });
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
            matchHistory.addMatch($match);
        }
    }
</script>

<div class="view">
    <header>
        <div class="header-padding">
            <button class="icon header-buttons" onclick={() => $swiper?.slideTo(0)}>menu</button>
            <div id="header-points">{$getMatchScore[0]}-{$getMatchScore[1]}</div>
            <button
                class="icon header-buttons special-button"
                class:shown={$match.games.length > 0}
                onclick={() => (showPopup = true)}
            >
                more_vert
            </button>
        </div>
    </header>
    <main>
        <div class="box" id="game-box">
            <div id="forst"></div>
            <div id="sub-box">
                <div id="score-box">
                    <div id="score-box-header">
                        <div class="box-item">
                            <div class="half">{getHeader(0)}</div>
                            <div class="half">{getHeader(1)}</div>
                        </div>
                    </div>
                    <div id="score-box-content">
                        {#each $match.games as game}
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
                            <div class="line" hidden={!isStroken(i)}></div>
                        </div>
                        <div id="border{i + 1}"></div>
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
                <button class="icon arrow" id="arrow1" onclick={() => (footerScrolledToLeft = false)}>
                    keyboard_arrow_right
                </button>
                <button class="icon arrow" id="arrow2" onclick={() => (footerScrolledToLeft = true)}>
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
        background-color: var(--primaryColor);
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
        font-family: var(--kalam);
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
        font-family: var(--kalam);
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

    .chip {
        width: 60px;
        height: 60px;
        line-height: 64px;
        text-align: center;
        position: absolute;
        background-color: var(--primaryColor) !important;
        font-size: 45px;
        color: white;
        z-index: 4000;
        border: 3px solid #4b5215;
        font-family: var(--kalam);
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
