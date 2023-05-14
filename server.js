const express = require('express');
const router = require('./src/routers/router');
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
app.use(express.json());

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "HW2 - University Courses",
        version: "2.0.0",
        description:
          "Something...",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Sarina Nemati",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
    apis: ["./src/routers/router.js",
           "./src/routers/admin/admin.router.js",
           "./src/routers/auth/auth.router.js",
           "./src/routers/student/student.router.js",
           "./src/routers/educational manager/educationalManager.router.js",
           "./src/routers/professor/professor.router.js"]
  }
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  )

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