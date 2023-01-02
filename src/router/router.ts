const Router = require('express').Router();
import {addUser} from "../services/services";

Router.route("/addUser").post(
    addUser
)