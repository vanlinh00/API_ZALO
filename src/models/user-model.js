const db = require('../config/database-config')
const Error = require('../module/error')

const User = function (user) {
    this.id = user.id_user;
    this.name = user.name_user;
    this.pass = user.pass_user;
    this.sdt = user.sdt_user;
    this.linkavt = user.linkavt_user;
    this.listidblock = user.list_id_block;
}

User.get_all = () => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query("SELECT * FROM user", function (err, user) {
                if (err) {
                    Error.code1001(res);
                } else {
                    resolve(user);
                }
            });
        } catch (e) {
            reject(e);
        }
    }));
};

User.checkPhoneUser = (phone) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM user WHERE sdt_user = ?', phone, (err, res) => {
                if (err) {
                    Error.code1001(res);
                } else {
                    console.log('Check phone number successfully');
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};
User.addUser = (data) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query("INSERT INTO user SET ?", data, (err, res) => {
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

User.checkPassUser = (pass) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM user WHERE pass_user = ?', pass, (err, res) => {
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
User.updateTokenUser = (idUser, token) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`UPDATE user SET token='${token}' WHERE id_user = '${idUser}'`, (err, res) => {
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
User.checkUserByToken = (token) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM user WHERE Token = ?', token, (err, res) => {
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
User.checkUserBlock = (idUserA,idUserB) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`SELECT * FROM tbl_blocks WHERE id_blockA = '${idUserA}' AND id_blockB = '${idUserB}' OR id_blockA = '${idUserB}' AND id_blockB = '${idUserA}'`, (err, res) => {
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







// day la o phan chat nen hoi ngu//
User.checkuserbyid = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM user WHERE id_user = ?', id, (err, res) => {
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

// friends
User.getlistfriendsbyid = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`SELECT * FROM tbl_friend WHERE id_user_a = '${id}' OR id_user_b = '${id}'`, (err, res) => {
                if (err) {
                    Error.code1001(res);
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
module.exports = User;
