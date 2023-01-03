const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors")
import {routerHandler}  from "./router/router"
// import {run} from "./db/db";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routerHandler());
const port = process.env.PORT;


app.listen(port,  ()=> {
    console.log("Server is listening on port: "+ port)
})