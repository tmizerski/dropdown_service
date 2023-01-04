const Router = require('express').Router();
const {signupUser} = require('../controllers/userController');


export const routerHandler = () => {
    Router.post('/signup', signupUser);

    return Router
}