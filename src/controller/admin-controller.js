const userservice = require('../services/user-services')
const Error = require('../module/error');

let home = async (req, res) => {
  if (req.user.role == "1") {
    res.render('admin/trangchu.ejs');
  }
  else {
    res.redirect('/')
  }

}
let login = async (req, res) => {
  res.render('admin/login.ejs');
}
let getAlluser = async (req, res) => {
  const mess = req.flash('messages');
  var listuser = await userservice.getalluser();
  res.render('admin/getalluser.ejs', {
    userData: listuser,
    mess: mess

  })
}
let userdetail = async (req, res) => {
  res.render('admin/detail.ejs')
}
let editUser = async (req, res) => {
  var idUser = req.query.id;
  var getUser = await userservice.checkiduser(idUser);
  res.render('admin/editUser.ejs', { getUser })

}
let postEditUser = async (req, res) => {
  var user = {
    "id_user": req.query.id,
    "name_user": req.body.name_user,
    //    "sdt_user":req.body.sdt_user,
    "pass_user": req.body.pass_user,
    "linkuser": req.body.linkuser,
    "role": (req.body.role == "Admin") ? 1 : 0,
  }
  if (req.body.name_user == "" || req.body.sdt_user == "" || req.body.pass_user == "") {
    req.flash('messages', "Parameter value is invalid");
  }
  else {
    req.flash('messages', "OK");
    var updateUser = await userservice.adminUpDateUserInfor(user);
  }
  res.redirect('/admin/getalluser');

}

