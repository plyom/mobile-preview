var StatusBar = {
  posX: 0,
  posY: 0,
  width: 0,
  height: 0,
  color: '',
  imagePath: '',

  el: function() {
    var styles = "position: relative;";
    styles = styles.concat('left: '+this.posX+'px;');
    styles = styles.concat('top: '+this.posY+'px;');
    styles = styles.concat('width: '+this.width+'px;');
    styles = styles.concat('height: '+this.height+'px;');
    styles = styles.concat('background-color: '+this.color+';');

    if (this.imagePath.length > 0) {
      return '<div style="'+styles+'" class="status-bar"><img src="'+this.imagePath+'" style="width:100%;height:100%;"></div>';
    }
    return '';
  },

  load: function(x, y, width, height, image, color) {
    this.posX = x;
    this.posY = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.imagePath = image;

    return this;
  },

  new: function() {
    this.posX = this.posY = this.width = this.height = 0;
    this.color = this.imagePath = '';
    return this;
  }
};