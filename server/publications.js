Meteor.publish("boards", function(){
	return Boards.find();
});

Meteor.publish("tiles", function(){
	return Tiles.find();
});

Meteor.publish("integrations", function(){
	return Integrations.find();
});