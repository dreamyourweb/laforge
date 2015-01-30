Tiles = new Mongo.Collection("tiles");

Tiles.lastIndex = function(board){
	return Tiles.findOne({},{sort: {index: -1}, limit: 1}).index;
};