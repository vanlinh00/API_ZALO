const Error = require('../module/error');
const UserService = require('../services/user-services')
const PostService = require('../services/post-services')
const CommentService = require('../services/comment-services')

let getComment = async (req, res) => {
    var token = req.body.token;
    var id_post = req.body.id;
    var index = req.body.index;
    var count = req.body.count;
    if (token==undefined||id_post==undefined||index==undefined||count==undefined) {
        Error.code1002(res);
    } 
    else if(token == ""||id_post == ""||id_post <= 0 ||index == ""||index<0||count == ""||count <=0){
        Error.code1004(res);
    }
    else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostByIdBase(id_post, userCheckToken.id_user);
            if (postCheckId !== null) {
                console.log(postCheckId)
                var listComment = [];
                var listIdComment = postCheckId.id_list_user_cm.split(",");
               // console.log(listIdComment);
                var variableGetCountComment = listIdComment.length - 1;
                if (count < listIdComment.length - 1) {
                    variableGetCountComment = count;
                }
                for (let i = index; i < variableGetCountComment; i++) {
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
let addComment = async (req, res) => {
    var token = req.body.token;
    var id_post = req.body.id;
    var comment = req.body.comment;
    var index = req.body.index;
    var count = req.body.count;

    if (token ==undefined || id_post == undefined||comment == undefined||index == undefined||count == undefined) {
        Error.code1002(res);
    }
    else if(token==""||id_post==""||id_post <= 0 || comment == ""||index==""||index<=0||count==""||count <=0){
        Error.code1004(res);
    }
     else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostByIdBase(id_post, userCheckToken.id_user);
            if (postCheckId !== null && postCheckId.idblock == "0") {
                let date_ob = new Date();
                let seconds = date_ob.getTime();

                var newComment = {
                    id_user: userCheckToken.id_user,
                    content_cm: comment,
                    createdate_cm: seconds,
                }
                var addComment = await CommentService.addComment(newComment);
                var  lisidCommentOfPost;
                if(postCheckId.id_list_user_cm=="0")
                {
                    lisidCommentOfPost="";
                }
                else{
                    lisidCommentOfPost=postCheckId.id_list_user_cm;
                }
                var listIdCommet = lisidCommentOfPost+ addComment.id + ",";
                var addCommentInPost = await PostService.UpDateComment(listIdCommet, id_post);

                if (addComment !== null && addCommentInPost != null) {
                    listIdCommet = listIdCommet.split(",");
                    var listComment = [];
                    var avribleGetCount = listIdCommet.length - 1;
                    if (count < listIdCommet.length - 1) {
                        avribleGetCount = count;
                    }
                    for (let i = index - 1; i < avribleGetCount; i++) {
                        var comment = await CommentService.getCommentById(listIdCommet[i]);
                        listComment.push(comment)
                    }

                    res.send(JSON.stringify({
                        code: "1000",
                        message: 'OK',
                        data: listComment,
                        is_blocked: postCheckId.idblock
                    }))

                } else {
                    Error.code9999(res);
                }

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
let deleteComment = async (req, res) => {

    var token = req.body.token;
    var id_post = req.body.id;
    var idcomment = req.body.id_com;

    if (token ==undefined||id_post == undefined||idcomment == undefined) {
        Error.code1002(res);
    } 
    else if(token == ""||id_post == ""||id_post<=0||idcomment==""||idcomment<=0){
        Error.code1004(res);
    }
    else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostByIdBase(id_post, userCheckToken.id_user);
            if (postCheckId !== null && postCheckId.idblock == "0") {

                var commentDetele = await CommentService.getCommentById(idcomment);
                //console.log("chu comment"+commentDetele.poster.id);
                //  console.log("chu comment"+userCheckToken.id_user);

                if (commentDetele != null) {
                    if (commentDetele.poster.id == userCheckToken.id_user|| userCheckToken.id_user==postCheckId.id_user) {

                        var listIdCommet = postCheckId.id_list_user_cm.split(",");

                        for (let i = 0; i < listIdCommet.length; i++) {
                            if (listIdCommet[i] == idcomment) {
                                listIdCommet.splice(i, 1);
                            }
                        }
                        //  console.log(listIdCommet.toString());

                        var updateCommentInPost = await PostService.UpDateComment(listIdCommet.toString(), id_post);

                        var deleteComment = await CommentService.deleteComment(idcomment);

                        if (updateCommentInPost != null && deleteComment != null) {
                            res.send(JSON.stringify({
                                code: "1000",
                                message: 'OK',
                            }))

                        } else {
                            Error.code9999(res);
                        }

                    } else {
                        Error.code1009(res);
                    }
                } else {
                    Error.code9994(res);
                }


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
let editComment = async (req, res) => {
    var token = req.body.token;
    var id_post = req.body.id;
    var idcomment = req.body.id_com;
    var comment = req.body.comment;
    if (token==undefined||id_post==undefined||idcomment==undefined||comment==undefined) {
        Error.code1002(res);
    }
    else if(token==""||id_post==""||id_post<= 0||idcomment==""||idcomment<=0||comment=="")
{
    Error.code1004(res);
}
    else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostByIdBase(id_post, userCheckToken.id_user);
            if (postCheckId !== null && postCheckId.idblock == "0") {

                var commentEdit = await CommentService.getCommentById(idcomment);
                //console.log("chu comment"+commentDetele.poster.id);
                //  console.log("chu comment"+userCheckToken.id_user);

                if (commentEdit != null) {
                    if (commentEdit.poster.id == userCheckToken.id_user) {

                        var listIdCommet = postCheckId.id_list_user_cm.split(",");
                        var checkComment = false;
                        for (let i = 0; i < listIdCommet.length; i++) {
                            if (listIdCommet[i] == idcomment) {
                                // listIdCommet.splice(i, 1);
                                checkComment = true;
                            }
                        }

                        if (checkComment == true) {
                            var deleteComment = await CommentService.upDateCommentInTbComment(comment, idcomment);
                            if (deleteComment != null) {
                                res.send(JSON.stringify({
                                    code: "1000",
                                    message: 'OK',
                                }))

                            } else {
                                Error.code9999(res);
                            }
                        }
                        else {
                            Error.code9999(res);
                        }
                    } else {
                        Error.code1009(res);
                    }
                } else {
                    Error.code9994(res);
                }
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
    addComment: addComment,
    deleteComment: deleteComment,
    editComment: editComment,
    
}
