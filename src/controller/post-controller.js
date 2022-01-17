const Error = require('../module/error');
const UserService = require('../services/user-services')
const PostService = require('../services/post-services')
const CommentService = require('../services/comment-services')

let addPost = async (req, res) => {
    var token = req.body.token;
    var content = req.body.described;
    var allFile = req.files;
    var image;
    var video;
    for (let i = 0; i < allFile.length; i++) {
        if (allFile[i].fieldname == "image") {
            image = allFile[i];
            console.log(image)
        }
        if (allFile[i].fieldname == "video") {
            video = allFile[i];
            console.log(video)
        }
    }
    // 68965727  video tieng anh
    // 111256907 video tieng viet
    var checkcase1 = 0;
    if (token == undefined || (content == undefined && allFile.length == 0)) {
        Error.code1002(res);
    }
    else if (allFile.length > 4) {
        Error.code1004(res);
    }
    else {
        var sizevideo = (video != undefined) ? video.size : 1;
        var sizeimage = (image != undefined) ? image.size : 1;
        //  chỉ có chữ
        if (content != undefined && allFile.length == 0) {
            if (content.length == 0 || content.length > 200) {
                Error.code1002(res);
            }
            else {
                checkcase1 = 1;
            }
        }
        // có cả chữ cả ảnh
        if (content != undefined && allFile.length != 0) {
            if (content.length == 0 || content.length > 200) {
                Error.code1002(res);
            }
            else if (sizevideo > 100000000 || sizeimage > 1000000) {
                Error.code1006(res);
            }
            else {
                checkcase1 = 1;
            }
        }
        // chỉ có ảnh
        if (content == undefined && allFile.length != 0) {
            if (sizevideo > 100000000 || sizeimage > 1000000) {
                Error.code1006(res);
            }
            else {
                checkcase1 = 1;
            }
        }
        if (checkcase1 == 1) {
            var userCheckToken = await UserService.checkUserByToken(token);
            if (userCheckToken !== null) {
                let date_ob = new Date();
                let seconds = date_ob.getTime();
                var url = "/" + "new url" + seconds + userCheckToken.id_user;
                var DataNewPost = {
                    id_user: userCheckToken.id_user,
                    content_post: (content != undefined) ? content : "",
                    url_post: url,
                    media: (allFile.length != 0) ? allFile[0].path : "",
                    id_list_user_like: "0",
                    id_list_user_cm: "0",
                    date_create: seconds,
                }
                // console.log(DataNewPost);
                var newPost = await PostService.addPost(DataNewPost);
                if (newPost.id != null) {
                    var data = {
                        "id": newPost.id + "",
                        "url": newPost.url_post,
                    }
                    res.send(JSON.stringify({
                        code: "1000",
                        message: 'OK',
                        data: data
                    }))

                }
            }
            else {
                Error.code9998(res);
            }
        }

    }
}

