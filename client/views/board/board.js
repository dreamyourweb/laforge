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
			var draggie = new Draggabilly(self.firstNode, {
				handle: ".dragHandle"
			});
			MyPackery.inst.packery('bindDraggabillyEvents', draggie);
			var dragResize = new Draggabilly(self.find(".resizeHandle"), {
				containment: true
			});

			var colWidth = MyPackery.inst.packery().data().packery.options.columnWidth;
			var rowHeight = MyPackery.inst.packery().data().packery.options.rowHeight;
			var gutter = MyPackery.inst.packery().data().packery.options.gutter;

			var dragStartX,
				dragStartY,
				sizeStartX,
				sizeStartY,
				sizeX,
				sizeY,
				cols,
				rows,
				prevCols = self.data.size_x,
				prevRows = self.data.size_y,
				guttersX,
				guttersY;

			dragResize.on('dragStart', function(draggieInstance, event, pointer) {
				dragStartX = pointer.pageX;
				dragStartY = pointer.pageY;
				sizeStartX = $(self.firstNode).width();
				sizeStartY = $(self.firstNode).height();
				$(self.firstNode).css('transition', '');
				MyPackery.inst.packery('stamp', $(self.firstNode));
			});

			dragResize.on('dragMove', function(draggieInstance, event, pointer) {
				sizeX = sizeStartX + (pointer.pageX - dragStartX);
				sizeY = sizeStartY + (pointer.pageY - dragStartY);

				sizeX = sizeX < colWidth ? colWidth : sizeX;
				sizeY = sizeY < rowHeight ? rowHeight : sizeY;

				$(self.firstNode).css('width', sizeX);
				$(self.firstNode).css('height', sizeY);

				guttersX = Math.ceil(sizeStartX / colWidth - 1) * gutter;
				guttersY = Math.ceil(sizeStartY / rowHeight - 1) * gutter;

				cols = Math.ceil((sizeX - guttersX) / colWidth);
				rows = Math.ceil((sizeY - guttersY) / rowHeight);

				if (cols !== prevCols || rows !== prevRows) {
					Deps.afterFlush(function() {
						MyPackery.inst.packery('layout');
					});
				}

				prevCols = cols;
				prevRows = rows;
			});

			dragResize.on('dragEnd', function(draggieInstance, event, pointer) {
				$(self.firstNode).css('transition', 'height 200ms, width 200ms');
				$(self.firstNode).css('width', '');
				$(self.firstNode).css('height', '');

				var roundedCols = Math.round((sizeX - guttersX) / colWidth);
				var roundedRows = Math.round((sizeY - guttersY) / rowHeight);
				Tiles.update({
					_id: self.data._id
				}, {
					$set: {
						size_x: roundedCols,
						size_y: roundedRows
					}
				});
				MyPackery.inst.packery('unstamp', $(self.firstNode));
			});
		}
	});

};

Template.tile.helpers({
	size: function() {
		var size_x = this.size_x || 1;
		var size_y = this.size_y || 1;

		return "w" + size_x + " h" + size_y;
	}
});