let deleteUserUI = async (req, res) => {
  try {
    let user = await userservice.deleteUser(req.body.id);
    return res.status(200).json({
      'message': 'success'
    })

  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}
let addUser = async (rep, res) => {
  var phoneNumber = rep.body.sdt_user;
  var passWord = rep.body.pass_user;
  if (phoneNumber === null || passWord === null || phoneNumber === '' || passWord === '' || phoneNumber === undefined || passWord === undefined) {
    rep.flash('messages', "Parameter value is invalid");
  }
  else if (phoneNumber.length !== 10 || phoneNumber[0] !== '0' || phoneNumber === passWord || passWord.length > 10 || passWord.length < 6) {
    rep.flash('messages', "Parameter is not enough");
  } else {
    var user = await userservice.checkphoneuser(phoneNumber);
    if (user == null) {
      var newDataUser = {
        "name_user": "User",
        "sdt_user": rep.body.sdt_user,
        "pass_user": rep.body.pass_user,
        "linkuser": rep.body.sdt_user + "/url",
        "role": (rep.body.role == "Admin") ? 1 : 0,
      }
      var newUser = await userservice.addUser(newDataUser);
      if (newUser.sdt_user != null) {
        rep.flash('messages', "OK");
      }
    }
    else {
      if (user.sdt_user == phoneNumber) {
        rep.flash('messages', "User existed");
      }
    }

  }
  res.redirect('/admin/getalluser');

}
// api
let setRole = async (req, res) => {

  token = req.body.token;
  role = req.body.role;
  userId = req.body.userId;
  //console.log(req.body);
  if (token == null || token == undefined || token == "" || role == null || role == undefined || role == "" || userId == null || userId == undefined || userId <= 0) {
    Error.code1004(res);
  }
  else {
    var userCheckToken = await userservice.checkUserByToken(token);
    if (userCheckToken !== null) {
      if (userCheckToken.role == '2') {
        var userRole = await userservice.checkiduser(userId);
        if (userRole !== null) {
          if (userRole.role == 0) {
            if (role == "admin") {
              role = 1;
            }
            var updateUser = await userservice.upDateRoleUser(userId, role);
            if (updateUser !== null) {
              res.send(JSON.stringify({
                code: "1000",
                message: 'OK',
              }))

            }
            else {
              Error.code9995(res);
            }

          }
          else {
            Error.code1010(res);
          }
        }
        else {
          Error.code9995(res);
        }
      } else {
        Error.code9997(res);
      }

    }
    else {
      Error.code9998(res);
    }

  }
}
let setSersate = async (req, res) => {

  token = req.body.token;
  role = req.body.role;
  userId = req.body.userId;
  state = req.body.state;
  //console.log(req.body);
  if (state == undefined || state == "" || token == null || token == undefined || token == "" || role == null || role == undefined || role == "" || userId == null || userId == undefined || userId <= 0) {
    Error.code1004(res);
  }
  else {
    var userCheckToken = await userservice.checkUserByToken(token);
    if (userCheckToken !== null) {
      if (userCheckToken.role == '2') {
        var userActive = await userservice.checkiduser(userId);
        if (userActive !== null) {
          if (userActive.role != 2) {
            //  console.log(state);
            var updatActiveUser = await userservice.upDateActiveUser(userId, state);
            console.log(updatActiveUser);
            if (updatActiveUser !== null && updatActiveUser != undefined) {
              res.send(JSON.stringify({
                code: "1000",
                message: 'OK',
              }))
            } else {
              Error.code9995(res);
            }

          }
          else {
            Error.code1010(res);
          }
        }
        else {
          Error.code9995(res);
        }
      } else {
        Error.code9997(res);
      }

    }
    else {
      Error.code9998(res);
    }

  }
}
let deleteUser = async (req, res) => {

  token = req.body.token;
  //role = req.body.role;
  userId = req.body.userId;

  //console.log(req.body);
  if (token == null || token == undefined || token == "" || userId == null || userId == undefined || userId <= 0) {
    Error.code1004(res);
  }
  else {
    var userCheckToken = await userservice.checkUserByToken(token);
    if (userCheckToken !== null) {
      if (userCheckToken.role == '2') {
        var userActive = await userservice.checkiduser(userId);
        console.log(userActive);
        if (userActive !== null) {
          if (userActive.role != "2" && userActive.role != "1") {
            console.log("vao den day chua" + userId);

            // var deleteUser = await userservice.deleteUser(userId);
            // xoa bai viet 
            // xoa comment 
            // xoa chat
            // xoa conversation
            // xoa all


            res.send(JSON.stringify({
              code: "1000",
              message: 'OK'
            }))

          }
          else {
            Error.code1009(res);
          }
        }
        else {
          Error.code9995(res);
        }
      } else {
        Error.code9997(res);
      }

    }
    else {
      Error.code9998(res);
    }

  }
}
let getBasicUserInfo = async (req, res) => {
  token = req.body.token;
  role = req.body.role;
  userId = req.body.userId;
  if (token==undefined||role == undefined||userId==undefined) {
    Error.code1002(res);
  }
  else if(token == ""||role==""||role<0||role>2||userId==""||userId<=0)
  {
    Error.code1004(res);
  }
  else {
    var userCheckToken = await userservice.checkUserByToken(token);
    if (userCheckToken !== null) {
      if (userCheckToken.role == role || userCheckToken.role == "2") {
        var userActive = await userservice.adminCheckUser(userId);
        console.log(userActive);
        if (userActive !== null) {
          if (userActive.role != 2) {
            res.send(JSON.stringify({
              code: "1000",
              message: 'OK',
              data: userActive
            }))
          }
          else {
            Error.code9997(res);
          }
        }
        else {
          Error.code9995(res);
        }
      } else {
        Error.code9997(res);
      }

    }
    else {
      Error.code9998(res);
    }

  }
}
module.exports = {
  home: home,
  login: login,
  getAlluser: getAlluser,
  userdetail: userdetail,
  setRole: setRole,
  setSersate: setSersate,
  deleteUser: deleteUser,
  getBasicUserInfo: getBasicUserInfo,
  editUser: editUser,
  postEditUser: postEditUser,
  deleteUserUI: deleteUserUI,
  addUser: addUser,
}