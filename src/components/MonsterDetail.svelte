<script>
    import String from '../stats/String.svelte';
    import Object from '../stats/Object.svelte';
    import Nav from '../Nav.svelte';
    import {monster, localMonsterList, STORAGE_ID, monsterStore} from '../stores';
    let stats = {
        'armor_class':'Armor Class',
        'hit_points': 'Hit Points',
        'speed': 'Speed',
    };
    let abilities = {
        'strength':'STR',
        'dexterity':'DEX',
        'constitution':'CON',
        'intelligence':'INT',
        'wisdom':'WIS',
        'charisma':'CHA',
    }
    let proficiencies = {
        'skills': 'Skills', 
        'languages': 'Languages',
        'senses': 'Senses',
        'challenge_rating': 'Challenge'
    }
    let buttonValue = 'Edit';
    $: edit = false;
    

    function toggleEdit() {
        edit = !edit;
        console.log({edit});
        console.log("whyyyyyyyyyy")
        if (!edit) {
            monsterStore.addMonster($monster)
        }
        return (
            edit ? buttonValue = 'Done' : buttonValue = 'Edit'
        )
    }

    console.log('new Monster block ', $monster);

</script>
<main>
    <div class="top-nav">
        <Nav />
    </div>
    
    <div id="monsterBlock" class="monster-block">
        <form method="get" action="file.doc">
            <div class="header">
                <div>
                    <h2>


                {#if edit}
                    <input placeholder="{$monster.name}" bind:value={$monster.name} />
                {:else}
                    {$monster.name}
                    
                {/if}
                    </h2>
                    <div>{$monster.size} {$monster.type} {$monster.subtype}</div>
                </div>
                <div class="buttons">
                    <button type="button" on:click={toggleEdit}>{buttonValue}</button>
                    <button type="button" onClick="window.print()">Print</button>            </div>
            </div>
        </form>
        
        <Object 
            stats={stats}
            dawizard='stats'
            edit={edit}
        />
        <Object
            stats={abilities}
            dawizard='abilities'
            edit={edit}
        />
        <Object
            stats={proficiencies}
            dawizard='proficiencies'
            edit={edit}
        />
        <String
            stats="Special Abilities"
            dawizard='special-abilities'
            edit={edit}
        />
        <String
            stats="Actions"
            dawizard='actions'
            edit={edit}/>
        <String
            stats="Legendary Actions"
            dawizard='legendar-actions'
            edit={edit}/>
    </div>
</main>

    
    
