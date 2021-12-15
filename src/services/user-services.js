const usermodel = require('../models/user-model')
let getalluser = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await usermodel.get_all();
            if (data != 0) {
                resolve(data);
            }
            else {

            }
        } catch (e) {
            reject(e);
        }
    }));
}
let checkphoneuser = (phone) => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await usermodel.checkPhoneUser(phone);
            if (data != 0) {
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
           var listuser=[];
           for(let i = 0; i < listid.length; i++) {
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
module.exports = {
    getalluser: getalluser,
    checkphoneuser: checkphoneuser,
    checkiduser: checkiduser,
    listfriendsbyid: listfriendsbyid,
    getlistuserbyid:getlistuserbyid,

}