let getPost = async (req, res) => {
    var id_post = req.body.id;
    var token = req.body.token;

    if (token == undefined || id_post == undefined) {
        Error.code1002(res);
    }
    else if (token == "" || id_post == "" || id_post <= 0) {
        Error.code1004(res);
    }
    else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostById(id_post, userCheckToken.id_user);
            if (postCheckId !== null) {
                // if (postCheckId.id_blocked == "0") {
                res.send(JSON.stringify({
                    code: "1000",
                    message: 'OK',
                    data: postCheckId,
                }))

                // } else {
                //     Error.code9992(res);
                // }
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
let getListPost = async (req, res) => {
    var count = req.body.count;
    var token = req.body.token;
    var index = req.body.index;
    var last_id = req.body.last_id;
    if (count == undefined || last_id == undefined || index == undefined || token == undefined) {
        Error.code1002(res);
    }

    else if (count == '' || token == "" || index == "" || last_id == "" || index < 0 || last_id <= 0 || count <= 0) {
        Error.code1004(res);
    }
    else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {

            var listPostIndexTo = await PostService.getListPost(index, count);
            var listPost = []
            var newItem = "0";

            if (listPostIndexTo.length > 0) {
                for (let i = 0; i < listPostIndexTo.length; i++) {
                    var postCheckId = await PostService.checkPostById(listPostIndexTo[i].id, userCheckToken.id_user);
                    listPost.push(postCheckId);

                    if (listPostIndexTo[i].id == last_id) {
                        if (listPostIndexTo.length - 1 - i > 0) {
                            newItem = listPostIndexTo.length - 1 - i;
                        }

                    }
                }
                var lastId = last_id;
                if (listPostIndexTo.length != 0) {
                    if (listPostIndexTo[0].id > lastId) {

                        var checkNeuItem = await PostService.getListPostWithBetween(lastId, listPostIndexTo[0].id);
                        newItem = checkNeuItem.length - 1 + listPostIndexTo.length - 1;
                    }

                    lastId = listPostIndexTo[listPostIndexTo.length - 1].id + "";
                }

            }

            res.send(JSON.stringify({
                code: "1000",
                message: 'OK',
                data: listPost,
                "NewItems": newItem + "",
                "LastID": lastId,
            }))
        }
        else {
            Error.code9998(res);
        }
    }
}
let getNewItem = async (req, res) => {
    var last_id = req.body.last_id;
    var category_id = req.body.category_id;
    var token = req.body.token;
    var idFirstTbPost = await PostService.getFirstItem();
    var getLastIdTbPost = await PostService.getLastItem();

    if (category_id == "" || category_id == undefined) {
        category_id = "0";
    }
    if (last_id == undefined || token == undefined) {
        Error.code1002(res);
    }
    else if (last_id == "" || category_id == "" || token == "" || getLastIdTbPost.id < last_id || last_id - idFirstTbPost.id < 0 || last_id <= 0) {
        Error.code1004(res);
    }
    else {
        var idLastTbPost = await PostService.getLastItem();
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {

            var listPostIndexTo = await PostService.getListPostWithBetween(last_id, idLastTbPost.id);
            var listPost = []
            for (let i = 0; i < listPostIndexTo.length; i++) {
                var postCheckId = await PostService.checkPostById(listPostIndexTo[i].id, userCheckToken.id_user);
                listPost.push(postCheckId);

            }
            res.send(JSON.stringify({
                code: "1000",
                message: 'OK',
                data: listPost,
                "new_items": listPost.length - 1 + "",
                "last_id": listPostIndexTo[listPostIndexTo.length - 1].id + "",
            }))
        }
        else {
            Error.code9998(res);
        }

    }
}
let edit_post = async (req, res) => {
    var token = req.body.token;
    var id_post = req.body.id;
    var described = req.body.described;
   // var image = req.body.image;
    if (token == undefined || id_post == undefined || described == undefined) {
        Error.code1002(res);
    }
    else if (token == " " || id_post == "" || id_post <= 0 || described == "" || described.length >= 200) {
        Error.code1004(res);
    }
    else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostById(id_post, userCheckToken.id_user);
            if (postCheckId !== null) {
                if (postCheckId.can_edit != 0) {

                    var upDatePost = await PostService.upDatePost(described, id_post);
                    if (upDatePost == true) {
                        var newPost = await PostService.checkPostById(id_post, userCheckToken.id_user);
                        res.send(JSON.stringify({
                            Code: "1000",
                            Message: 'OK',
                            Data: newPost,
                        }))
                    }
                } else {
                    Error.code1009(res);
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

// split không thể xóa được comment
let deletePost = async (req, res) => {

    var id_post = req.body.id;
    var token = req.body.token;
    if (id_post == undefined || token == undefined) {
        Error.code1002(res);
    }
    else if (id_post == "" || id_post <= 0 || token == "") {
        Error.code1004(res);
    }
    else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostByIdBase(id_post, userCheckToken.id_user);
            if (postCheckId !== null) {

                if (postCheckId.id_user == userCheckToken.id_user) {

                    var postDelete = await PostService.deletePost(id_post);

                    var listIdCommet = postCheckId.id_list_user_cm.split(",");

                    for (let i = 0; i < listIdCommet.length; i++) {
                        var deleteComment = await CommentService.deleteComment(listIdCommet[i]);
                    }

                    // còn xóa comment id comment nữa
                    if (postDelete != null) {
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

let reportPost = async (req, res) => {
    var token = req.body.token;
    var id_post = req.body.id;
    var subject = req.body.subject;
    var details = req.body.details;
    //   console.log(subject);
    if (token == undefined || id_post == undefined || subject == undefined || details == undefined) {
        Error.code1002(res);
    }
    else if (token == "" || id_post == "" || id_post <= 0 ||subject < 0||subject ==""||details == "" ) {
        Error.code1004(res);
    }
    else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostById(id_post, userCheckToken.id_user);
            if (postCheckId !== null) {

                var checkUserReportPost = await PostService.reportPost(id_post, userCheckToken.id_user);
                if (checkUserReportPost == false && postCheckId.can_edit != 1) {
                    var dataRepost = {
                        "id_post": id_post,
                        "id_user": userCheckToken.id_user,
                        "detail": details,
                    }
                    var addReportPost = await PostService.addReportPost(dataRepost);
                    if (addReportPost != null) {
                        res.send(JSON.stringify({
                            code: "1000",
                            message: 'OK',
                            // Data: postCheckId,
                        }))

                    }
                } else {
                    Error.code9997(res);
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
let addLike = async (req, res) => {
    var token = req.body.token;
    var id_post = req.body.id;

    if (token==undefined||id_post==undefined) {
        Error.code1002(res);

    }
    else if(token == ""||id_post == ""||id_post<= 0)
    {
        Error.code1004(res);
    }
     else {
        var userCheckToken = await UserService.checkUserByToken(token);
        if (userCheckToken !== null) {
            var postCheckId = await PostService.checkPostByIdBase(id_post, userCheckToken.id_user);
            if (postCheckId !== null) {
                if (postCheckId.idblock == "0") {
                    var listIdUserLike = (postCheckId.id_list_user_like == "0") ? "" : postCheckId.id_list_user_like;
                    var arrayIdUserLike = listIdUserLike.split(",");

                    var checkUserLike = 0;
                    for (let i = 0; i < arrayIdUserLike.length - 1; i++) {
                        if (arrayIdUserLike[i] == userCheckToken.id_user) {
                            arrayIdUserLike.splice(i, 1);
                            checkUserLike = 1;
                        }
                    }
                    listIdUserLike = (checkUserLike == 0) ? listIdUserLike + userCheckToken.id_user + "," : arrayIdUserLike.toString();


                    var upDateLike = await PostService.upDateLike(listIdUserLike, id_post);
                    if (upDateLike != null) {
                        var postCheckIdUpDate = await PostService.checkPostByIdBase(id_post, userCheckToken.id_user);
                        res.send(JSON.stringify({
                            code: "1000",
                            message: 'OK',
                            data: postCheckIdUpDate.id_list_user_like.split(",").length - 1 + "",
                        }))
                    } else {
                        Error.code9999(res);
                    }

                } else {
                    Error.code9992(res);
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
    addPost: addPost,
    getPost: getPost,
    getListPost: getListPost,
    getNewItem: getNewItem,
    edit_post: edit_post,
    deletePost: deletePost,
    reportPost: reportPost,
    addLike: addLike,

}