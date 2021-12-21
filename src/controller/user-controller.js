
const Error = require('../module/error')
const UserService = require('../services/user-services')
var jwt = require('jsonwebtoken');

let sigup = async (rep, res) => {
    console.log(rep.body);
  
    var phoneNumber = rep.body.sdt_user;
    var passWord = rep.body.pass_user;

    if (phoneNumber === null || passWord === null || phoneNumber === '' || passWord === '' || phoneNumber === undefined || passWord === undefined) {
        Error.code1002(res);
    }
    else if (phoneNumber.length !== 10 || phoneNumber[0] !== '0' || phoneNumber === passWord || passWord.length > 10 || passWord.length < 6) {
        Error.code1004(res);
    } else {
        var user = await UserService.checkphoneuser(phoneNumber);
        if (user == null) {
            var newDataUser = rep.body;
            var newUser = await UserService.addUser(newDataUser);
           // console.log("loi la");
           // console.log(newUser);
            if (newUser.sdt_user != null) {
                res.send(JSON.stringify({
                    Code: "1000",
                    Message: 'OK',
                    Data: newUser
                }))
            }
        }
        else {
            if (user.sdt_user == phoneNumber) {
                Error.code9996(res);
            }
        }

    }
}
let login = async (rep, res) => {
    var phoneNumber = rep.body.sdt_user;
    var passWord = rep.body.pass_user;
    if (phoneNumber === null || passWord === null || phoneNumber === '' || passWord === '') {
        Error.code1002(res);
    }
    else if (phoneNumber.length !== 10 || phoneNumber[0] !== '0' || phoneNumber === passWord || passWord.length > 10 || passWord.length < 6) {
        console.log(phoneNumber.length);
        Error.code1004(res);
    }
    else {
        var user = await UserService.checkphoneuser(phoneNumber);
        if (user !== null) {
            if (user.sdt_user == phoneNumber) {
                var userCheckPass = await UserService.checkPassUser(passWord);
                if (userCheckPass !== null) {
                    //if dung tao token va hien dang nhap thanh con
                    const accessToken = jwt.sign({
                        iss: user.pass_user,
                        sub: user.sdt_user,
                        iat: new Date().getTime(),
                        exp: new Date().setDate(new Date().getTime() + 1)
                    }, 'NodejsApiAuthentication')

                    var userUpdateToken = await UserService.updateTokenUser(userCheckPass.id_user, accessToken);
                    if (userUpdateToken != null) {
                        var userUpdate = await UserService.checkphoneuser(phoneNumber);
                        res.send(JSON.stringify({
                            code: "1000",
                            Message: 'ok',
                            Data: userUpdate,
                        }));
                    }
                    //console.log(accessToken);

                } else {
                    Error.code9995(res);
                }

            }
        }
        else {
            Error.code9995(res);
        }
    }
}
let logout = async (rep, res) => {
    var token = rep.body.token;
    var userCheckToken = await UserService.checkUserByToken(token);
    if (userCheckToken != null) {
        var userUpdateToken = await UserService.updateTokenUser(userCheckToken.id_user, "");
        if (userUpdateToken != null) {
            //  var userUpdate = await UserService.checkphoneuser(userCheckToken.sdt_user);
            //   console.log("update token ok");
            //   console.log(userUpdate);
            res.send(JSON.stringify({
                code: "1000",
                Message: 'ok',
                // Data: userUpdate,
            }));
        }
    }
    else {
        Error.code9998(res);
    }
}

module.exports = {
    sigup: sigup,
    login: login,
    logout: logout,
}