const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors")
// import {run} from "./db/db";

const app = express();
app.use(cors())
const port = process.env.PORT;


app.listen(port,  ()=> {
    console.log("Server is listening on port: "+ port)
})