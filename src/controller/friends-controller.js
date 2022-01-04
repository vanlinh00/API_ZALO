
const Error = require('../module/error');
const UserService = require('../services/user-services')
const friendService = require('../services/friends-services')
const PostService = require('../services/post-services')

let getUserFrineds = async (req, res) => {
    token = req.body.token;
    userId = req.body.userId;
    index = req.body.index;
    count = req.body.count;
    if (count == null | count == undefined || userId == "" || userId == undefined || userId <= 0 || index == undefined || index == null || token == "" || token == undefined || token == null) {
        Error.code1004(res);
    } else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {

            var listIdFriends = await friendService.getlistfriendsbyid(userCheckToken.id_user);
            var newListIdFriends = [];
            var totalIdFriends = (count < listIdFriends.length) ? count : listIdFriends.length
            for (let i = index - 1; i < totalIdFriends; i++) {
                newListIdFriends.push(listIdFriends[i]);
            }
            // console.log(newListIdFriends);
            var inforFrineds = await UserService.getlistuserbyid(newListIdFriends);
            var friendlist = []
            for (let i = 0; i < inforFrineds.length; i++) {

                var friend = {
                    "user_id": inforFrineds[i].id_user + "",
                    "user_name": inforFrineds[i].name_user,
                    "avatar": inforFrineds[i].linkavatar_user,
                    "status": inforFrineds[i].isactive,
                }
                friendlist.push(friend);
            }
            res.send(JSON.stringify({
                code: "1000",
                message: 'OK',
                data: friendlist,
                total: listIdFriends.length + ""
            }))

        }
        else {
            Error.code9998(res);
        }

    }
}
let setRquestFriend = async (req, res) => {
    token = req.body.token;
    userId = req.body.userId;
    if (userId == "" || userId == undefined || userId <= 0 || token == "" || token == undefined || token == null) {
        Error.code1004(res);
    } else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var user = await UserService.checkiduser(userId);
            // console.log(user)
            if (user !== null && userCheckToken.id_user != userId) {
                //var checkFriends = await friendService.checkFriendUserAB(userCheckToken.id_user, userId);
                // if (checkFriends == undefined) {
                var checkSetQuestFriends = await friendService.checkSetQuestFriends(userId, userCheckToken.id_user);

                if (checkSetQuestFriends != undefined) {
                    var deleteQuestFriends = await friendService.deleteQuestFriends(checkSetQuestFriends.id);
                }
                else {
                    var dataSetQuestFriends = {
                        "id_user_A": userCheckToken.id_user,
                        "id_user_B": userId,
                    }
                    var newSetQuestFriend = await friendService.setRquestFriend(dataSetQuestFriends);
                }

                var allDataQuestFriends = await friendService.allRequestFriend(userCheckToken.id_user);
                if (allDataQuestFriends !== null) {
                    res.send(JSON.stringify({
                        code: "1000",
                        message: 'OK',
                        data: { "requested_friends": allDataQuestFriends.length + "" },
                    }))
                }
                // } else {
                //     Error.code9997(res);
                // }

            } else {
                Error.code9995(res);
            }

        }
        else {
            Error.code9998(res);
        }

    }
}
let getRquestFriend = async (req, res) => {
    token = req.body.token;
    userId = req.body.userId;
    index = req.body.index;
    count = req.body.count;
    if (index<1 ||count == null | count == undefined || index == undefined || index == null || token == "" || token == undefined || token == null) {
        Error.code1004(res);
    } else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            //  console.log(userCheckToken.id_user);
            var listIdFriends = await friendService.getrequestedfriendWithUserB((userId == undefined) ? userCheckToken.id_user : userId);
            //   console.log(listIdFriends);
            var newListIdFriends = [];
            var totalIdFriends = (count < listIdFriends.length) ? count : listIdFriends.length
            for (let i = index - 1; i < totalIdFriends; i++) {
                newListIdFriends.push(listIdFriends[i]);
            }
            // // console.log(newListIdFriends);
            var inforFrineds = await UserService.getlistuserbyid(newListIdFriends);
            var friendlist = []
            for (let i = 0; i < inforFrineds.length; i++) {

                var friend = {
                    "user_id": inforFrineds[i].id_user + "",
                    "user_name": inforFrineds[i].name_user,
                    "avatar": inforFrineds[i].linkavatar_user,
                    "status": inforFrineds[i].isactive,
                }
                friendlist.push(friend);
            }
            res.send(JSON.stringify({
                code: "1000",
                message: 'OK',
                data: friendlist,
                total: listIdFriends.length + ""
            }))

        }
        else {
            Error.code9998(res);
        }

    }
}
let setAcceptFriend = async (req, res) => {
    token = req.body.token;
    userId = req.body.userId;
    isAccept = req.body.isAccept;
    if (userId == undefined || userId == "" || userId == null || userId <= 0 || isAccept < 0 || isAccept > 1 || isAccept == undefined || token == "" || token == undefined || token == null) {
        Error.code1004(res);
    } else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {

            var checkSetQuestFriends = await friendService.checkSetQuestFriends(userId, userCheckToken.id_user);

            if (checkSetQuestFriends != undefined) {

                var deleteQuestFriends = await friendService.deleteQuestFriends(checkSetQuestFriends.id);
                if (isAccept == 1) {
                    var dataFriend = {
                        "id_user_a": userCheckToken.id_user,
                        "id_user_b": userId,
                    }
                    var setAcceptFriend = await friendService.setFriend(dataFriend);
                }
                res.send(JSON.stringify({
                    code: "1000",
                    message: 'OK',
                }))
            }
            else {
                Error.code9997(res);

            }

        }
        else {
            Error.code9998(res);
        }

    }
}
let search = async (req, res) => {
    token = req.body.token;
    userId = req.body.user_id;
    keyword = req.body.keyword;
    index = req.body.index;
    count = req.body.count;
    if (keyword == undefined || keyword == "" || count == null | count == undefined || index == undefined || index == null || token == "" || token == undefined || token == null) {
        Error.code1004(res);
    } else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            if (userCheckToken.id_user == userId) {
                let date_ob = new Date();
                let seconds = date_ob.getTime();
                var listPost = [];
                var dataSearch = {
                    "id_user": userCheckToken.id_user,
                    "keword": keyword,
                    "create_date": seconds,
                }
                var addSearch = await friendService.addSearch(dataSearch);
                var allListPost = await friendService.searchPost(keyword);
                for (let i = 0; i < allListPost.length; i++) {
                    var postCheckId = await PostService.checkPostById(allListPost[i].id, userCheckToken.id_user);
                    listPost.push(postCheckId);

                }
                res.send(JSON.stringify({
                    code: "1000",
                    message: 'OK',
                    data: listPost,
                }))

            } else {
                Error.code1005(res);
            }

        }
        else {
            Error.code9998(res);
        }

    }
}
let getUserInfo = async (req, res) => {
    token = req.body.token;
    userId = req.body.userId;

    if (userId == undefined || userId == "" || userId == null || userId <= 0 || token == "" || token == undefined || token == null) {
        Error.code1004(res);
    } else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {

            let data = await UserService.checkiduser(userId);
            // console.log(data)
            if (data != undefined) {
                var friendOfUser = await friendService.getlistfriendsbyid(userId);
                // console.log(friendOfUser)
                var isFriend = "0"
                if (friendOfUser != null) {
                    for (let i = 0; i < friendOfUser.length; i++) {
                        if (friendOfUser[i] == userCheckToken.id_user) {
                            isFriend = "1";
                        }
                    }
                }

                var getUser = {
                    "id": data.id_user + "",
                    "username": data.name_user,
                    "description": data.described,
                    "avatar": data.linkavatar_user,
                    "link": data.linkuser,
                    "address": data.address,
                    "listing": (friendOfUser != null) ? friendOfUser.length + "" : 0 + "",
                    "is_friend": isFriend,
                    "online": 1 + "",
                }
                res.send(JSON.stringify({
                    code: "1000",
                    message: 'OK',
                    data: getUser
                }))
            } else {
                Error.code9995(res);
            }
        }
        else {
            Error.code9998(res);
        }

    }
}
module.exports = {
    getUserFrineds: getUserFrineds,
    setRquestFriend: setRquestFriend,
    getRquestFriend: getRquestFriend,
    setAcceptFriend: setAcceptFriend,
    search: search,
    getUserInfo: getUserInfo,
}