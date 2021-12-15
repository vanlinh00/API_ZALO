const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('../config/passport-config')
const homecontroller = require('../controller/home-controller')

const chatservice = require('../services/chat-services');



initializePassport(
  passport
)




let initWebRouter = function (app) {

  var server = require("http").createServer(app);
  const {
    Server
  } = require("socket.io")
  const io = new Server(server)


  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))



  app.get('/', checkAuthenticated, homecontroller.chatmain)
  app.get('/conversation', checkAuthenticated, homecontroller.conversation)
  app.post('/conversation', checkAuthenticated, homecontroller.sendconversation)
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

  io.on("connection", function (socket) {
    // console.log(socket);
    //socket.join("1");

    console.log("User connected1111", socket.id);
    // users[socket.id] =socket.id
    // users.push(room:)

    socket.on('joinRoom', data => {
      console.log("User connected1111", socket.id);
      //    console.log(data.iduser+data.idfriend);
      socket.join(data.idroom);

    });


    socket.on('on-chat', async (datareq) => {


      var datachat = {
        Id_user_A: datareq.iduser,
        Id_user_B: datareq.idfriend,
        content: datareq.message,
        // create_date: create_date,
      }
      var chat = await chatservice.insertChat(datachat);
      console.log("cho nay true gi");
      console.log(chat);
      if (chat.id != 0) {
       
        var conversationrep = await chatservice.checkconversation(datareq.iduser, datareq.idfriend);

        if (conversationrep.length != 0) {
         var dataconversation = {
            id_user_A: datareq.iduser,
            Id_user_B: datareq.idfriend,
            list_id_chat: conversationrep[0].list_id_chat + chat.id+ ",",
            //  create_date	: id_user_A,
          }
          if (conversationrep[0].id == datareq.idroom) {

            var conversation = await chatservice.updataConversation(dataconversation);
          }
        }
        else {
          var dataconversation = {
            id_user_A: datareq.iduser,
            Id_user_B: datareq.idfriend,
            list_id_chat:chat.id+ ",",
            //  create_date	: id_user_A,
          }
          var conversation = await chatservice.insertnewConversation(dataconversation);
          console.log(conversation);
        }
      }
      console.log(datareq);
      io.to(datareq.idroom).emit('message', datareq);

    })
  });

  var port = 3001;
  server.listen(port, function () {
    console.log("Listening to port " + port);
  });

}
module.exports = {
  initWebRouter: initWebRouter,
}