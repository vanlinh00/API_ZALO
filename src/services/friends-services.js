const friendsModel = require('../models/friends-model');
const postmodel = require('../models/post-model')
let  getlistfriendsbyid=async(id) => {
    return new Promise((async (resolve, reject) => {
        try {
    let data = await friendsModel.getfriendsbyid(id);
         
            if (data != undefined) {
                //   console.log(data[0]);

                var listfriend = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id_user_a != id) {
                        listfriend.push(data[i].id_user_a);
                    } else {
                        listfriend.push(data[i].id_user_b);
                    }

                }
             //   console.log(listfriend)
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
let setRquestFriend=async (newDataRequestFriend)=>{
    return new Promise((async (resolve, reject) => {
        try {
            let  requestFriend = await friendsModel.setRquestFriend(newDataRequestFriend);
            console.log(requestFriend);
            if (requestFriend.id != 0) {
                resolve(requestFriend);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    })); 
}
let allRequestFriend= async(idUser)=>{
    return new Promise((async (resolve, reject) => {
        try {
            let  allRequestFriend = await friendsModel.allRequestFriend(idUser);
          // console.log(requestFriend);
            if (allRequestFriend !=null) {
                resolve(allRequestFriend);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    })); 
}
let checkSetQuestFriends= async (idUserA,idUserB) => {
    return new Promise((async (resolve, reject) => {
        try {
            let  allRequestFriend = await friendsModel.checkSetQuestFriends(idUserA,idUserB);

          // console.log(allRequestFriend);
            if (allRequestFriend !=null) {
                resolve(allRequestFriend[0]);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    })); 
}
let checkFriendUserAB= async (idUserA,idUserB) => {
    return new Promise((async (resolve, reject) => {
        try {
            var friedUser = await friendsModel.checkFriendUserAB(idUserA,idUserB);
         
            if (friedUser !=null) {
                if(friedUser.length!=0)
                {
                    resolve(true);
                }
              else{
                resolve(false);
              }
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    })); 
}
let deleteQuestFriends= async (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            let friendsquest = await friendsModel.deleteQuestFriends(id);
          //  console.log("vao den vervices");
          //  console.log(user);
            if (friendsquest!=null) {
                resolve(true);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let getrequestedfriendWithUserB= async (idUserB)=>{
    return new Promise((async (resolve, reject) => {
        try {
            let  allRequestFriend = await friendsModel.getrequestedfriendWithUserB(idUserB);
          // console.log(requestFriend);
            if (allRequestFriend !=null) {
                var listIdUserA = [];
                for(let i=0; i<allRequestFriend.length; i++) {
                    listIdUserA.push(allRequestFriend[i].id_user_A)
                }
                resolve(listIdUserA);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    })); 
}

let setFriend=async (newDataFriend)=>{
    return new Promise((async (resolve, reject) => {
        try {
            let  Friend = await friendsModel.setFriend(newDataFriend);
           
            if (Friend.id != 0) {
                resolve(Friend);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    })); 
}

let searchPost= async (keywords)=>{
    return new Promise((async (resolve, reject) => {
        try {
            let post = await postmodel.searchPost(keywords);
            if (post.length != undefined) {
           
           //  console.log(post);
                resolve(post);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let addSearch=async (newDataFriend)=>{
    return new Promise((async (resolve, reject) => {
        try {
            let  addSearch = await friendsModel.addSearch(newDataFriend);
           
            if (addSearch!=undefined) {
                resolve(addSearch);
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
    setRquestFriend:setRquestFriend,
    allRequestFriend:allRequestFriend,
    checkSetQuestFriends:checkSetQuestFriends,
    checkFriendUserAB:checkFriendUserAB,
    deleteQuestFriends:deleteQuestFriends,
    getrequestedfriendWithUserB:getrequestedfriendWithUserB,
    setFriend:setFriend,
    searchPost:searchPost,
    addSearch:addSearch,
}