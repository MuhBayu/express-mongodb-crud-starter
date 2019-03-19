<template>
	<section class="hero is-primary">
		<div class="hero-body">
			<div class="container" v-if="this.status != 'isLogin'">
				<h1 class="title">Home</h1>
				<h2 class="subtitle">Welcome, {{this.status}}</h2>
			</div>
			<div class="container" v-if="this.status == 'isLogin'">
				<h1 class="title">Home</h1>
				<h2 class="subtitle">Welcome, {{this.user.username}}</h2>
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