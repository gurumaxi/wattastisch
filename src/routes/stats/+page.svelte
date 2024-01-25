<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import { match } from '$lib/store';
    import { leadingZero } from '$lib/utils';
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import { t } from '$lib/stores/language';

    onMount(() => {
        if ($match.length > 0) {
            let label = ['Start'];
            let data1 = [0];
            let data2 = [0];
            for (let i = 0; i < $match.length; i++) {
                if ($match[i].team === 0) {
                    data1.push(data1[data1.length - 1] + $match[i].points);
                    data2.push(data2[data2.length - 1]);
                } else {
                    data1.push(data1[data1.length - 1]);
                    data2.push(data2[data2.length - 1] + $match[i].points);
                }
                const currentDate = new Date($match[i].time);
                label.push(leadingZero(currentDate.getHours()) + ':' + leadingZero(currentDate.getMinutes()));
            }
            new Chart(document.getElementById('chart')?.getContext('2d'), {
                type: 'line',
                data: {
                    labels: label,
                    datasets: [
                        {
                            label: 'Mir',
                            data: data2,
                            backgroundColor: '#36495d',
                            borderColor: '#36495d',
                            pointBackgroundColor: '#36495d',
                            borderWidth: 3,
                            fill: false,
                        },
                        {
                            label: 'Sie',
                            data: data1,
                            backgroundColor: '#47b784',
                            borderColor: '#47b784',
                            pointBackgroundColor: '#47b784',
                            borderWidth: 3,
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                lineWidth: 0,
                            },
                        },
                        y: {
                            ticks: {
                                stepSize: 2,
                            },
                        },
                    },
                    elements: {
                        line: {
                            tension: 0,
                        },
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }
    });

    function calculateAverageTime() {
        if ($match.length > 1) {
            let result = 0,
                counter = 0;
            for (let i = 1; i < $match.length; i++) {
                const secondsDiff = Math.round(($match[i].time - $match[i - 1].time) / 1000);
                if (secondsDiff <= 900) {
                    result += secondsDiff;
                    counter++;
                }
            }
            result /= counter;
            return Math.floor(result / 60) + ':' + leadingZero(Math.floor(result % 60));
        } else {
            return '-';
        }
    }
</script>

<div id="stats-view" class="view">
    <Header text={$t('statistiken')} />
    {#if $match.length > 0}
        <main>
            <div class="box" id="chart-box">
                <div class="box-title">{$t('stats1')}</div>
                <canvas id="chart" />
            </div>
            <div class="box half">
                <div class="big-number">{$match.length}</div>
                <div class="big-number-label">{$t('stats2')}</div>
            </div>
            <div class="box half">
                <div class="big-number">{calculateAverageTime()}</div>
                <div class="big-number-label">{$t('stats3')}</div>
            </div>
        </main>
    {:else}
        <main class="second-main">
            <div class="second-main-icon icon">hourglass_empty</div>
            <div class="second-main-text">{$t('noStats')}</div>
        </main>
    {/if}
</div>

<style>
    #chart {
        height: 300px !important;
        margin-top: 10px;
    }

    .box {
        padding: 10px;
    }

    .half {
        width: calc(50% - 5px);
        float: left;
        text-align: center;
        margin-right: 10px;
    }

    .half:nth-child(2n-1) {
        margin-right: 0;
    }

    .big-number {
        font-size: 40px;
    }

    .big-number-label {
        font-size: 14px;
        font-weight: 500;
        margin-top: 5px;
    }

    .second-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .second-main-icon {
        color: gray;
        font-size: 100px;
        margin-bottom: 10px;
    }

    .second-main-text {
        width: 80%;
        font-weight: 500;
        color: gray;
        text-align: center;
    }
</style>
