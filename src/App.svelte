<script>
	
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./Home.svelte";
	import MonsterDetail from "./components/MonsterDetail.svelte";
	import NotFound from "./components/NotFound.svelte";
	import { monster } from "./stores";
	let name = $monster.name;
	
	export let lowerName = name ? name.replaceAll(' ', '-').toLowerCase() : '';
	export let url = "";
</script>
  
  <Router>
	<div>
	  <Route path="/" exact component="{Home}"/>
	  <Route path="/monster/:lowerName" component="{MonsterDetail}" />
	  <Route component="{NotFound}"/>
	</div>
  </Router>