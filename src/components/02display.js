var Display = {
  posX: 0,
  posY: 0,
  width: 0,
  height: 0,
  statusBar: StatusBar.new(),
  bottomBar: BottomBar.new(),
  background: '',
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
    $('.mobile-preview .display').html(html);
  },

  el: function() {
    var styles = "position: relative; overflow: auto;";
    styles = styles.concat('left: '+this.posX+'px;');
    styles = styles.concat('top: '+this.posY+'px;');
    styles = styles.concat('width: '+this.width+'px;');
    styles = styles.concat('height: '+this.height+'px;');
    styles = styles.concat('background: '+this.background+';');

    return this.statusBar.el()+'<div style="'+styles+'" class="display">'+this.content+'</div>'+this.bottomBar.el();
  },

  load: function(obj) {
    this.posX = obj.position[0];
    this.posY = obj.position[1];
    this.width = obj.scale[0];
    this.height = obj.scale[1];

    if ('background' in obj) {
      this.background = obj.background;
    }

    if ('statusBar' in obj) {
      this.statusBar = StatusBar.load(
        this.posX, 
        this.posY, 
        this.width, 
        obj.statusBar.height, 
        obj.statusBar.image,
        obj.statusBar.color
      );
      this.height -= obj.statusBar.height;
    } else {
      this.statusBar = StatusBar.new();
    }

    if ('bottomBar' in obj) {
      this.bottomBar = BottomBar.load(
        this.posX, 
        this.posY, 
        this.width, 
        obj.bottomBar.height, 
        obj.bottomBar.image
      );
      this.height -= obj.bottomBar.height;
    } else {
      this.bottomBar = BottomBar.new();
    }

    return this;
  }
};