let express = require('express');
var bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let app = express();
let server = require('http').Server(app);
let io  = require('socket.io')(server);
let fs = require('fs');
let path = require('path');
let mainRouter = require('./routes/main');
let ChatFirst = require('./routes/chatFirst');
let ChatSecond = require('./routes/chatSecond');
let regsiterContro = require('./routes/regsiterContro');
let con = require('./controller/connect');
let session = require('express-session');
let loginout = require('./routes/loginout');
let operation = require('./controller/crudRoom');
let util = require('./util/compare');
let operationOnline = require('./controller/crudOlineUser');

let socketIDList=[];
app.use(session({
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true,
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/upload'));
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

//路由
// app.use((req,res,next)=>{
//     if(req.cookies.username){
//         next();
//     }else{
//         res.render('error',{msg:'您未登录'});
//     }
// })
app.get('/',(req,res,next)=>{
    res.render('login');
})
app.get('/regsiter',(req,res,next)=>{
    res.render('regsiter',{msg:''});
})
app.use('/loginout',loginout);
app.use('/mainFrame',mainRouter);
app.use('/groupChatFirst',ChatFirst);
app.use('/groupChatSecond',ChatSecond);
app.use('/regsiterContro',regsiterContro);

io.of('/groupFirst').on('connection', function (socket) {
	let msg = {socketID:socket.id};
    socket.on('groupChatFirst', function (result) {
        let username = result.user.username,
            nickName = decodeURIComponent(result.user.nickName);
        let say = { 
                date:result.date,
                userNick:nickName,
                UserIdentity:username
            };
            say["say"] = typeof result.data === "undefined" ? "":result.data;
            say["img"] = typeof result.img=== "undefined" ? "":result.img;
    	let arr = {...msg,...result},
            //初始化每个用户都是在线
            isOnline = 1,
            sayList = [],
            user = {
            username:username,
            userSayList:sayList,
            };
        //将进入group1的人加入数据库
        operationOnline.isExist({username}).then(res=>{
            if(res){
                console.log('该用户已存在，已存在用户的username='+res.username);
                return -1;
            }else{
                return  operationOnline.insertOnlineUser({username,nickName,isOnline});
            }
        }).then(res1=>{
            if(res1){
                console.log("用户"+res1.username+"加入成功");
            }else if(res1 === -1){
                console.log("没有加入，因为已存在");
            }
        })
        // socketIDList.push(arr);
        sayList.push(say);
    	operation.insertSays({id:"10001"}).then(resolve=>{
            let userList = resolve.userList;
            let flag = 0;
            userList.forEach(item=>{
                if(item.username === username ){
                    item.userSayList.push(say);
                    flag++;
                }
            })
            if(flag ===0){
                userList.push(user); 
            }
            resolve.save((err,doc)=>{
               if(err)throw err;
            })
        })
        if(result.data){
            socket.broadcast.emit('otherEmit',{data:result.data,date:result.date,nick:nickName});
        }else{
             socket.broadcast.emit('otherEmit',{img:result.img,date:result.date,nick:nickName});
        }
      
    });
    socket.on("userCut",function(result){
        let username = result.user.username;
        operationOnline.updateOnline({username},0).then(res=>{
            if(res.ok===1){
                console.log("修改成功");
            }else{
                console.log("修改失败");
            }
        })
    })
    socket.on('disconnect',()=>{
    	console.log("有用户退出");
    })
});


server.listen(3000);

//获取所有房间信息
 // console.log(io.sockets.adapter.rooms );
 // 
 // io.sockets.clients('particular room') 换成了 io.sockets.adapter.rooms['private_room'];