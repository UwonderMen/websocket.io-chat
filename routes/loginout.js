let express = require('express');
let router = express.Router();
let operation = require('../controller/crud');

router.get('/',(req,res,next)=>{
	let username = req.session.username;
	let password = req.session.password;
	let options = {username,password};
	operation.findUser(options).then(res1=>{
		if(res1){
			return operation.queryUserState(res1,options);
		}else{
			 res.render('error',{msg:'没有该用户'});
		}
	}).then(res2=>{
		//0表示该用户还没有登录,1表示改用已经登录过了
		if(res2 === 1){
			//改登录状态参数
			return operation.updateUserState(options,0);
		}else if(res2 === 0){
			return -1;
		}
	}).then(res3=>{
		if(typeof res3 ==='object' && res3.ok === 1){
			res.cookie('username',"",{
				path:'/',
				maxAge:-1
			});
			res.cookie('nickName',"",{
				path:'/',
				maxAge:-1
			});
			req.session.username = "";
			req.session.nickName = "";
			res.render('login',{});
			res.end();
		}else if(res3 === -1){
			res.render('error',{msg:'用户登录状态没有改变的,请调试登陆过程'});
			res.end();
		}else{
			res.render('error',{msg:"用户状态修改失败,修改状态时查询用户失败"});
			res.end();
		}
	}).catch(err=>{
		res.render('error',{msg:'服务器出错'});
		res.end();
	})
})
module.exports = router;