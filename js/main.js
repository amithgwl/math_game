var MathGame = MathGame || {};

MathGame.game = new Phaser.Game(window.innerWidth*window.devicePixelRatio, window.innerHeight*window.devicePixelRatio, Phaser.AUTO, '');

MathGame.game.state.add('Boot', MathGame.Boot);
MathGame.game.state.add('Preload', MathGame.Preload);
MathGame.game.state.add('MainMenu', MathGame.MainMenu);
MathGame.game.state.add('Level1', MathGame.Game);

MathGame.game.state.start('Boot');