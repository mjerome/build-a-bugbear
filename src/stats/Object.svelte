<script>
    import { onMount } from "svelte";

    export let stats;
    export let edit;
    export let dawizard;
    import { monster } from "../stores";
    $: disabled = edit == true ? "" : "disabled";

    let mainKeys = [];
    let tempOrder = [];
    const { update } = monster;

    onMount(async () => {
        for (const [key, value] of Object.entries(stats)) {
            mainKeys.push(key);
            if (typeof $monster[key] === "object") {
                Object.keys($monster[key]).forEach((item) => {
                    console.log("item ", Object.keys($monster[key]));
                    update((data) => {
                        console.log("keyItem ", data[key][item]);
                        data[key][item] = {
                            desc: data[key][item],
                            name: Object.keys(data[key]).find(
                                (lock) => data[key][lock] === data[key][item]
                            ),
                        };
                        console.log("data ", data);
                        return data;
                    });
                });
            }
        }
    });

    let addSkills = (stat) => {
        update((data) => {
            let length = Object.keys(data[stat]).length;
            console.log('length ', length);
            data[stat][parseInt(length)] = {
                name: '',
                desc: '',
            };
            console.log('data ', data[stat]);
            // keys.push(length);
            return data;
        })
        console.log('monster ', $monster);
    }
</script>

<div class="section {dawizard}">
    {#each mainKeys as stat}
        <div>
            <span class="stat-header">{stats[stat]}: </span>
            {#if typeof $monster[stat] === "object"}
                {#each Object.keys($monster[stat]) as sub}
                    
                    {#if edit}
                        <div>
                            <input placeholder="add a skill name" bind:value={$monster[stat][sub].name} />
                            <input placeholder="add a skill value" bind:value={$monster[stat][sub].desc} />
                        </div>
                        
                    {:else}
                        <span class="sub-stat">
                            <span>{$monster[stat][sub].name}:</span>
                            <span>{$monster[stat][sub].desc}</span>
                        </span>
                        
                    {/if}
                {/each}
                {#if edit}
                    <button on:click={() => addSkills(stat)}>+</button>
                {/if}
            {:else if edit}
                <input
                    size={$monster[stat].length}
                    bind:value={$monster[stat]}
                />
            {:else}
                <span>{$monster[stat]}</span>
            {/if}
            <!-- {#if edit}
                    <input size={$monster[stat].length} value={ability(stat)}/>
                {:else}
                    <span>{ability(stat)}</span>
                {/if} -->
        </div>
    {/each}
</div>
