Router.route('/', function() {
	this.render('board', {
		data: function() {
			return Boards.findOne();
		}
	});
});