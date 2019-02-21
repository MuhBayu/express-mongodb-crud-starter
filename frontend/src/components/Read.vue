<template>
	<div>
		<table class="table table-bordered">
			<thead>
				<th>Username</th>
				<th>Name</th>
				<th>Email</th>
				<th>Created at</th>
				<th>Updated at</th>
				<th>Action</th>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.id">
					<td>{{user.username}}</td>
					<td>{{user.name}}</td>
					<td>{{user.email}}</td>
					<td>{{user.createdAt}}</td>
					<td>{{user.updatedAt}}</td>
					<td>
						<div class="btn-group">
							<button class="btn btn-secondary btn-sm" v-on:click="onEdit(user._id)">Edit</button>
							<button class="btn btn-danger btn-sm" v-on:click="onDelete(user._id)">Delete</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<router-link to="/create" tag="a" class="btn btn-primary btn-sm">Add new</router-link>
		<template v-if="detail">
			<hr/>
			<div class="form-group">
				<label for="">Username</label>
				<input type="text" class="form-control" v-model="detail.username" />
			</div>
			<div class="form-group">
				<label for="">Name</label>
				<input type="text" class="form-control" v-model="detail.name" />
			</div>
			<div class="form-group">
				<label for="">Email</label>
				<input type="text" class="form-control" v-model="detail.email" />
			</div>
			<div class="form-group">
				<button class="btn btn-dark btn-sm" v-on:click="onUpdate(detail._id)">Save</button>
			</div>
		</template>
	</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
	name: 'Read',
	data() {
		return {
			users:{},
			detail:null,
		}
	},
	props: {
		msg: String
	},
	methods: {
		readData() {
			axios.get('http://localhost:3000/api/users').then(response => {
				this.users = response.data.attributes;
			}).catch(error => console.log(error))
		},
		onEdit:function(id) {
			axios.get('http://localhost:3000/api/user/'+id).then(response => {
				this.detail = response.data.attributes;
			}).catch(error => console.log(error))
		},
		onDelete:function(id) {
			if(confirm('Are u sure want to delete it?')) {
				axios.delete('http://localhost:3000/api/user/'+id).then(response => {
					alert("Deleted!" + response.data.message);
					this.readData();
				}).catch(error => console.log(error.response.data));
			} else {
				return false;
			}
		},
		onUpdate:function(id) {
			axios.put('http://localhost:3000/api/user/'+id, this.detail).then(response => {
				var data = response.data
				console.log(response.data)
				if (data.success) {
					alert(data.message)
					this.readData();
				}
			});
		}
	},
	mounted: function() {
		this.readData();
	}
}
/* eslint-disable */
</script>