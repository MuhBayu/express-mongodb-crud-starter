<template>
    <section class="container">
        <h3>Register Account</h3>
        <b-field label="Name">
            <b-input type="text" v-model="name"></b-input>
        </b-field>
        <b-field label="User Name">
            <b-input type="text" v-model="username"></b-input>
        </b-field>
        <b-field label="Address">
            <b-input type="text" v-model="address"></b-input>
        </b-field>
        <b-field label="Phone">
            <b-input type="tel" v-model="phone_number"></b-input>
        </b-field>
        <b-field label="Email">
            <b-input type="email" v-model="email"></b-input>
        </b-field>
        <b-field label="Password">
            <b-input type="password" v-model="password"></b-input>
        </b-field>
        <button class="button is-light" v-on:click="register">Sign-up</button>
    </section>
</template>

<script>
import axios from 'axios';
import router from '../router'
import { mapState, mapActions } from 'vuex'

export default {
    name:'Login',
    data() {
        return {
            name:null,
            username:null,
            address:null,
            phone_number:null,
            email:null,
            password:null,
        }
    },
    computed: {
        ...mapState('user', ['user','status'])
    },
    methods: {
        ...mapActions('user', ['setStatus', 'getAll', 'setUser', 'setLogin']),
        register: function() {
            axios.post('http://localhost:3000/api/register', {
				name:this.name,
				username:this.username,
				address:this.address,
				phone_number:this.phone_number,
				email:this.email,
				password:this.password,
			}).then(response => {
                var data = response.data
                if(data.success) {
                    // delete data.attributes.password
                    alert('Registrasi berhasil, silahkan login')
                    this.$router.push({name:'Login'})
                    // location.href = '/'
                } else {
                    alert(data.message)
                }
			})
        }
    },
    mounted: function() {
        console.log(this.status)
    }
}
</script>

<style scoped>
    .container {
        margin-top:70px;
        margin-bottom: 70px;
    }
</style>
