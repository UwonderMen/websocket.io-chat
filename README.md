##简单的聊天系统

>用nodejs+mongo+websocket做的简单聊天系统

![mainImg](https://github.com/UwonderMen/websocket.io-chat/blob/master/public/README/gif5%E6%96%B0%E6%96%87%E4%BB%B6.gif)

![img1](https://github.com/UwonderMen/websocket.io-chat/blob/master/public/README/2018-06-11_225731.png)
![img1](https://github.com/UwonderMen/websocket.io-chat/blob/master/public/README/2018-06-11_225756.png)
![img1](https://github.com/UwonderMen/websocket.io-chat/blob/master/public/README/2018-06-11_225858.png)
![img1](https://github.com/UwonderMen/websocket.io-chat/blob/master/public/README/2018-06-11_225808.png)



>主要功能：只实现了群聊这部分、两个人之间的聊天怎么更新中、可以看见在线人数、群中总人数、列出了在线的用户、能发图片、用户退出后在进入可以看到历史消息(不是缓存)

>注册与登陆部分：实现注册，注册用户名单一、同时实现单一用户在线登陆

>缺点1：项目某些部分还没有进行优化，例如客户端的js代码还有就是布局使用的是弹性布局，有些色彩部分使用的是谷歌支持的，在ie上很是恶心建议使用google进行测试，还有列出了在线的用户(这个功能做的有点low利用的是客户端隔秒刷新来检测用户在线情况，还在考虑新方法。。。)

>缺点2：项目路由部分还没有写完，有时跳过登陆会看到恶心一幕，不建议尝试不登录，布局很low，望前端大神低调路过。。。


1. git clone 或者download下来
2. npm install 安装依赖
3. 启动数据库
4. npm run start

###如果您没有安装nodejs，那么您可以去nidejs官网

[nodejs]:https://nodejs.org/en/ "nodejs"

###如果您没有安装mongo数据库，建议去mongo官网

[mongo]:https://www.mongodb.com/ "mongo"

