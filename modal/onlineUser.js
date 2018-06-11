let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let online = new Schema({
	username:String,
	nickName:String,
	isOnline:Number
})

let onlineUser = mongoose.model("onlineUser",online);
module.exports = onlineUser;