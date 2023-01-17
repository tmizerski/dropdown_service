const Router = require('express').Router();
const {signupUser, loginUser, getUser, mailer} = require('../controllers/userController');


export const routerHandler = () => {
    Router.post('/signup', signupUser);
    Router.post('/login', loginUser);
    Router.get('/user/get', getUser)
    Router.post('/mailerTest', mailer)
    return Router
}
