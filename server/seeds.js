Meteor.startup(function() {
	if (Boards.find().count() === 0) {

		Boards.insert({
			name: "Test Board"
		});
	}

	if (Tiles.find().count() === 0) {
		for (var i = 0; i < 5; i++) {
			Tiles.insert({
				subject: 'Ticket ' + i,
				description: 'Some description for the ticket',
				index: i
			});
		}

	}

});