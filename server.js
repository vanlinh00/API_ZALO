if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./src/router/web')
var expressEjsExtend = require("express-ejs-extend");
var bodyParser = require('body-parser');
const multer = require('multer');
// var upload = multer();

 app.use(express.static("./src/public"));
// app.use(bodyParser.urlencoded({ extended:false}));
// app.use(bodyParser.json());
// app.use(express.json());



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/file/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })
app.use(upload.any()); 



app.engine("ejs", expressEjsExtend);
app.set("view engine", "ejs");
app.set("views", "./src/views")


app.use(express.urlencoded({ extended: false }))

routes.initWebRouter(app);


//app.listen(3000)