let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let room = new Schema({
	id:String,
	userList:[{
		username:String,
		userSayList:[
			{
				say:String,
				date:String,
				UserIdentity:String,
				userNick:String,
				img:String
			}
		]
	}]
})

let ChatRoom = mongoose.model('ChatRoom',room);

module.exports = ChatRoom;