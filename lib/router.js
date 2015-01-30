Router.route('/', function() {
	this.render('board', {
		data: function() {
			return Tiles.find({},{sort: {index:1}});
		}
	});
});