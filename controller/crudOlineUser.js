let onlineUser = require('../modal/onlineUser');

//插入用户
function insertOnlineUser(opts){
	let username = opts.username;
	let nickName = opts.nickName;
	let isOnline = opts.isOnline;
	return new Promise((resolve,reject)=>{
		let user = new onlineUser({
			username,
			nickName,
			isOnline
		})
		user.save((err,doc)=>{
			if(err){
				reject(err);
			}else{
				resolve(doc);
			}
		})
	})
}

//查询在线或者不在线
function queryOnlineUser(opts){
	return onlineUser.find(opts,null,(err,doc)=>{
		if(err){
			throw err;
		}else{
			console.log(doc)
			return doc;
		}
	})
}
//查询全部用户数量
function queryAllUser(){
	return new Promise((resolve,reject)=>{
		onlineUser.count((err,result)=>{
			if(err){
				reject(err);
			}else{
				resolve(result);
			}
		})
	})
}

//修改在线或者不在线
function updateOnline(opts,num){
	let isOnline = num === 0?0:1;
	let option = {"$set":{isOnline:isOnline}};
	return new Promise((resolve,reject)=>{
		onlineUser.update(opts,option,(err,result)=>{
			if(err){
				reject(err);
			}else{
				resolve(result);
			}
		})
	})
}

//判断该用户是否存在了
function isExist(opts){
	let username = opts.username;
	return onlineUser.findOne({username},(err,doc)=>{
		if(err){
			throw err;
		}else{
			return doc;
		}
	})
}

module.exports = {
	updateOnline,
	queryAllUser,
	queryOnlineUser,
	insertOnlineUser,
	isExist
}