<script>
	import { onMount } from 'svelte';	
	import {monster} from './stores';
	import { getMonsterList, getMonsterByName } from "./apis/Monster"; // import our pokemon api calls
	import MonsterDetail from './MonsterDetail.svelte';
	$: searchValue = '';
	$: monsterDetail = monster;
	$: monsterList = [];

	console.log('monster onMount ', $monster);

	// Get the data from the api, after the page is mounted.
	// onMount(async () => {
	// 	const res = await getMonsterList();
	// 	monsterList = res;
	
	// });

	// method to handle the event to get the detail of the monster.
	function handleOnClick() {
		console.log('searched');
		let search = searchValue.replaceAll(' ', '-').toLowerCase();
		getMonsterByName(search).then(res => {
			monster.set(res);
			// $monster = $monster;
			monsterDetail = $monster;
			const nav = document.getElementById('nav')
			nav.classList.add('top-nav');
			nav.classList.remove('home');

		}).then(() => {
			searchValue='';
		});
		
	};
</script>

<main>
	<nav id="nav" class="home">
		<h1>Build-a-Bugbear</h1>
		<form>
			<input placeholder="Enter monster name" bind:value={searchValue} />
			<button on:click={handleOnClick} type="button"><img alt="search for a monster" src="/assets/search.svg"/></button>
		</form>
	</nav>
	{#if monsterDetail.name}
		<MonsterDetail />
	{/if}
</main>