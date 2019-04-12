<template>
	<section class="hero is-primary">
		<div class="hero-body">
			<div class="container">
				<h1 class="title">Home</h1>
				<h2 class="subtitle" v-if="user !== null">Welcome, {{this.user.username}}</h2>
				<h2 class="subtitle" v-else="user === null">Welcome, {{this.status}}</h2>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	name: 'Welcome',
	props: {
		msg: String
	},
	computed: {
		...mapState('user', ['user','status'])
	},
}
</script>