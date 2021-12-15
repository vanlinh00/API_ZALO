if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./src/router/web')
var expressEjsExtend = require("express-ejs-extend");
app.use(express.static("./src/public"));


app.engine("ejs", expressEjsExtend);
app.set("view engine", "ejs");
app.set("views", "./src/views")

app.use(express.urlencoded({ extended: false }))

routes.initWebRouter(app);


//app.listen(3000)