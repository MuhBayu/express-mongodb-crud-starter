<template>
<div>
<div class="container">
    <div>
    <div class="columns">
        <div class="column is-three-fifths is-offset-one-fifth">
            <div class="card">
                <div class="card-image">
                    <div class="card-content" v-if="profile != null">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img v-bind:src="baseUrl+profile.profile_pict" alt="Placeholder image"></figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">{{this.profile.name}}</p>
                                    <p class="subtitle is-6">@{{this.profile.username}} | {{this.profile.email}}</p>
                                </div>
                            </div>

                            <div class="content">
                                <time datetime="2016-1-1">Last Login: {{this.profile.last_login}}</time>
                                </div>
                                <b-field label="Username">
                                    <b-input placeholder="Username" v-model="profile.username" ></b-input>
                                </b-field>
                                <b-field label="Name">
                                    <b-input placeholder="Name" v-model="profile.name" ></b-input>
                                </b-field>
                                <b-field label="Address">
                                    <b-input placeholder="Address" v-model="profile.address" ></b-input>
                                </b-field>
                                <b-field label="Phone">
                                    <b-input placeholder="Phone" v-model="profile.phone_number" ></b-input>
                                </b-field>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    name:'Profile',
    data() {
        return {
            profile:null,
            config: {
				headers: { 'authorization': 'Bearer '+ this.$store.getters['user/accessToken'] }
            },
            baseUrl:null,
        }
    },
    computed: {
        ...mapGetters({
            // map `this.doneCount` to `this.$store.getters.doneTodosCount`
            user_id: 'user/userID',
            accessToken: 'user/accessToken'
		})
    },
    methods: {
        readDetail() {
            axios.get('http://localhost:3000/api/users/'+this.user_id, this.config).then(response => {
                if(response.data.success) {
                    this.baseUrl = response.data.baseUrl
                    this.profile = response.data.attributes
                } else {
                    alert(response.data.message)
                }
            })
        }
    },
    mounted:function() {
        this.readDetail()
    }
}
</script>

<style scoped>
.container {
    margin-top: 50px;
}
</style>
