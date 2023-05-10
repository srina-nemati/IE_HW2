const express = require('express');
const app = express();
require("dotenv").config();
app.listen(3000, ()=> console.log("server is running"));

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlparser: true,
        useUnifiedTopology: true
    }
    ).then(()=> console.log("hii"))
    .catch((e)=> console.log("fuck"))