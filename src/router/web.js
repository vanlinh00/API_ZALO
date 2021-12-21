const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('../config/passport-config')
const homecontroller = require('../controller/home-controller')
const admincontroller = require('../controller/admin-controller')
const chatcontroller = require('../controller/chat-controller')
const usercontroller = require('../controller/user-controller')
const postcontroller = require('../controller/post-controller')
const commentcontroller = require('../controller/comment-controller')
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
  const multer = require('multer');
  const upload = multer({
    dest: './upload/images',
  })

  // tuan 1
  app.post('/user/signup', usercontroller.sigup);
  app.post('/user/login', usercontroller.login);
  app.post('/user/logout', usercontroller.logout);
  // tuan 2
  app.post('/post/add_post', upload.single('image'), postcontroller.addPost);
  app.post('/post/get_post', postcontroller.getPost);
  app.post('/post/get_list_posts', postcontroller.getListPost);
  app.post('/post/check_new_item', postcontroller.getNewItem);
  app.post('/post/edit_post', postcontroller.edit_post);
  app.post('/post/delete_post', postcontroller.deletePost);

  // tuan 3
  app.post('/post/report_post',postcontroller.reportPost);
  app.post('/comment/get_comment', commentcontroller.getComment);


  app.get('/admin/login', checkNotAuthenticatedAdmin, admincontroller.login);
  app.post('/admin/login', checkNotAuthenticatedAdmin, passport.authenticate('local', {
    successRedirect: '/admin/home',
    failureRedirect: '/admin/login',
    failureFlash: true
  }))
  app.get('/admin/home', checkAuthenticatedAdmin, admincontroller.home);
  app.get('/admin/getalluser', checkAuthenticatedAdmin, admincontroller.getAlluser);
  app.get('/admin/use', admincontroller.userdetail);

  app.delete('/logout/admin', (req, res) => {
    req.logOut()
    res.redirect('/admin/login')
  })
  function checkAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }

    res.redirect('/admin/login')
  }

  function checkNotAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/admin/home')
    }
    next()
  }


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