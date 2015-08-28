# mobile-preview

> Generates a dynamic display of mobile phones

## Getting Started
This plugin requires jQuery `>=1.9.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install mobile-preview --save
```

Once the plugin has been installed, it may be enabled inside your code:

```html
<div class="mobile-preview"></div>
```

```js
MobilePreview.render();
// OR
MobilePreview.setPlatformTo('ios');
```


### Options

#### devices
Add and set all platforms or models you want.

```js
MobilePreview.devices = {
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
}
```

#### container
Set the element target.

```js
MobilePreview.container = $(".mobile-preview");
```

#### currentDevice
Set initial platform or model.

```js
MobilePreview.currentDevice = MobilePreview.devices.ios;
```

#### Change the content
```js
MobilePreview.display.content = '<div class="hello">Hello World!</div>';
```

## Release History

* 2013-08-25   v0.1.2   Fix status bar.
* 2013-08-25   v0.1.1   Adjusts on layout.
* 2013-08-25   v0.1.0   Born a new component.