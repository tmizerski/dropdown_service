const mongo = require('mongoose');


    mongo.set("strictQuery", false);
    const connection = mongo.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    if(connection) console.log("Database connected")



