const usermodel = require('../models/user-model')

// tuan 1 
let getalluser = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await usermodel.get_all();
            if (data != 0) {
                resolve(data);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let checkphoneuser = (phone) => {
    return new Promise((async (resolve, reject) => {
        try {
            let user = await usermodel.checkPhoneUser(phone);
            if (user != null && user != undefined) {
                if (user.length != 0) {
                    resolve(user[0]);
                }
                else {
                    resolve(null);
                }
            }
            else {
                resolve(null)
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let addUser = (newDataUser) => {
    return new Promise((async (resolve, reject) => {
        try {
            let user = await usermodel.addUser(newDataUser);
            console.log(user);
            if (user.id != 0) {
                resolve(user);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let checkPassUser = (passUser) => {
    return new Promise((async (resolve, reject) => {
        try {
            let user = await usermodel.checkPassUser(passUser);

            console.log(user);
            if (user != null && user != undefined) {
                if (user.length != 0) {
                    resolve(user[0]);
                }
                else {
                    resolve(null);
                }
            }
            else {
                resolve(null)
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let updateTokenUser = (idUser, token) => {
    return new Promise((async (resolve, reject) => {
        try {
            let user = await usermodel.updateTokenUser(idUser, token);
           // console.log(user);
            if (user.changedRows == 1) {
                resolve(true);
            }
            else {
                resolve(null)
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let checkUserByToken = (token) => {
    return new Promise((async (resolve, reject) => {
        try {
            let user = await usermodel.checkUserByToken(token);
            //  console.log(user);
            if (user != null && user != undefined) {
                if (user.length != 0) {
                    resolve(user[0]);
                }
                else {
                    resolve(null);
                }
            }
            else {
                resolve(null)
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let checkiduser = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await usermodel.checkuserbyid(id);
            if (data != 0) {
                //     console.log(data[0]);
                resolve(data[0]);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
}

let getlistuserbyid = (listid) => {
    return new Promise((async (resolve, reject) => {
        try {
            var listuser = [];
            for (let i = 0; i < listid.length; i++) {
                let data = await usermodel.checkuserbyid(listid[i]);
                if (data != 0) {
                    //     console.log(data[0]);
                    listuser.push(data[0]);

                }
                else {
                    resolve(null);
                }
            }

            resolve(listuser);


        } catch (e) {
            reject(e);
        }
    }));
}
let listfriendsbyid = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await usermodel.getlistfriendsbyid(id);
            if (data != 0) {
                //   console.log(data[0]);

                var listfriend = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id_user_a != id) {
                        listfriend.push(data[i].id_user_a);
                    } else {
                        listfriend.push(data[i].id_user_b);
                    }

                }
                console.log(listfriend)
                resolve(listfriend);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let upDateRoleUser=async(idUser,role)=>{
    return new Promise((async (resolve, reject) => {
        try {
            let user = await usermodel.upDateRoleUser(idUser, role);
            if (user != null && user != undefined) {
                if (user.length != 0) {
                    resolve(user[0]);
                }
                else {
                    resolve(null);
                }
            }
            else {
                resolve(null)
            }
        } catch (e) {
            reject(e);
        }
    }));
}
module.exports = {
    getalluser: getalluser,
    checkphoneuser: checkphoneuser,
    checkiduser: checkiduser,
    listfriendsbyid: listfriendsbyid,
    getlistuserbyid: getlistuserbyid,
    addUser: addUser,
    checkPassUser: checkPassUser,
    updateTokenUser: updateTokenUser,
    checkUserByToken: checkUserByToken,
    upDateRoleUser:upDateRoleUser,
}