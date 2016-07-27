var MathGame = MathGame || {};

MathGame.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
MathGame.Boot.prototype = {
  preload: function() {
  	//assets we'll use in the loading screen
     this.game.load.image('load_progress_bar', 'assets/images/progress_bar_fg.png');
     this.game.load.bitmapFont('minecraftia','assets/fonts/font.png','assets/fonts/font.xml');
  },
  create: function() {
  	//loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    //scaling options
	this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

	//physics system for movement
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
  }
};
