<template>
	<div id="app">
		<nav class="navbar navbar-expand-sm bg-light">
		<!-- Links -->
			<ul class="navbar-nav">
				<li class="nav-item">
				<router-link tag="a" class="nav-link" :to="{ name: 'Read' }">Home</router-link>
				</li>
				<li class="nav-item">
				<router-link tag="a" class="nav-link" :to="{ name: 'Hello' }">Hello</router-link>
				</li>
				<li class="nav-item">
				<router-link tag="a" class="nav-link" :to="{ name: 'Create' }">Create</router-link>
				</li>
			</ul>
		</nav>
		<div class="container mt-5">
			<center><img alt="Vue logo" height="70" src="./assets/logo.png"></center>
			<router-view></router-view>
		</div>
	</div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
