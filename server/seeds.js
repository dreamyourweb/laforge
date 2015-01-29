Meteor.startup(function() {
	if (Boards.find().count() === 0) {

		Boards.insert({
			tiles: [],
			name: "Test Board"
		});
	}
});