Meteor.publish("boards", function(){
	return Boards.find();
});

Meteor.publish("tiles", function(){
	return Tiles.find();
});