const express = require('express');
const router = require('./src/routers/router');
const app = express();
require("dotenv").config();
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

app.listen(3000, ()=> {
    console.log(`listening on port`)
}) 