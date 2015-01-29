var gridster;

Template.board.rendered = function() {

	this.autorun(function() {
		if (Template.currentData()) {
			Session.set("currentBoard", Template.currentData());
			var board_id = Template.currentData()._id;
			gridster = $(".gridster ul").gridster({
				widget_margins: [10, 10],
				widget_base_dimensions: [140, 140],
				draggable: {
					stop: function(e, ui, $widget) {
						updateGridster(gridster);
					}
				},
				resize: {
					stop: function(e, ui, $widget) {
						updateGridster(gridster);
					}
				}
			}).data('gridster');
		}
	});

};

Template.board.events({
	'click .addTile': function() {
		gridster.add_widget('<li class="new">The HTML of the widget...</li>', 1, 1);
		updateGridster(gridster);
	},
	'click li': function(event) {
		var currentSize = parseInt($(event.currentTarget).attr("data-sizex"));
		var newSize = currentSize === 1 ? 2 : 1;
		gridster.resize_widget($(event.currentTarget), newSize, newSize);
		updateGridster(gridster);
	}
});

var updateGridster = function(gridster){
	Boards.update({
		_id: Session.get("currentBoard")._id
	}, {
		$set: {
			tiles: gridster.serialize()
		}
	});	
};