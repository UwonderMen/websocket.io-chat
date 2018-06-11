let express = require('express');
let router = express.Router();
let operation = require('../controller/crud');

router.post('/',(req,res,next)=>{
	let username = req.body.username;
	let pwd = req.body.password;
	let nick = req.body.nickName;
	let confirm_pwd = req.body.confirm_pwd;
	if(pwd === confirm_pwd){
		let opts = {username:username,password:pwd,nickName:nick};
		operation.findUserName(username).then(resolve=>{
			if(resolve){
				 res.render('regsiter',{msg:'用户已被注册'});
				 res.end();
			}else{
				return operation.findNickName(nick);
				
			}
		}).then(resolve1=>{
			if(resolve1){
				res.render("error",{msg:'昵称已被占用'});
			}else{
				return operation.insertUser(opts);
			}
		}).then(resolve2=>{
			if(resolve2){
				res.render('login');
			}else{
				res.render("error",{msg:'注册失败'});
			}
		}).catch(err=>{
			 res.render('error',{msg:'其他错误导致注册失败'});
		})
	}else{
		 res.render('regsiter',{msg:'两次密码不一致'});
	}
})
module.exports = router;