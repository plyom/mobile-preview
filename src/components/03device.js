var Device = {
  bgPath: '',
  width: 0,
  height: 0,
  display: undefined,

  el: function() {
    if (this.bgPath !== undefined) {
      return '<div style="width:'+this.width+'px;height:'+this.height+'px;background-image:url(\''+this.bgPath+'\');">'+this.display.el()+'</div>';
    }
    return '';
  },

  load: function(obj, callback) {
    var self = this;
    var image = new Image();

    self.display = Display.load(obj.display);

    image.onload = function() {
      self.width = image.width;
      self.height = image.height;
      self.bgPath = obj.image;
      callback(self.el());
    };
    image.src = obj.image;

    return self;
  }
};