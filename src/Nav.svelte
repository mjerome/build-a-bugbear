<script>

    import { onMount } from 'svelte';	
	import {monster, searchError, STORAGE_ID, newMonster, edit} from './stores';
    import {navigate} from 'svelte-routing';
	import { getMonsterByName } from "./apis/Monster"; // import our dnd api calls
    $: searchValue = '';
	$: monsterDetail = monster;
	$: error = searchError

    function createNewMonster() {
        //set monster to newMonster
        monster.set(newMonster);
        monsterDetail = $monster;
        //set edit to true
        edit.set(true);
        console.log($edit);
        //navigate to /monster/new
        navigate("/monster/new"); 
    }

    function handleOnClick() {
		let search = searchValue.replaceAll(' ', '-').toLowerCase();

		getMonsterByName(search).then(res => {
                if(!$searchError) {
                    monster.set(res);
                    monsterDetail = $monster;
                }
            
		}).then(() => {
            if(!$searchError) {
                let name = $monster.name
                let lowerName = name ? name.replaceAll(' ', '-').toLowerCase() : '';
                navigate("/monster/" + lowerName, { replace: true });
                searchValue='';
            }
            
		});
		
	};

    document.addEventListener("DOMContentLoaded", function(){
        let el = document.getElementById("search");
        if(el) {
            el.addEventListener("keydown",
                function(event) {
                    if (event.key == 'Enter'){
                        event.preventDefault();
                        handleOnClick();
                    }
                }, false);
        }
    });
    
    
</script>

<nav>
    <h1>Build-a-Bugbear</h1>
    <div class="button-container">
        <div class="search">
            <form class="search-form">
                <input id="search" placeholder="Search by monster name" bind:value={searchValue} />
                <button on:click={handleOnClick} type="button"><img alt="search for a monster" src="/assets/search.svg"/></button>
            </form>
            {#if $searchError}
                <div>That monster does not exist. Please try another search.</div>
            {/if}
            
        </div>
        <div><button class="default-button" on:click={createNewMonster} type="button">Create New Monster</button></div>

       
    </div>  
</nav>