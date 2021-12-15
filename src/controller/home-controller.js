
const userservice = require('../services/user-services')
const chatservice = require('../services/chat-services');
const con = require('../config/database-config');
let login = async (req, res) => {
  // var data=await userservice.getalluser()
  // console.log(data);

  res.render('login.ejs');
}
let chatmain = async (req, res) => {

  var listidfriends = await userservice.listfriendsbyid(req.user.id_user);
  var listuser;
  if(listidfriends==null) {
    listuser=[];
  }else{
    listuser= await userservice.getlistuserbyid(listidfriends);
  }
  
  //console.log(listfriends);
  res.render('mainchat.ejs', {
    name: req.user.id_user,
    listfriends: listuser
  })

}

let conversation = async (req, res) => {
  // console.log(req.user.id_user);
  //   console.log(req.query.id);
  //checkiduser
  var listidfriends = await userservice.listfriendsbyid(req.user.id_user);
  var friends=await userservice.checkiduser(req.query.id);
  var listuser = await userservice.getlistuserbyid(listidfriends);
  var conversation = await chatservice.checkconversation(req.user.id_user, req.query.id);
  var idroom;
  var allitemchat;
  if (conversation.length != 0) {

    idroom = conversation[0].id;
    console.log("list id chat muon lay");
    console.log(conversation[0].list_id_chat);
    allitemchat = await chatservice.getallchatbylistid(conversation[0].list_id_chat);
    console.log(allitemchat);
  }
  else {

    var data = await chatservice.getlastitemsql();
    console.log(data)
    allitemchat=[];
    idroom = data.id + 1;
  }
  //console.log(listfriends);
  res.render('chat2user.ejs', {
    iduser: req.user.id_user,
    idfriend: req.query.id,
    listfriends: listuser,
    idroom: idroom,
    allitemchat:allitemchat,
    friends:friends,
  })
}
let sendconversation = async (req, res) => {
  console(req.body.msg)
}
module.exports = {
  login: login,
  chatmain: chatmain,
  conversation: conversation,
  sendconversation: sendconversation,
}