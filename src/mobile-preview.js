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
var MobilePreview = {
  devices: {
    ios: {
      image: 'assets/images/ios_device.png',
      display: {
        background: 'url(\'assets/images/wallpaper.png\') no-repeat center center',
        position: [20,74], 
        scale: [262,465],
        statusBar: {
          image: 'assets/images/ios_statusbar.png',
          color: 'rgba(222,222,222,0.8)',
          height: 14
        }
      }
    },
    android: {
      image: 'assets/images/android_device.png',
      display: {
        background: 'url(\'assets/images/wallpaper.png\') no-repeat center center',
        position: [19,64], 
        scale: [262,469],
        statusBar: {
          image: 'assets/images/android_statusbar.png',
          color: 'rgb(0,0,0)',
          height: 20
        },
        bottomBar: {
          image: 'assets/images/android_bottombar.png',
          height: 44
        }
      }
    }
  },
  display: undefined,
  container: $(".mobile-preview"),
  currentDevice: undefined,
  render: function() {
    if (this.currentDevice !== undefined) {
      var self = this;
      var device = Device.load(self.currentDevice, function(html) { self.container.html(html); });
      self.display = device.display;
    }
  },
  setPlatformTo: function(platform) {
    this.currentDevice = this.devices[platform];
    this.render();
  }
};