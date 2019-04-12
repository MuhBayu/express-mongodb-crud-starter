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
                                <figure v-if="imagePreview" class="image is-48x48">
                                    <img v-bind:src="imagePreview" alt="Placeholder image">
                                </figure>
                                <figure v-if="!imagePreview" class="image is-48x48">
                                    <img v-bind:src="baseUrl+profile.profile_pict" alt="Placeholder image"></figure>
                                </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">{{this.profile.name}}</p>
                                    <p class="subtitle is-6">@{{this.profile.username}} | {{this.profile.email}}</p>
                                </div>
                            </div>

                            <div class="content">
                                <time datetime="2016-1-1">Last Login: {{this.profile.last_login}}</time>
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
                                <b-field label="Picture">
                                    <input type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()"/>
                                </b-field>
                                <b-field>
                                    <button class="button" v-on:click="updateProfile()">Submit</button>
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

<script>
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    name:'Profile',
    data() {
        return {
            profile:null,
            config: {
				headers: { 
                    'Authorization': 'Bearer '+ this.$store.getters['user/accessToken'],
                    'Content-Type': 'multipart/form-data'
                }
            },
            baseUrl:null,
            file:null,
            imagePreview:'',
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
            console.log(this.config)
            axios.get('http://localhost:3000/api/users/'+this.user_id, this.config).then(response => {
                if(response.data.success) {
                    this.baseUrl = response.data.baseUrl
                    this.profile = response.data.attributes
                } else {
                    alert(response.data.message)
                }
            })
        },
        handleFileUpload(){
            const file =this.$refs.file.files[0]; 
            // const file = e.target.files[0];
            // this.file = file;
            this.file = this.$refs.file.files[0];
            let reader  = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target.result;
            }
            reader.readAsDataURL(this.file);
        },
        updateProfile: function() {
            let formData = new FormData();
            formData.set('id', this.user_id)
            formData.set('username', this.profile.username)
            formData.set('name', this.profile.name)
            formData.set('address', this.profile.address)
            formData.set('phone_number', this.profile.phone_number)
            formData.append('avatar', this.file)
            // axios.defaults.headers.common['Authorization'] = this.accessToken;
            // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
            // console.log(JSON.stringify($formData));
            // return;
            axios({
                method:'POST',
                url:'http://localhost:3000/api/users/update-profile',
                data:formData,
                headers: {
                    'Authorization': 'Bearer '+this.accessToken,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                var data = response.data
                if(data.success) {
                    alert(data.message)
                } else {
                    alert(data.message)
                }
            }).catch(err => {
                console.log(err)
            });
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
    margin-bottom: 70px;
}
</style>
