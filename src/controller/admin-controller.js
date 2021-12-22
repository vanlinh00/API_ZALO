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
  var listuser = await userservice.getalluser();
  res.render('admin/getalluser.ejs', {
    userData: listuser,
  })
}
let userdetail = async (req, res) => {
  res.render('admin/detail.ejs')
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
module.exports = {
  home: home,
  login: login,
  getAlluser: getAlluser,
  userdetail: userdetail,
  setRole: setRole,
}