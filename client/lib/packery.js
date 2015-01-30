MyPackery = {
  // Singleton instance
  inst: null,

  // Use underscore's _.once functio to make sure this is only called
  // once. Subsequent calls will just return.
  init: _.once(function(container) {
    var self = this;
    this.inst = $(container).packery({
      itemSelector: '.tile',
      gutter: 10,
      columnWidth: 80,
      rowHeight: 80
    });

    this.inst.packery('on', 'dragItemPositioned', function(packery, item) {
      var itemElems = self.inst.packery('getItemElements');
      $(itemElems).each(function(i, itemElem) {
        var id = $(itemElem).attr('id');
        Tiles.update({
          _id: id
        }, {
          $set: {
            index: i
          }
        });
      });
    });

  }),

  update: function() {
    var self = this;
    if (this.inst) {
      // Wait until dependencies are flushed and then force a layout
      // on our packery instance
      Deps.afterFlush(function() {
        self.inst.packery('reloadItems');
        self.inst.packery('layout');
      });
    }
  },

  observeChanges: function(cursor) {
    // Call observeChanges after the {{#each}} helper has had a chance
    // to execute because it also uses observeChanges and we want our code
    // to run after Meteor's. This way Spark will be done with all the
    // rendering work by the time this code is called.
    Meteor.startup(function() {
      cursor.observeChanges({
        addedBefore: function(id) {
          MyPackery.update();
        },

        movedBefore: function(id) {
          MyPackery.update();
        },

        removed: function(id) {
          MyPackery.update();
        },
        changed: function(id, fields) {
          if(fields.size_x || fields.size_y){
            MyPackery.update();  
          }
        }
      });
    });
  }
};