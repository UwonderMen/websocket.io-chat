let User = require('../modal/user');

function insertUser(opts){
	let nickName = opts.nickName;
	let username = opts.username;
	let password = opts.password;
	let state = opts.state || 0;
	let concatPeople = opts.concatPeople || [];
	let sayAll = opts.sayAll || [];
	return new Promise((resolve,reject)=>{
		let user = new User({
			nickName,
			username,
			password,
			state,
			concatPeople,
			sayAll
		})
		user.save((err,result)=>{
			if(err){
				reject(err);
			}else{
				resolve(resolve);
			}
		})
	})
}

//登录时用于查询用户
function findUser(opts){
	let username = opts.username;
	let password = opts.password;
	return User.findOne({username,password},(err,doc)=>{
		if(err){
			throw err;
		}
		return doc;
	})
}

//注册时用于查询用户username是否存在
function findUserName(username){
	return User.findOne({username:username},(err,doc)=>{
		if(err){
			throw err;
		}
		return doc;
	})
}
//注册时用于查询用户username是否存在
function findNickName(nickName){
	return User.findOne({nickName:nickName},(err,doc)=>{
		if(err){
			throw err;
		}
		return doc;
	})
}

//插入用户在大群里说的话
function insertSays(opts){
	let date = opts.date;
	let sayWhat = opts.sayWhat;
	let say = {date,sayWhat};
	let result = '';
	return findUser(opts).then(res=>{
		if(res){
			res.sayAll.push(say);
			result = "成功";
		}else{
			result = "失败";
		}
		return result;
	})
	
}

function searchUserAllSay(opts){
	let say = [];	
	return findUser(opts).then(res=>{
		if(res){
			say = res.sayAll;
		}else{
			 say.push( "失败");
		}
		return say;
	});
}

function queryUserState(user,opts){
	if(user){
		return new Promise((resolve,reject)=>{
			resolve(user.state);
		});
	}else{
		//101表示没有该用户
		return findUser(opts).then(res=>{
			if(res){
				return res.state;
			}else{
				return 101;
			}
		});
	}
}

function updateUserState(opts,num){
	//100表示成功
	//101没有该用户
	//102表示失败
	let state = 1;
	if(num != 1){
		state = 0;
	}
	let updateOpts = {"$set":{"state":state}};
		return new Promise((resolve,reject)=>{
			User.update(opts,updateOpts,(err,result)=>{
				if(err){
					reject(err);
				}else{
					resolve(result);
				}
			})
			//第二种方法（一种是通过model查询出来修改，另一种是在子类上用save保存进行修改）
			// user.state = state;
			// user.save((err,doc)=>{
			// 	console.log(doc)
			// })
		})
	}

module.exports = {
	findNickName,
	insertUser,
	findUser,
	insertSays,
	searchUserAllSay,
	queryUserState,
	updateUserState,
	findUserName
}
