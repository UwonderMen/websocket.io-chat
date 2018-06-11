let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/chatUsers",(err)=>{

	if(err){
		console.log('------------数据库连接失败----------');
	}else{
		console.log('------------数据库连接成功----------');
	}

});