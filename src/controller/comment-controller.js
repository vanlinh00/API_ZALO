const Error = require('../module/error');
const UserService = require('../services/user-services')
const PostService = require('../services/post-services')
const CommentService = require('../services/comment-services')

let getComment = async (req, res) => {
    var token = req.body.token;
    var id_post = req.body.id;
    var index = req.body.index;
    var count = req.body.count;
    if (count <= 0 || count == "" || count == undefined || count == null || index < 0 || index == "" || index == undefined || index == null || token == "" || token == undefined || token == null || id_post == undefined || id_post == "" || id_post <= 0 || id_post == null) {
        Error.code1004(res);
    } else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostByIdofComment(id_post, userCheckToken.id_user);
            if (postCheckId !== null) {
                console.log(postCheckId)
                var listComment = [];
                var listIdComment = postCheckId.id_list_user_cm.split(",");
                console.log(listIdComment);
                for (let i = 0; i < listIdComment.length - 1; i++) {
                    var comment = await CommentService.getCommentById(listIdComment[i]);
                    listComment.push(comment)
                }
                res.send(JSON.stringify({
                    code: "1000",
                    message: 'OK',
                    data: listComment,
                    is_blocked: postCheckId.idblock
                }))
            }
            else {
                Error.code9992(res);
            }
        }
        else {
            Error.code9998(res);
        }

    }
}
let addComment= async (req, res) =>{
    var token = req.body.token;
    var id_post = req.body.id;
    var comment = req.body.comment;
    var index = req.body.index;
    var count = req.body.count;
  
    if (comment==""||comment==undefined ||count <= 0 || count == "" || count == undefined || count == null || index < 0 || index == "" || index == undefined || index == null || token == "" || token == undefined || token == null || id_post == undefined || id_post == "" || id_post <= 0 || id_post == null) {
      Error.code1004(res);
    } else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostByIdofComment(id_post, userCheckToken.id_user);
            if (postCheckId !== null) {
                // console.log(postCheckId)
                // var listComment = [];
                // var listIdComment = postCheckId.id_list_user_cm.split(",");
                // console.log(listIdComment);
                // for (let i = 0; i < listIdComment.length - 1; i++) {
                //     var comment = await CommentService.getCommentById(listIdComment[i]);
                //     listComment.push(comment)
                // }

                // res.send(JSON.stringify({
                //     code: "1000",
                //     message: 'OK',
                //     data: listComment,
                //     is_blocked: postCheckId.idblock
                // }))
                
            }
            else {
                Error.code9992(res);
            }
        }
        else {
            Error.code9998(res);
        }

    }
}
module.exports = {
    getComment: getComment,
    addComment:addComment,
}
