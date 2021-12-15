const db= require('../config/database-config')


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
                    resolve(null);
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
                    console.log('Error check phone number', err);
                    result(err, null);
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

User.checkgpass_user = (pass) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM user WHERE pass_user = ?', pass, (err, res) => {
                if (err) {
                   
                    result(err, null);
                } else {
                   
                    resolve(res);
                }
            })
        } catch (e) {
            reject(e);
        }
    }));
};
User.checkuserbyid = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query('SELECT * FROM user WHERE id_user = ?', id, (err, res) => {
                if (err) {
                    console.log('Error check phone number', err);
                    result(err, null);
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

// friends
User.getlistfriendsbyid = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            db.query(`SELECT * FROM tbl_friend WHERE id_user_a = '${id}' OR id_user_b = '${id}'`, (err, res) => {
                if (err) {
                    console.log('Error check phone number', err);
                    result(err, null);
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
