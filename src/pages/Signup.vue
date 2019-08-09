<template>
    <div style="width: 400px; margin:0 auto">
        <div><h2 style="text-align: center">Signup</h2></div>
        <div>
            <label>
                Mail
                <Input v-model="email"/>
            </label>
        </div>
        <div>
            <label>
                Password
                <Input v-model="password"/>
            </label>
        </div>
        <div style="margin-top: 5px;">
            <Button label="Sign Up" classes="info" @click="signup()"/>
        </div>
        {{email + '  ' + password}}
    </div>
</template>

<script>
import firebase from "firebase";
import Input from '../components/Input';
import Button from '../components/Button';

export default {
    name: 'Signup',
    components:{
        Input,
        Button
    },
    inject: ['authService'],
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signup(){
            console.log("SIGNUP -> mail= ", this.email, " pass= ", this.password );
            this.authService.signup(this.email, this.password);
        }
    }
}
</script>


<style scoped>

</style>
