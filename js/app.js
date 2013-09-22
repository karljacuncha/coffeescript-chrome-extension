(function() {
  var JamesBaxter, getURL,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  getURL = function(path) {
    if (window.isChromeExt) {
      return chrome.extension.getURL(path);
    } else {
      return path;
    }
  };

  JamesBaxter = (function() {
    var audioFile, currentFrame, frameCount, frameRate, imagePaths, titleScreen;

    imagePaths = [];

    titleScreen = getURL("assets/title.jpg");

    audioFile = getURL('assets/voice.mp3');

    currentFrame = 0;

    frameRate = 66;

    frameCount = 48;

    function JamesBaxter($node, callback) {
      this.play = __bind(this.play, this);
      var i,
        _this = this;
      this.node = $node;
      this.title = new Image();
      this.title.src = titleScreen;
      this.node.html(this.title);
      this.voice = document.createElement("audio");
      this.voice.src = audioFile;
      this.voice.loop = true;
      for (i = 1; 1 <= frameCount ? i <= frameCount : i >= frameCount; 1 <= frameCount ? i++ : i--) {
        imagePaths.push(getURL("assets/james" + i + ".jpg"));
      }
      this.loadImages(imagePaths, function(frames) {
        _this.frames = frames;
        return callback(_this);
      });
    }

    JamesBaxter.prototype.loadImages = function(paths, callback) {
      var frames, p, _i, _len;
      frames = [];
      for (_i = 0, _len = paths.length; _i < _len; _i++) {
        p = paths[_i];
        frames.push(new Image());
        _.last(frames).src = p;
      }
      return callback(frames);
    };

    JamesBaxter.prototype.play = function() {
      if (!this.playing) return;
      currentFrame++;
      if (currentFrame >= this.frames.length) {
        currentFrame = 0;
        this.voice.currentTime = 0;
      }
      this.node.html(this.frames[currentFrame]);
      return _.delay(this.play, frameRate, currentFrame);
    };

    JamesBaxter.prototype.stop = function() {
      this.voice.pause();
      return this.playing = false;
    };

    JamesBaxter.prototype.start = function() {
      this.playing = true;
      this.voice.play();
      return this.play();
    };

    return JamesBaxter;

  })();

  window.isChromeExt = chrome && __indexOf.call(_.keys(chrome), "extension") >= 0;

  if (window.isChromeExt && !(window.location.href === chrome.extension.getURL("index.html"))) {
    window.location.href = chrome.extension.getURL("index.html");
  }

  $(document).ready(function() {
    var $main, $wtf,
      _this = this;
    $wtf = $('#wtf');
    $wtf.on("click", "button", function(e) {
      return $wtf.find("#explanation").toggle();
    });
    $main = $('#main');
    return new JamesBaxter($main, function(jb) {
      $main.on("mousedown", function(e) {
        jb.start();
        $wtf.find("#get_started").hide();
        return $wtf.find("#explanation").hide();
      });
      return $main.on("mouseup", function(e) {
        return jb.stop();
      });
    });
  });

}).call(this);
