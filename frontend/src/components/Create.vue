<template>
	<div>
		<div class="form-group">
			<label>Username</label>
			<input class="form-control" type="text" v-model="username">
		</div>
		<div class="form-group">
			<label>Name</label>
			<input class="form-control" type="text" v-model="name">
		</div>
		<div class="form-group">
			<label>Email</label>
			<input class="form-control" type="text" v-model="email">
		</div>
		<div class="form-group">
			<button class="btn btn-info btn-sm" v-on:click="sendAjax">Submit</button>&nbsp;
			<button class="btn btn-dark btn-sm" v-on:click="back">Back</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import router from '../router';
export default {
	name: 'Create',
	data() {
		return {
			username:null,
			name:null,
			email:null,
		}
	},
	props: {
		msg: String
	},
	methods: {
		back: () => {
			router.go(-1)
		},
		sendAjax: function() {
			axios.post('http://localhost:3000/api/users', {
				username:this.username,
				name:this.name,
				email:this.email,
			}).then(response => {
				alert(response.data.message);
				router.push({name: 'Read'})
			})
		}
	}
}
</script>