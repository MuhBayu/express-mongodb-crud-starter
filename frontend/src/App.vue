<template>
	<div id="app">
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<router-link tag="a" class="navbar-item" :to="{ name: 'Home' }"><img src="./assets/logo.png" height="48"></router-link>

				<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" class="navbar-menu">
				<div class="navbar-start">
					<router-link tag="a" class="navbar-item" :to="{ name: 'Home' }">Home</router-link>
					<template v-if="this.status == 'isLogin'">
						<router-link tag="a" class="navbar-item" :to="{ name: 'Read' }">Read</router-link>
						<router-link tag="a" class="navbar-item" :to="{ name: 'Create' }">Create</router-link>
					</template>
				</div>

				<div class="navbar-end">
					<div class="navbar-item has-dropdown is-hoverable" v-if="this.status == 'isLogin'">
						<a class="navbar-link" v-if="user" v-text="user.username"></a>
						<div class="navbar-dropdown">
							<router-link tag="a" class="navbar-item" :to="{ name: 'Profile' }">Profile</router-link>
							<hr class="navbar-divider">
							<a class="navbar-item" @click="logout">Log-out</a>
						</div>
					</div>
					<div class="navbar-item">
						<div class="buttons">
							<router-link tag="button" class="button is-light" v-if="this.status != 'isLogin'" :to="{ name: 'Login' }">Login</router-link>
							<router-link tag="button" class="button dark" v-if="this.status != 'isLogin'" :to="{ name: 'Register' }">Register</router-link>
						</div>
					</div>
				</div>
			</div>
		</nav>
		
		<router-view></router-view>
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
<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
			config: {
				headers: {
					'authorization': 'Bearer '+ this.$store.getters['user/accessToken']
				}
			},	
		}
	},
	computed: {
        ...mapState('user', ['user','status', 'userID'])
	},
	methods: {
		logout: function() {
			this.$store.dispatch('user/logout')
			this.$router.push({name:'Login'})
		}
	},
	mounted: function() {
		// this.userLogin = this.$store.getters['user/user'];
		// if(this.$store.getters['user/accessToken'] === null) return 
		
	},
}
</script>
