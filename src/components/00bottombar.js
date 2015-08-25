var BottomBar = {
  posX: 0,
  posY: 0,
  width: 0,
  height: 0,
  imagePath: '',
  savedContent: '',

  get content() {
    if (this.savedContent.length > 0) {
      return this.savedContent;
    } else {
      return '';
    }
  },

  set content(html) {
    this.savedContent = html;
    $('.mobile-preview .bottom-bar').html(html);
  },

  el: function() {
    var styles = "position: relative;";
    styles = styles.concat('left: '+this.posX+'px;');
    styles = styles.concat('top: '+this.posY+'px;');
    styles = styles.concat('width: '+this.width+'px;');
    styles = styles.concat('height: '+this.height+'px;');
    styles = styles.concat('background-color: rgba(0,222,123,0.5);');

    if (this.savedContent.length > 0) {
      return '<div style="'+styles+'" class="bottom-bar">'+this.content+'</div>';
    } else if (this.imagePath.length > 0) {
      return '<div style="'+styles+'" class="bottom-bar"><img src="'+this.imagePath+'" style="width:100%;height:100%;"></div>';
    }
    return '';
  },

  load: function(x, y, width, height, image) {
    this.posX = x;
    this.posY = y;
    this.width = width;
    this.height = height;
    this.imagePath = image;

    return this;
  },

  new: function() {
    this.posX = this.posY = this.width = this.height = 0;
    this.imagePath = '';
    return this;
  }
};