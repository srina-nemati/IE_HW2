const express = require('express');
const router = require('./src/routers/router');
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
    ).then(()=> console.log("OK"))
    .catch((e)=> console.log("ERROR"))

app.use('/', router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})