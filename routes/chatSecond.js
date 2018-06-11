let express = require('express');
let router = express.Router();
let operation = require('../controller/crud');

router.get('/',(req,res,next)=>{
	let username = req.cookies.username;
    let SayList = [];
    operation.insertSays({id:"10001"}).then(resolve=>{
    let userList = resolve.userList;
    userList.forEach(item=>{
        item.userSayList.forEach(ele=>{
            SayList.push(ele);
        })
    })
        SayList = SayList.sort(util.compare('date'));
        res.render('groupFirst',{SayList:SayList,UserIdentity:username});
    });
})

module.exports = router;