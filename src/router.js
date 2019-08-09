import Vue from "vue";
import Router from "vue-router";
import Board from "./pages/Board";
import Boards from "./pages/Boards";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthService } from "./js/services/auth.service";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta :{
                require_auth: false,
            }
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
            meta: {
                require_auth: false,
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                require_auth: false,
            }
        },
        {
            path: '/boards',
            name: 'Boards',
            component: Boards,
            meta: {
                require_auth: true,
            }
        },
        {
            path: '/board/:id',
            name: 'Board',
            component: Board,
            meta: {
                require_auth: true,
            }
        }
    ]
});
/**
 * path: * matcha tutte
 * path: 'user-*' matcha quelle che iniziano per user-
 */

router.beforeEach((to, from, next) => {
    console.log(JSON.stringify(router.app.data), router.app.authService )
    console.log("TO ", to, " FROM ", from, " NEXT");
    if (!to.meta.require_auth) {
        next();
    } else {
        if (router.app.authService){
            if (router.app.authService.user){
                next();
            } else {
                next('/login');
            }
        } else {
            router.app.authService = new AuthService();
            next('/login');
        }
    }

    

});


export default router;