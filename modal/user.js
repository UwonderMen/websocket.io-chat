let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
	nickName:String,
	username:String,
	password:String,
	state:Number,
	concatPeople:[
		{
			username:String,
			say:[
				{
					sayToContact:String,
					sayDate:String
				}
			],
		}
	],
	sayAll:[
		{
			sayWhat:String,
			date:String
		}
	],
});

let  UserList = mongoose.model('UserList',User);
module.exports = UserList;