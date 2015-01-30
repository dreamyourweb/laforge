var cursor;
Session.set("packeryLoaded", false);

Template.board.rendered = function() {
	MyPackery.init(this.firstNode);
	Session.set("packeryLoaded", true);

	cursor = this.data;
	MyPackery.observeChanges(cursor);
};

Template.board.helpers({
	tiles: function() {
		return this;
	}
});

Template.board.events({
	'click .addTile': function() {
		var lastTileIndex = Tiles.lastIndex();
		Tiles.insert({
			subject: 'New Tile ' + lastTileIndex,
			index: lastTileIndex
		});
	}
});

Template.tile.rendered = function() {
	var self = this;
	this.autorun(function() {
		if (Session.get("packeryLoaded")) {
			var draggie = new Draggabilly(self.firstNode);
			MyPackery.inst.packery('bindDraggabillyEvents', draggie);
		}
	});

};

Template.tile.events({
	'click .tileResize': function() {

		var old_size_x = this.size_x || 1;
		var old_size_y = this.size_y || 1;

		var size_x = old_size_x === 1 ? 2 : 1;
		var size_y = old_size_y === 1 ? 2 : 1;

		Tiles.update({
			_id: this._id
		}, {
			$set: {
				size_x: size_x,
				size_y: size_y
			}
		});
	}
});

Template.tile.helpers({
	size: function(){
		var size_x = this.size_x || 1;
		var size_y = this.size_y || 1;

		return "w" + size_x + " h" + size_y;
	}
});

// gridster = {};

// Template.board.rendered = function() {

// 	this.autorun(function() {
// 		if (Template.currentData()) {
// 			Session.set("currentBoard", Template.currentData());
// 			console.log("grid reset");
// 			var board_id = Template.currentData()._id;
// 			Meteor.setTimeout(function(){
// 				gridster = $(".gridster ul").gridster({
// 					widget_margins: [10, 10],
// 					widget_base_dimensions: [140, 140],
// 					draggable: {
// 						stop: function(e, ui, $widget) {
// 							serializeGridster(gridster);
// 						}
// 					},
// 					resize: {
// 						stop: function(e, ui, $widget) {
// 							serializeGridster(gridster);
// 						}
// 					}
// 				}).data('gridster');
// 			}, 100);
// 		}
// 	});

// };

// Template.board.events({
// 	'click .addTile': function() {
// 		Boards.update({
// 			_id: Session.get("currentBoard")._id
// 		}, {
// 			$push: {
// 				tiles: next_position
// 			}
// 		});
// 	},
// 	'click li': function(event) {
// 		var currentSize = parseInt($(event.currentTarget).attr("data-sizex"));
// 		var newSize = currentSize === 1 ? 2 : 1;
// 		gridster.resize_widget($(event.currentTarget), newSize, newSize);
// 		serializeGridster(gridster);
// 	}
// });

// var serializeGridster = function(gridster) {
// 	Boards.update({
// 		_id: Session.get("currentBoard")._id
// 	}, {
// 		$set: {
// 			tiles: gridster.serialize()
// 		}
// 	});
// };