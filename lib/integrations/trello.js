// if (_.isUndefined(TileFunc)) {
	TileFunc = {};
// }

TileFunc.trello = {
	cardCounts: function cardCounts(data){
		// return data.cards.map(function(list){
		// 	return list.length;
		// });
		return data.cards.length;
	}	
};
