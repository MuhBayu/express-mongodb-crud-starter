<template>
	<section class="container">
		<div v-if="users">
		<b-table
            :data="users"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :default-sort-direction="defaultSortDirection">
			<template slot-scope="props">
				<b-table-column field="id" label="" sortable>
					<figure class="image is-32x32">
						<img class="is-rounded" v-bind:src="baseUrl+props.row.profile_pict">
					</figure>
				</b-table-column>
				<b-table-column field="name" label="Name" sortable>
                    {{ props.row.name }}
                </b-table-column>
				<b-table-column field="username" label="Username" sortable>
                    {{ props.row.username }}
                </b-table-column>
				<b-table-column field="email" label="Email" sortable>
                    {{ props.row.email }}
                </b-table-column>
				<b-table-column field="phone_number" label="Phone" sortable>
                    {{ props.row.phone_number }}
                </b-table-column>
				<!-- <b-table-column field="address" label="Address" sortable>
                    {{ props.row.address }}
                </b-table-column> -->
				<b-table-column field="createdAt" label="Created at" sortable>
                    {{ props.row.createdAt }}
                </b-table-column>
				<b-table-column field="updatedAt" label="Updated at" sortable>
                    {{ props.row.updatedAt }}
                </b-table-column>
				<b-table-column label="Action">
					<button class="button is-primary is-small" v-on:click="onEdit(props.row._id)">Edit</button>
					<button class="button is-danger is-small" v-on:click="onDelete(props.row._id)">Delete</button>
                </b-table-column>
			</template>
		</b-table>
		</div>
		<router-link to="/create" tag="a" class="button primary">Add new</router-link>
		<section v-if="detail" style="margin-bottom:120px">
			<hr/>
			<b-field label="Username">
				<b-input v-model="detail.username"></b-input>
			</b-field>
			<b-field label="Name">
				<b-input v-model="detail.name" ></b-input>
			</b-field>
			<b-field label="Email">
				<b-input v-model="detail.email" ></b-input>
			</b-field>
			<b-field>
				<p class="control">
				<button class="button is-primary" v-on:click="onUpdate(detail._id)">Save</button>
				</p>
			</b-field>
		</section>
	</section>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	name: 'Read',
	data() {
		return {
			users:null,
			detail:null,
			isPaginated: true,
			isPaginationSimple: false,
			defaultSortDirection: 'asc',
			currentPage: 1,
			perPage: 5,
			baseUrl:null,
			config: {
				headers: {
					'authorization': 'Bearer '+ this.$store.getters['user/accessToken']
				}
			},
		}
	},
	computed: {
		...mapState('user', ['user','status', 'accessToken']),
		...mapGetters({
			// map `this.doneCount` to `this.$store.getters.doneTodosCount`
			doneStatus: 'user/status'
		})
	},
	props: {
		msg: String
	},
	methods: {
		...mapActions('user', ['setStatus', 'getAll']),
		readData() {
			this.setStatus('isLogin')
			axios.get('http://localhost:3000/api/users', this.config).then(response => {
				this.baseUrl = response.data.baseUrl;
				this.users = response.data.attributes;
			}).catch(error => console.log(error))
		},
		onEdit:function(id) {
			axios.get('http://localhost:3000/api/users/'+id, this.config).then(response => {
				this.detail = response.data.attributes;
			}).catch(error => console.log(error))
		},
		onDelete:function(id) {
			if(confirm('Are u sure want to delete it?')) {
				axios.delete('http://localhost:3000/api/users/'+id, this.config).then(response => {
					alert(response.data.message);
					this.readData();
				}).catch(error => console.log(error.response.data));
			} else {
				return false;
			}
		},
		onUpdate:function(id) {
			axios.put('http://localhost:3000/api/users/'+id, this.detail, this.config).then(response => {
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

<style scoped>
    .container {
        margin-top:70px;
    }
</style>