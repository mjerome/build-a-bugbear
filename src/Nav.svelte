<script>

    import { onMount } from 'svelte';	
	import {monster} from './stores';
    import {navigate} from 'svelte-routing';
	import { getMonsterList, getMonsterByName } from "./apis/Monster"; // import our pokemon api calls
    $: searchValue = '';
	$: monsterDetail = monster;
	$: monsterList = [];
	
    
    
    function handleOnClick() {
		console.log('searched');
		let search = searchValue.replaceAll(' ', '-').toLowerCase();
		getMonsterByName(search).then(res => {
			monster.set(res);
			monsterDetail = $monster;
		}).then(() => {
            let name = $monster.name
	        let lowerName = name ? name.replaceAll(' ', '-').toLowerCase() : '';
            navigate("/monster/" + lowerName, { replace: true });
            console.log('Nav ', lowerName);
            // console.log('should have navigated');
			searchValue='';
            console.log('monster onMount ', $monster);
		});
		
	};
</script>

<nav>
    <h1>Build-a-Bugbear</h1>
    <form>
        <input placeholder="Enter monster name" bind:value={searchValue} />
        <button on:click={handleOnClick} type="button"><img alt="search for a monster" src="/assets/search.svg"/></button>
    </form>
</nav>