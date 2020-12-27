var express = require('express');
var router = express.Router();
var {User}=require("../model/user");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

router.post('/register', async function(req, res, next) {
  /*let user=new User(req.body);
  await user.save();
  res.redirect('/');
*/
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  //await user.generateHashedPassword();
  let salt= await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  // return res.send(_.pick(user, ["name", "email"]));
  res.redirect('/');

});

router.get('/login', function(req, res, next) {
  res.render('users/login');
});


router.get('/logout', function(req, res, next) {
  req.session.user= null;
  res.redirect('/login');
});

router.post('/login',async function(req, res, next) {
  /* let user=await User.findOne({
       email: req.body.email,
       password: req.body.password,
   });
    if (!user) return res.redirect("/login");*/

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User Not Registered");
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send("Invalid Password");
    let token = jwt.sign(
      { _id: user._id, name: user.name },
      config.get("jwtPrivateKey")
    );
    //res.send(token);
    req.session.user=user;
    res.redirect("/");
});

module.exports = router;
