const db = require('../config/database-config')
const Error = require('../module/error')

const Post = function (post) {
    this.id_post = post.id_post;
    this.id_user = post.id_user;
    this.content_post = post.content_post;
    this.media = post.media;
    this.id_list_user_cm = post.id_list_user_cm;
    this.id_list_user_like = post.id_list_user_like;
    this.date_create = post.date_create;
}
Post.addPost = (data) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query("INSERT INTO tbl_post SET ?", data, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve({ id: res.insertId, ...data });
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};
Post.checkPostByid = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM tbl_post WHERE id = ?', id, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};
Post.checkPostIndexToCount = (index, count) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`SELECT * FROM tbl_post LIMIT ${index}, ${count}`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};

Post.getLastItem = () => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`SELECT * FROM tbl_post ORDER BY id DESC LIMIT 1`, (err, res) => {
                if (err) {
                    resolve(null);
                } else {
                    //  console.log('Check phone number successfully');
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};
Post.getFirstItem = (req, res) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`SELECT * FROM tbl_post ORDER BY id ASC LIMIT 1`, (err, res) => {
                if (err) {
                    resolve(null);
                } else {
                    //  console.log('Check phone number successfully');
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
}
Post.upDatePost = (content_post, id) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`UPDATE tbl_post SET content_post='${content_post}' WHERE id = '${id}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};
Post.UpDateComment = (id_list_user_cm, id) => {

    return new Promise((async (resolve, reject) => {
        try {
            db.query(`UPDATE tbl_post SET id_list_user_cm='${id_list_user_cm}' WHERE id = '${id}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};

Post.upDateLike = (listIdUserLike, id) => {

    return new Promise((async (resolve, reject) => {
        try {
            db.query(`UPDATE tbl_post SET id_list_user_like ='${listIdUserLike}' WHERE id = '${id}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};
Post.deletePost = (id) => {

    return new Promise((async (resolve, reject) => {
        try {
            db.query(`DELETE FROM tbl_post WHERE id = '${id}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};

Post.getListPostWithBetween = (lastId, lastIdDatabase) => {

    return new Promise((async (resolve, reject) => {
        try {
            db.query("SELECT * FROM tbl_post WHERE id BETWEEN ? AND  ?", [lastId, lastIdDatabase], (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};


Post.reportPost = (idPost, idUser) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`SELECT * FROM tbl_report WHERE id_post ='${idPost}' AND id_user ='${idUser}' AND is_report='${0}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};
Post.addReportPost = (data) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query("INSERT INTO tbl_report SET ?", data, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve({ id: res.insertId, ...data });
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};

Post.searchPost = (keyword) => {

    return new Promise((async (resolve, reject) => {
        try {
db.query('SELECT * FROM tbl_post WHERE content_post LIKE "%' + keyword + '%"', function (err, res) {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};

module.exports = Post;