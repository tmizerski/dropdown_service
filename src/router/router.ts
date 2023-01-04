const Router = require('express').Router();
const {signupUser, loginUser} = require('../controllers/userController');


export const routerHandler = () => {
    Router.post('/signup', signupUser);
    Router.post('/login', loginUser)
    return Router
}