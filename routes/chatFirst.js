let express = require('express');
let router = express.Router();
let operation = require('../controller/crudRoom');
let util = require("../util/compare");
let operationOnline = require('../controller/crudOlineUser');

router.get('/',(req,res,next)=>{
	let username = req.cookies.username;
    let SayList = [];
    operationOnline.updateOnline({username},1).then(res=>{
        if(res.ok===1){
            console.log("修改成功");
            return operation.insertSays({id:"10001"});
        }else{
            console.log("修改失败");
            return -1;
        }
    }).then(resolve=>{
       if(resolve===-1){
            return -1;
       }else{
            let userList = resolve.userList;
            userList.forEach(item=>{
                item.userSayList.forEach(ele=>{
                    SayList.push(ele);
                })
            })
                SayList = SayList.sort(util.compare('date'));
                SayList.forEach(item1=>{
                    item1.date = (new Date(parseInt(item1.date))).toDateString();
                })
                return Promise.all([operationOnline.queryAllUser(),operationOnline.queryOnlineUser({isOnline:1})]);
           }
    }).then(resolve1=>{
       if(resolve1===-1){
            res.render("error",{msg:"用户进group1群状态修改失败"});
            res.end();
       }else{
        let userList = [];
        let count = 0;
        let onlineCount = 0;
        resolve1.forEach(item2=>{
            if(typeof item2 === 'number'){
                count = item2;
            }else{
                userList = item2;
                onlineCount = item2.length;
            }
        })
         res.render('groupFirst',{SayList:SayList,UserIdentity:username,UserList:userList,userCount:count,onlineCount:onlineCount});
       }
    })
})

module.exports = router;