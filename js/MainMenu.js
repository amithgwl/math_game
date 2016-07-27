var MathGame = MathGame || {};
var ready;
//title screen
MathGame.MainMenu = function(){};

var menuscreenbk;

MathGame.MainMenu.prototype = {

 
  create: function(game) {
    this.createButton(game,"play",game.world.centerX,game.world.centerY-30,300,200,function(){
        this.state.start('Level1');
    });
  },
  createButton:function(game,string,x,y,w,h,callback){

    menuscreenbk=game.add.sprite(game.world.centerX,game.world.centerY,'menubk');
    menuscreenbk.anchor.setTo(0.5,0.5);

    var button1=game.add.button(x,y,'button1',callback,this,2,1,0);
    button1.anchor.setTo(0.5,0.5);
    button1.width=w;
    button1.height=h;
  } 

};