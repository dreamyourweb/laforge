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
				index: i,
				baordId: Boards.findOne()._id
			});
		}

	}

	if (Integrations.find().count() === 0){
		Integrations.insert({
			type: "trello",
			authId: "something",
			options: {
				boardId: "4d5ea62fd76aa1136000000"
			},
			data: {
				cards: [["a","b"],["a","b","a","b"],["a","b","a","b"],["a"]]
			}
		});
	}

});