Integrations.find().observe({
	changed: function(newDoc, oldDoc){
		var tiles = Tiles.find({integrationId: newDoc._id});

		tiles.forEach(function(tile){
			var tileData = TileFunc[newDoc.type]["cardCounts"](newDoc.data);
			Tiles.update({_id: tile._id}, {$set: {data: tileData}});
		});
	}
});