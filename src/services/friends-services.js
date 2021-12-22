const friendsModel = require('../models/friends-model');

let  getlistfriendsbyid=(id) => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await friendsModel.getfriendsbyid(id);
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
    getlistfriendsbyid: getlistfriendsbyid,
}