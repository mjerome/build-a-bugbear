<script>
	
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./Home.svelte";
	import MonsterDetail from "./components/MonsterDetail.svelte";
	import { monster } from "./stores";
	let name = $monster.name;
	
	export let lowerName = name ? name.replaceAll(' ', '-').toLowerCase() : '';
	export let url = "";
</script>
  
  <Router url="{url}">
	<div>
	  <!-- <Route path="blog/:id" component="{BlogPost}" />
	  <Route path="blog" component="{Blog}" />
	  <Route path="about" component="{About}" /> -->
	  <!-- <Route path="monster/{$monster.name}" component="{MonsterDetail}" /> -->
	  <Route path="/"><Home /></Route>
	  <Route path="/monster/:lowerName" component="{MonsterDetail}"></Route>
	</div>
  </Router>