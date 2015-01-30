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
