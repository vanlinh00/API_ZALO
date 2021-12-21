const commentMode = require('../models/comment-model');
const UserService = require('../services/user-services')
let getCommentById = async (idComment) => {
    return new Promise((async (resolve, reject) => {
        try {

            let comment = await commentMode.getCommentById(idComment);
           // console.log(comment);

            if (comment.length != 0) {
                if (comment[0].id != 0) {
                    // resolve(comment[0]);
                    var user = await UserService.checkiduser(comment[0].id_user);
                    var poster = {
                        "id": user.id_user + "",
                        "name": user.name_user + "",
                        "avatar": user.linkavatar_user + ""
                    }
                
                var datacomment = {
                        "id": comment[0].id,
                        "comment": comment[0].content_post,
                        "crated": seconds,
                        "poster": poster,
                    }
                    resolve(datacomment);
                }
                else {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));

}
module.exports = {
    getCommentById: getCommentById,

}