const Router = require('express').Router();
import {signUp} from "../services/services";


export const routerHandler = () => {
    Router.post('/signup', signUp);

    return Router
}