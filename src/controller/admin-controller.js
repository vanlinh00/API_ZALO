const userservice = require('../services/user-services')
let home = async (req, res) => {
  if (req.user.role == "1") {
    res.render('admin/trangchu.ejs');
  }
  else
  {
  res.redirect('/')
  }

}
let login = async (req, res) => {
  res.render('admin/login.ejs');
}
let getAlluser= async (req, res) => {
var listuser = await userservice.getalluser();
  res.render('admin/getalluser.ejs',{
    userData: listuser,
  })
}
let userdetail= async (req, res) => {
  res.render('admin/detail.ejs')
}
module.exports = {
  home: home,
  login: login,
  getAlluser:getAlluser,
  userdetail:userdetail,
}