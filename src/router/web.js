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
const friendscontroller = require('../controller/friends-controller')

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

  // tuan 1
  app.post('/user/signup', usercontroller.sigup);
  app.post('/user/login', usercontroller.login);
  app.post('/user/logout', usercontroller.logout);
  // tuan 2
  app.post('/post/add_post', postcontroller.addPost);
  app.post('/post/get_post', postcontroller.getPost);
  app.post('/post/get_list_posts', postcontroller.getListPost);
  app.post('/post/check_new_item', postcontroller.getNewItem);
  app.post('/post/edit_post', postcontroller.edit_post);
  app.post('/post/delete_post', postcontroller.deletePost);

  // tuan 3
  app.post('/post/report_post', postcontroller.reportPost);
  app.post('/comment/get_comment', commentcontroller.getComment);
  app.post('/comment/add_comment', commentcontroller.addComment);
  app.post('/comment/delete_comment', commentcontroller.deleteComment);
  app.post('/comment/edit_comment', commentcontroller.editComment)
  app.post('/post/like/adlike', postcontroller.addLike);

  // tuan 4 
  app.post('/chat/getlistconversation', chatcontroller.getListConversation);
  app.post('/chat/getconversation', chatcontroller.getconversation);
  app.post('/chat/deletemessage', chatcontroller.deletemessage);
  app.post('/chat/deleteconversation', chatcontroller.deleteConversation);
  app.post('/admin/setrole', admincontroller.setRole);

  // tuan 5
  app.post('/friend/search', friendscontroller.search);
  app.post('/friend/get_user_friends', friendscontroller.getUserFrineds);
  app.post('/admin/setsersate', admincontroller.setSersate);
  app.post('/admin/deleteuser', admincontroller.deleteUser);
  app.post('/admin/getbasicuserinfo', admincontroller.getBasicUserInfo);

  //tuan 6
  app.post('/friend/set_request_friend', friendscontroller.setRquestFriend);
  app.post('/friend/get_requested_friend', friendscontroller.getRquestFriend);
  app.post('/friend/set_accept_friend', friendscontroller.setAcceptFriend);
  app.post('/friend/getuserinfo', friendscontroller.getUserInfo);

  // tuan 7
  app.post('/user/setblockuser', usercontroller.setBlockUser);
  app.post('/user/setblockdiary', usercontroller.setBlockDiary);
  app.post('/user/getverifycode', usercontroller.getVerifyCode);
  app.post('/user/checkverifycode', usercontroller.checkVerifyCode);
  app.post('/user/del_saved_search',usercontroller.deleteSavedSearch);

  // tuan 8
  app.post('/user/changepassword', usercontroller.changePassword);
  app.post('/user/setuserinfo', usercontroller.setUserInfo);
  app.post('/user/get_suggested_list_friends',usercontroller.getSuggestedListFriends)
  app.post('/user/getsavedsearch', usercontroller.getSaveSearch);

  // admin
  app.get('/admin/home', checkAuthenticated, admincontroller.home);
  app.get('/admin/getalluser', checkAuthenticated, admincontroller.getAlluser);
  app.get('/admin/edituser', admincontroller.editUser);
  app.post('/admin/edituser', admincontroller.postEditUser);
  app.post('/admin/deleteUserUI', admincontroller.deleteUserUI);
  app.post('/admin/addUser', admincontroller.addUser);


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