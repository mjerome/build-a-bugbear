<script>

    import { onMount } from 'svelte';	
	import {monster, searchError} from './stores';
    import {navigate} from 'svelte-routing';
	import { getMonsterList, getMonsterByName } from "./apis/Monster"; // import our pokemon api calls
    $: searchValue = '';
	$: monsterDetail = monster;
	$: error = searchError

    function handleOnClick() {
		console.log('onClick called');
		let search = searchValue.replaceAll(' ', '-').toLowerCase();
        console.log('searchValue ', searchValue);
		getMonsterByName(search).then(res => {
            console.log('getting Monster', res)
            if(!$searchError) {
                monster.set(res);
			    monsterDetail = $monster;
            }
		}).then(() => {
            console.log(searchError);
            if(!$searchError) {
                let name = $monster.name
                let lowerName = name ? name.replaceAll(' ', '-').toLowerCase() : '';
                navigate("/monster/" + lowerName, { replace: true });
                console.log('Nav ', lowerName);
                // console.log('should have navigated');
                searchValue='';
                console.log('monster onMount ', $monster);
            }
            
		});
		
	};

    document.addEventListener("DOMContentLoaded", function(){
        let el = document.getElementById("search");
        console.log('el ', el);
        if(el) {
            console.log('el exists');
            el.addEventListener("keydown",
                function(event) {
                    console.log('key code ', event.key)
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
    <div class="search">
        <form>
            <input id="search" placeholder="Enter monster name" bind:value={searchValue} />
            <button on:click={handleOnClick} type="button"><img alt="search for a monster" src="/assets/search.svg"/></button>
        </form>
        {#if $searchError}
            <div>That monster does not exist. Please try another search.</div>
        {/if}
    </div>
    
</nav>