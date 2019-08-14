<template>
    <div style="width: 400px; margin:0 auto">
        <div><h2 style="text-align: center">Login</h2></div>
        <form>
            <div>
                <label>
                    Mail
                    <Input v-model="email"/>
                </label>
            </div>
            <div>
                <label>
                    Password
                    <Input v-model="password" :iType="'password'"/>
                </label>
            </div>
            <div style="margin-top: 5px;">
                <Button label="Log In" classes="success" @click="login()"/>
            </div>
            <br/>
            <p v-if="showError" class="error-message">The email or the password is invalid.</p>
        </form>
    </div>
</template>

<script>
import {AuthService} from "../js/services/auth.service";
import Input from '../components/Input';
import Button from '../components/Button';

export default {
    name: 'Login',
    components:{
        Input,
        Button
    },
    inject: ['authService'],
    data(){
        return {
            email: 'test@test.com',
            password: '',
            showError: false
        }
    },
    methods: {
        login(){
            console.log("LOGIN -> mail= ", this.email, " pass= ", this.password );
            this.authService.login(this.email, this.password).then(
                resp => {
                    console.log(resp);
                    this.showError = false;
                    this.$router.replace('/boards');
                },
                err => {
                    console.log("err", err);
                    this.showError = true;
                }
            )
        }
    }
}
</script>


<style scoped>
.error-message{
    color: red;
}
</style>
