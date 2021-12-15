const chatmodel = require("../models/chat-model")
let checkconversation = (iduser, idfriend) => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await chatmodel.checkConversation(iduser, idfriend);
            if (data != 0) {
                console.log(data[0]);
                resolve(data);
            }
            else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let getlastitemsql = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let data = await chatmodel.getlastitem();
            if (data != 0) {
                //   console.log(data[0]);
                resolve(data[0]);
            }
            else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    }));
}

let insertChat = (datainsert) => {
    return new Promise((async (resolve, reject) => {
        try {
            let repdata = await chatmodel.insertchat(datainsert);
            // console.log(repdata);
            // console.log("sao lai the duoc");
            // console.log(repdata);
            // console.log(repdata);
            // console.log(repdata.id);
            datarep = {
                id: repdata.id,
                Id_user_A: repdata.Id_user_A,
                Id_user_B: repdata.Id_user_B,
                content: repdata.content,
            }
            if (repdata.id = ! null) {

                resolve(datarep);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let insertnewConversation = (dataconversion) => {
    return new Promise((async (resolve, reject) => {
        try {
            let repdata = await chatmodel.insertnewconversation(dataconversion);
            if (repdata.id = !null) {
                //   console.log(data[0]);
                resolve(repdata);
            }
            else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    }));
}

let updataConversation = (dataconversion) => {
    return new Promise((async (resolve, reject) => {
        try {
            let repdata = await chatmodel.updataconversation(dataconversion.id_user_A, dataconversion.Id_user_B, dataconversion.list_id_chat);
            if (repdata.length != 0) {
                console.log(repdata[0]);
                resolve(repdata[0]);
            }
            else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    }));
}
let getallchatbylistid = (listid) => {
    return new Promise((async (resolve, reject) => {
        try {
           var allchat=[];
           var allstidnotphay = listid.split(",");
           console.log("khi cat dau phau");
              console.log(allstidnotphay);
            for (let i = 0; i < allstidnotphay.length-1; i++) {
                let repdata = await chatmodel.getchatbyid(allstidnotphay[i]);
                if (repdata.length != 0) {
                    //   console.log(data[0]);
                    allchat.push(repdata[0]);
                }
                else {
                  resolve([]);
                }
            }

            console.log(allchat);
            resolve(allchat);
        } catch (e) {
            reject(e);
        }
    }));
}
module.exports = {
    checkconversation: checkconversation,
    getlastitemsql: getlastitemsql,
    insertChat: insertChat,
    insertnewConversation: insertnewConversation,
    updataConversation: updataConversation,
    getallchatbylistid:getallchatbylistid,
}