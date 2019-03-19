<template>
	<section class="container">
		<h1 class="title is-4">Create</h1>
		<p class="subtitle is-6">Create user</p>

		<b-field label="Username">
			<b-input v-model="username" ></b-input>
		</b-field>
		<b-field label="Name">
			<b-input v-model="name" ></b-input>
		</b-field>
		<b-field label="Email">
			<b-input type="email" v-model="email" ></b-input>
		</b-field>
		<b-field label="Password">
			<b-input type="password" v-model="password" ></b-input>
		</b-field>
		<b-field>
			<button class="button is-primary" v-on:click="sendAjax">Submit</button>&nbsp;
			<button class="button is-info" v-on:click="back">Back</button>
		</b-field>
	</section>
</template>

<script>
import axios from 'axios';
import router from '../router';
import { mapState, mapActions } from 'vuex'

export default {
	name: 'Create',
	data() {
		return {
			username:null,
			name:null,
			email:null,
			password:null,
			config: {
				headers: {
					'authorization': 'Bearer '+ this.$store.getters['user/accessToken']
				}
			},
		}
	},
	props: {
		msg: String
	},
	computed: {
		...mapState('user', ['user','status'])
	},
	methods: {
		back: function() {
			router.go(-1)
			console.log(this.status)
		},
		sendAjax: function() {
			axios.post('http://localhost:3000/api/users', {
				username:this.username,
				name:this.name,
				email:this.email,
				password:this.password,
			}, this.config).then(response => {
				alert(response.data.message);
				router.push({name: 'Read'})
			})
		}
	}
}
</script>

<style scoped>
    .container {
        margin-top:50px;
    }
</style>