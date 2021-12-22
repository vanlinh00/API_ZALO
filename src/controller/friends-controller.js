
const Error = require('../module/error');
const UserService = require('../services/user-services')
const friendService = require('../services/friends-services')
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
module.exports = {
    getUserFrineds: getUserFrineds,
}