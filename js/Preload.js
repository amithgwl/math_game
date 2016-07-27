var MathGame = MathGame || {};

//loading the game assets
MathGame.Preload = function(){};

MathGame.Preload.prototype = {
  preload: function() {

    var preloadBar = this.add.sprite((this.game.world.width/2-64), (this.game.world.height/2+50), 'load_progress_bar');
  this.game.load.setPreloadSprite(preloadBar);
 var loadingText = this.game.add.bitmapText(this.game.world.width/2, this.game.world.height/2, 'minecraftia', 'Loading...', 21); 
    loadingText.x = this.game.width / 2 - loadingText.textWidth / 2;

    this.load.image('button1', 'assets/images/start_button.png');
    this.load.image('menubk', 'assets/images/menubk.png');
    this.load.image('space', 'assets/images/space.png');
    this.load.image('bk', 'assets/images/gamebk.png');
    this.load.image('atari1', 'assets/images/lock.png');
    this.load.image('atari2', 'assets/images/key.png');
    this.load.image('atari3', 'assets/images/unlock.png'); 
    this.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
    this.load.audio('clapping', 'assets/audio/claps.mp3');
    this.load.image('loading', 'assets/images/loading.png');
    this.load.image('load_progress_bar_dark', 'assets/images/progress_bar_bg.png');
   
    this.load.audio('sfx_error', ['assets/audio/magical_horror_audiosprite.mp3', 'assets/audio/magical_horror_audiosprite.ogg' ]);
    this.load.audio('sfx_true','assets/audio/fx_mixdown.ogg');
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};