let Room = require('../modal/chatRoom');

function insertSays(opts){
	return Room.findOne(opts,(err,doc)=>{
		return doc;
	})
}
module.exports = {
	insertSays
}