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