Router.route("/", {
	waitOn: function() {
		return [Meteor.subscribe("tiles"), Meteor.subscribe("boards")];
	},
	data: function() {
		return Tiles.find({}, {
			sort: {
				index: 1
			}
		});
	},
	action: function() {
		this.render('board');
	}
});