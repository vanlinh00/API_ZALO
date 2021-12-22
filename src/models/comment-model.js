const db = require('../config/database-config')
const Comment=()=>{

}

Comment.getCommentById = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM  tbl_comment WHERE id = ?', id, (err, res) => {
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
Comment.addComment = (data) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query("INSERT INTO tbl_comment SET ?", data, (err, res) => {
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
module.exports =Comment;