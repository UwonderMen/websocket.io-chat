let express = require('express');
let router = express.Router();
let operation = require('../controller/crud');

router.post('/',(req,res,next)=>{
	//登录要传state=1，把它改为已登录
	//登出要传state=0，把它该为登出状态
	let username = req.body.username.trim();
	let password = req.body.password.trim();
	let nickName = req.body.nickName.trim();
	let options = {username,password,nickName};
	//查询成功后存储user，方便以后的更新状态
	operation.findUser(options).then(res1=>{
		if(res1){
			return operation.queryUserState(res1,options);
		}else{
			 res.render('error',{msg:'没有该用户'});
			 res.end();
			 return -1;
		}
	}).then(res2=>{
		//0表示该用户还没有登录,1表示改用已经登录过了
		if(res2 === 0){
			//改登录状态参数
			return operation.updateUserState(options,1);
		}else if(res2 === 1){
			res.render('error',{msg:'已有用户登录了,请查看您是否登陆过'});
		}else if(res2 === -1){
			return -1;
		}
	}).then(res3=>{
		if(typeof res3 ==='object' && res3.ok === 1){
			res.cookie('username',username,{
				path:'/',
				maxAge:1000*60*60*60
			});
			res.cookie('nickName',nickName,{
				path:'/',
				maxAge:1000*60*60*60
			});
			req.session.username = username;
			req.session.password = password;
			req.session.nickName = nickName;
			res.render('main',{});
		}else if(res3 === -1){
			res.end();
		}else{
			res.render('error',{msg:"用户状态修改失败,修改状态时查询用户失败"});
		}
	}).catch(err=>{
		console.log(err);
		return res.render('error',{msg:'服务器出错'});
	})
})

module.exports = router;