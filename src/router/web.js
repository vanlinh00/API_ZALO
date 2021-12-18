const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('../config/passport-config')
const homecontroller = require('../controller/home-controller')
const admincontroller = require('../controller/admin-controller')
const chatcontroller = require('../controller/chat-controller')
initializePassport(
  passport
)
let initWebRouter = function (app) {

  var server = require("http").createServer(app);
  const { Server } = require("socket.io")
  const io = new Server(server)
  chatcontroller.initIO(io);

  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  // admin
  app.get('/admin', admincontroller.getalluser)

  //chat
  app.get('/', checkAuthenticated, chatcontroller.chatmain)
  app.get('/conversation', checkAuthenticated, chatcontroller.conversation)
  app.post('/conversation', checkAuthenticated, chatcontroller.sendconversation)

  // home login
  app.get('/login', checkNotAuthenticated, homecontroller.login)

  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/register', checkNotAuthenticated, (req, res) => {

    res.render('register.ejs')
  })

  app.post('/register', checkNotAuthenticated, async (req, res) => {

    try {

      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }

  })

  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }

    res.redirect('/login')
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


  var port = 3001;
  server.listen(port, function () {
    console.log("Listening to port " + port);
  });

}
module.exports = {
  initWebRouter: initWebRouter,
}