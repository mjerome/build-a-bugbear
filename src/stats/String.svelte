<script>
    export let stats;
    import {monster} from '../stores.js';
    export let edit;
    export let dawizard;

    let lowerStats = stats.replaceAll(' ','_').toLowerCase()
    let keys = [];


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
    <div class={lowerStats, dawizard}>
        <h3>{stats}</h3>
        {#if $monster.legendary_desc != '' && lowerStats == 'legendary_actions'} 
            {#if edit}
                <textarea bind:value={$monster.legendary_desc}/>
            {:else}
                <p>{$monster.legendary_desc}</p>
            {/if}
        {/if}
        {#each Object.keys($monster[lowerStats]) as key}
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