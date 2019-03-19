<template>
    <section class="container">
        <b-field label="Email">
            <b-input type="email" v-model="email"></b-input>
        </b-field>
        <b-field label="Password">
            <b-input type="password" v-model="password"></b-input>
        </b-field>
        <button class="button is-light" v-on:click="login">Log-in</button>
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
            email:null,
            password:null,
        }
    },
    computed: {
        ...mapState('user', ['user','status'])
    },
    methods: {
        ...mapActions('user', ['setStatus', 'getAll', 'setUser', 'setLogin']),
        login: function() {
            axios.post('http://localhost:3000/api/auth', {
				email:this.email,
				password:this.password,
			}).then(response => {
                var data = response.data
                if(data.success) {
                    delete data.attributes.password
                    this.setLogin(data.attributes)
                    // this.$router.push({name:'Home'})
                    location.href = '/'
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
    }
</style>
