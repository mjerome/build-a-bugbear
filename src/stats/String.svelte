<script>
    export let stats;
    import {monster} from '../stores.js';
    export let edit;
    export let dawizard;

    let lowerStats = stats.replaceAll(' ','_').toLowerCase()
    let keys = [];

    for (var i = 0, len = $monster[lowerStats].length; i < len; i++) {
        keys.push(i)
    };

    const {update} = monster;
    
    let addStat = () => {
        update((data) => {
            let length = Object.keys(data[lowerStats]).length;
            console.log('length ', length);
            data[lowerStats][parseInt(length)] = {
                name: '',
                desc: '',
            };
            console.log('data ', data[lowerStats]);
            keys.push(length);
            return data;
        })
        console.log('monster ', $monster);
    }
</script>

{#if $monster[lowerStats] && $monster[lowerStats] != ''}
    {console.log($monster[lowerStats])}
    <div class={lowerStats, dawizard}>
        <h3>{stats}</h3>
        {#each keys as key}
            <div class="stat">
                {#if $monster[lowerStats][key]}
                    {#if edit}
                        <input bind:value={$monster[lowerStats][key].name}/>
                        <textarea bind:value={$monster[lowerStats][key].desc} />
                    {:else}
                        <div class="stat-header">{$monster[lowerStats][key].name}</div>
                        <div>{$monster[lowerStats][key].desc}</div>
                    {/if}
                {/if}
            </div>
        {/each}
        {#if edit}
            <button on:click={addStat}>+</button>
        {/if}
    </div>
{/if} 