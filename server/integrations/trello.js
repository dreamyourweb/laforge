Trello = Meteor.npmRequire("node-trello");

Meteor.methods({
	updateIntegrationData: function(integrationId, data) {
		var integration = Integrations.findOne({
			_id: integrationId
		});

		if (integration.type === "trello") {
			var trello = new Trello("b21235703575c2c2844154615e41c3d4", "a069556aa45c3bc985a27d658ce393f99e9c1c4dcc983ac43db94b7a7639b36e");

			trello.getSync = Meteor.wrapAsync(trello.get, trello);

			var results = trello.getSync("/1/boards/4d5ea62fd76aa1136000000c", {
				cards: "visible"
			});

			Integrations.update({_id: integrationId}, {$set: {data: results}});

		}
	}
});