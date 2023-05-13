const express = require('express');
const router = require('./src/routers/router');
const app = express();
require("dotenv").config();
// app.listen(4000, ()=> console.log("server is running"));
app.use(express.json());

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlparser: true,
        useUnifiedTopology: true
    }
    ).then(()=> console.log("Connect to MongoDB: OK"))
    .catch((e)=> console.log("Connect to MongoDB: ERROR"))

app.use('/', router);

// const bodyParser = require('body-Parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 4000;
app.listen(3000, ()=> {
    console.log(`listening on port`)
}) 