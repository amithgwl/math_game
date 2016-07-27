var MathGame = MathGame || {};

//title screen
MathGame.Game = function(){

};
    var sprite1;
var sprite2;
var text;
var myCountdownSeconds;
var timer, score, life, crntScore=0, lifeLeft = 3;
var music,claps;
var spriteLocks = [];
var spriteKeys = [];
var keyMatched = 0;
var group1;
var group2;
var xCoordinateLocks = [50, 200, 400, 450];
var yCoordinateLocks = [250, 350, 100, 250];
var xCoordinateKeys = [200, 300, 530, 630];
var yCoordinateKeys = [100, 230, 170, 70];
var questionLock,questionLocks = [], answerKeys = [];
var questions = [];
var answers = [];
var stop = true;
var startTime;

MathGame.Game.prototype = {
  create: function() {
    
  	//set world dimensions
    //this.game.world.setBounds(0, 0, this.game.world.width, this.game.world.h);
    var image = this.game.add.image(0, 0, "bk");
image.width = this.game.width;
image.height = this.game.height;
this.startTime = this.game.time.time;
    //background
    //this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
 //this.game.stage.backgroundColor = 0x33CAFF;
    music = this.game.add.audio('boden');
    claps = this.game.add.audio('clapping');

    music.play();
    stop = false;
    console.log('create')

    fxf = this.game.add.audio('sfx_error');
    fxf.allowMultiple = false;
    fxf.addMarker('curse', 4, 2.9);

    fxt = this.game.add.audio('sfx_true');
    fxt.allowMultiple = false;
    fxt.addMarker('ping', 10, 11);
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  this.initialisingQuestions();

    var style = { font: "32px Courier", fill: "#00ff44" };

//  Create a Group that will sit above the background image
    group1 = this.game.add.group();

    //  Create a Group that will sit above Group 1
    group2 = this.game.add.group();

 //  Now let's create some random sprites and enable them all for drag and 'bring to top'
    for (var i = 1; i <= 4; i++)
    {
        var tempSprite = this.game.add.sprite(xCoordinateLocks[i-1], yCoordinateLocks[i-1], 'atari1');
console.log(xCoordinateLocks[i-1])
        tempSprite.name = 'spriteLock' + i;
        tempSprite.scale.setTo(0.5, 0.5);
        tempSprite.inputEnabled = true;
        var styleLock = { font: "12px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: tempSprite.width, align: "center"};

        questionLock = this.game.add.text(xCoordinateLocks[i-1]+38, yCoordinateLocks[i-1]+24, questions[i-1], styleLock);
        questionLock.anchor.set(0.3);
        questionLocks[i-1] = questionLock;
        tempSprite.input.disableDrag();

        group1.add(tempSprite);

        //  Sonics

        var tempSprite=this.game.add.sprite(xCoordinateKeys[i-1], yCoordinateKeys[i-1], 'atari2');

        tempSprite.name = 'spriteKey' + i;
        tempSprite.id = 'key'+ i;
        tempSprite.scale.setTo(0.5, 0.5);
        tempSprite.inputEnabled = true;
        var styleKey = { font: "15px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: tempSprite.width, align: "center"};
        var answerKey = this.game.add.text(xCoordinateKeys[i-1]+65, yCoordinateKeys[i-1]+25, answers[i-1], styleKey);
        answerKey.anchor.set(0.2);
        answerKeys[i-1] = answerKey;
        tempSprite.input.enableDrag();
        tempSprite.events.onDragUpdate.add(this.dragUpdate,this);
        tempSprite.events.onDragStop.add(this.dragStop, this);
        
        group2.add(tempSprite);
    }



    text = this.game.add.text(16, 16, 'Match each key with its answer.', { fill: '#ffffff' });
    timer = this.game.add.text(this.game.world.width/1.25, 16, 'Timer', { fill: '#ffffff' });
    score = this.game.add.text(10, 570, 'Score:'+' '+crntScore, { fill: '#ffffff' });
    life = this.game.add.text(10, 600, 'Lives Left: 3' , { fill: '#ffffff' });
  },
  update: function() {
       if(!stop)
        this.countDownTimer();

    this.updateData();
  },
  updateData: function() {    
    score.text = 'Score:'+' '+crntScore;
    life.text = 'Life Left:'+' '+lifeLeft;
    //pass it the score as a parameter 
    //this.game.state.start('MainMenu', true, false, this.playerScore);
  },
 initialisingQuestions:function() {
    // body...
    this.randomKeyCoordinates();

    var operator = Math.floor((Math.random() * 4) + 1);
    switch(operator){
    case 1:
    for(var i=0; i<4; i++){
        var operand1 = Math.floor((Math.random() * 10) + 1);
        var operand2 = Math.floor((Math.random() * 10) + 1);

        questions[i] = operand1.toString()+"+"+operand2.toString();
        answers[i] = operand1+operand2;
       }
       break;

    case 2:
    for(var i=0; i<4; i++){
        var operand1 = Math.floor((Math.random() * (10-6)) + 6);
        var operand2 = Math.floor((Math.random() * 5) + 1);

        questions[i] = operand1.toString()+"/"+operand2.toString();
        var rounded = Math.round( (operand1/operand2) * 10 ) / 10;
        answers[i] = rounded ;
       }
    break;

    case 3:
    for(var i=0; i<4; i++){
        var operand1 = Math.floor((Math.random() * 10) + 1);
        var operand2 = Math.floor((Math.random() * 10) + 1);

        questions[i] = operand1.toString()+"*"+operand2.toString();
        answers[i] = operand1*operand2;
       }
    break;

    case 4:
    for(var i=0; i<4; i++){
        var operand1 = Math.floor((Math.random() * (10-6)) + 6);
        var operand2 = Math.floor((Math.random() * 5) + 1);

        questions[i] = operand1.toString()+"-"+operand2.toString();
        answers[i] = operand1-operand2;
       }
    break;
    }
},

 randomKeyCoordinates:function() {

console.log(this.game.world.width,this.game.world.height)
   xCoordinateLocks[0] = (this.game.world.width)/(800/50);
   xCoordinateLocks[1] = (this.game.world.width)/(800/200);
   xCoordinateLocks[2] = (this.game.world.width)/(800/400);
   xCoordinateLocks[3] = (this.game.world.width)/(800/450);

   yCoordinateLocks[0] = (this.game.world.height)/(600/250);
   yCoordinateLocks[1] = (this.game.world.height)/(600/330);
   yCoordinateLocks[2] = (this.game.world.height)/(600/100);
   yCoordinateLocks[3] = (this.game.world.height)/(600/250);
 
    xCoordinateKeys[0] = (this.game.world.width)/(800/200);
    xCoordinateKeys[1] = (this.game.world.width)/(800/300);
   xCoordinateKeys[2] = (this.game.world.width)/(800/530);
   xCoordinateKeys[3] = (this.game.world.width)/(800/600);

   yCoordinateKeys[0] = (this.game.world.height)/(600/100);
   yCoordinateKeys[1] = (this.game.world.height)/(600/200);
   yCoordinateKeys[2] = (this.game.world.height)/(600/170);
   yCoordinateKeys[3] = (this.game.world.height)/(600/70);

    console.log(xCoordinateLocks[0],xCoordinateLocks[1])

    var random = Math.floor((Math.random() * 4) + 1);
    switch(random){
    case 1:
     var xCoordinateKey = [xCoordinateKeys[0], xCoordinateKeys[1], xCoordinateKeys[2], xCoordinateKeys[3]];
     var yCoordinateKey = [yCoordinateKeys[0], yCoordinateKeys[1], yCoordinateKeys[2], yCoordinateKeys[3]];
    for(var i=0; i<4; i++){
        xCoordinateKeys[i] = xCoordinateKey[i];
        yCoordinateKeys[i] = yCoordinateKey[i];
     }
     break;

     case 2:
     var xCoordinateKey = [xCoordinateKeys[2], xCoordinateKeys[1], xCoordinateKeys[0], xCoordinateKeys[3]];
     var yCoordinateKey = [yCoordinateKeys[2], yCoordinateKeys[0], yCoordinateKeys[1], yCoordinateKeys[3]];
     for(var i=0; i<4; i++){
        xCoordinateKeys[i] = xCoordinateKey[i];
        yCoordinateKeys[i] = yCoordinateKey[i];
     }
     break;

     case 3:
     var xCoordinateKey = [xCoordinateKeys[0], xCoordinateKeys[3], xCoordinateKeys[2], xCoordinateKeys[1]];
     var yCoordinateKey = [yCoordinateKeys[0], yCoordinateKeys[3], yCoordinateKeys[2], yCoordinateKeys[1]];
     for(var i=0; i<4; i++){
        xCoordinateKeys[i] = xCoordinateKey[i];
        yCoordinateKeys[i] = yCoordinateKey[i];
     }
     break;

     case 4:
     var xCoordinateKey = [xCoordinateKeys[1], xCoordinateKeys[2], xCoordinateKeys[0], xCoordinateKeys[3]];
     var yCoordinateKey = [yCoordinateKeys[1], yCoordinateKeys[2], yCoordinateKeys[0], yCoordinateKeys[3]];
     for(var i=0; i<4; i++){
        xCoordinateKeys[i] = xCoordinateKey[i];
        yCoordinateKeys[i] = yCoordinateKey[i];
     }
    break;
    } 
},
 dragUpdate:function(sprite,pointer) {
  console.log("drag update")
     switch (sprite.id)
            {
               case 'key1':
                answerKeys[0].x = Math.floor(sprite.x)+65;
                answerKeys[0].y = Math.floor(sprite.y)+25;
               break;
               case 'key2':
                answerKeys[1].x = Math.floor(sprite.x)+65;
                answerKeys[1].y = Math.floor(sprite.y)+25;
               break;
               case 'key3':
                answerKeys[2].x = Math.floor(sprite.x)+65;
                answerKeys[2].y = Math.floor(sprite.y)+25;
               break;
               case 'key4':
                answerKeys[3].x = Math.floor(sprite.x)+65;
                answerKeys[3].y = Math.floor(sprite.y)+25;
               break;
           }
},

 dragStart:function(sprite,pointer) {
     console.log("drag sttt")
},

countDownTimer:function() {
    this.runningTime = this.game.time.time - this.startTime;
    seconds = Math.floor(this.runningTime / 1000) % 60;
     var countDownSec=30 - seconds;

    if (countDownSec <= 0) 
        {
        timer.text='Time is up!';
        music.stop();
    } else {
       timer.text= 'Time Left :' +' '+countDownSec;
    }
 
},
checkOverlap:function(spr) {
    var keyArrives = this.game.add.tween(spr);
  switch (spr.id){
              case 'key1': console.log("key1");
               var boundsA = group1.children[0].getBounds();
               var boundsB = spr.getBounds();
                var result = Phaser.Rectangle.intersects(boundsA, boundsB);
                if(result){
                    fxt.play('ping');
                    crntScore = crntScore + 10;
                    
                    group1.children[0].loadTexture('atari3', 0, false);
 
    
    keyArrives.to({y:0}, 1000, Phaser.Easing.Out);
    keyArrives.start();
keyArrives.onComplete.add(tweenKeyUp, this);
questionLocks[0].destroy();

function tweenKeyUp () {
    spr.kill();

}
answerKeys[0].destroy();

                    
                    if(crntScore == 40)
                        this.level1Done();
                } else
                {
                    if(this.dragOverLocks(spr)){
                        this.game.camera.shake(0.01, 150);
                        fxf.play('curse');                                 
                        lifeLeft = lifeLeft - 1;
                    }
                   // life.text = 'Life Left:'+' '+lifeLeft;
                    spr.position.x=xCoordinateKeys[0];
                    spr.position.y=yCoordinateKeys[0];
                    answerKeys[0].x = xCoordinateKeys[0]+65;
                    answerKeys[0].y = yCoordinateKeys[0]+25;
                }
               return result;
               break;
            
               case 'key2': console.log("key2");
               var boundsA = group1.children[1].getBounds();
                var boundsB = spr.getBounds();
                var result = Phaser.Rectangle.intersects(boundsA, boundsB);
                if(result){
                    fxt.play('ping');
                    crntScore = crntScore + 10;
                   // score.text = 'Score:'+' '+crntScore;
                    group1.children[1].loadTexture('atari3', 0, false);

                        keyArrives.to({y:0}, 1000, Phaser.Easing.Out);
    keyArrives.start();
keyArrives.onComplete.add(tweenKeyUp, this);
questionLocks[1].destroy();

function tweenKeyUp () {
    spr.kill();
    
}

function upadateTextCoordinates(sprite){

         answerKeys[0].x = Math.floor(sprite.x)+65;
         answerKeys[0].y = Math.floor(sprite.y)+25;
}
answerKeys[1].destroy();
                    
                    if(crntScore == 40)
                        this.level1Done();
                } else
                {
                    if(this.dragOverLocks(spr)){
                        this.game.camera.shake(0.01, 150);
                        fxf.play('curse');
                        lifeLeft = lifeLeft - 1;
                }
                    //life.text = 'Life Left:'+' '+lifeLeft;
                    spr.position.x=xCoordinateKeys[1];
                    spr.position.y=yCoordinateKeys[1];
                    answerKeys[1].x = xCoordinateKeys[1]+65;
                    answerKeys[1].y = yCoordinateKeys[1]+25;
                }
                return result;
               break;
            
               case 'key3': console.log("key3");
               var boundsA = group1.children[2].getBounds();
                var boundsB = spr.getBounds();
                var result = Phaser.Rectangle.intersects(boundsA, boundsB);
                if(result){
                    fxt.play('ping');
                    crntScore = crntScore + 10;
                   // score.text = 'Score:'+' '+crntScore;
                    group1.children[2].loadTexture('atari3', 0, false);
                        keyArrives.to({y:0}, 1000, Phaser.Easing.Out);
    keyArrives.start();
keyArrives.onComplete.add(tweenKeyUp, this);
questionLocks[2].destroy();

function tweenKeyUp () {
    spr.kill();
    
}
 answerKeys[2].destroy();                   
                    if(crntScore == 40)
                        this.level1Done();
                } else
                {
                if(this.dragOverLocks(spr)){
                    this.game.camera.shake(0.01, 150);
                    fxf.play('curse');
                    lifeLeft = lifeLeft - 1;
                }
                   // life.text = 'Life Left:'+' '+lifeLeft;
                    spr.position.x=xCoordinateKeys[2];
                    spr.position.y=yCoordinateKeys[2];
                    answerKeys[2].x = xCoordinateKeys[2]+65;
                    answerKeys[2].y = yCoordinateKeys[2]+25;
                }
                return result;
               break;
            
               case 'key4': console.log("key4");
               var boundsA = group1.children[3].getBounds();
               var boundsB = spr.getBounds();
               var result = Phaser.Rectangle.intersects(boundsA, boundsB);
               if(result){
                    fxt.play('ping');
                    crntScore = crntScore + 10;
                    //score.text = 'Score:'+' '+crntScore;
                    group1.children[3].loadTexture('atari3', 0, false);
                        keyArrives.to({y:0}, 1000, Phaser.Easing.Out);
    keyArrives.start();
keyArrives.onComplete.add(tweenKeyUp, this);
questionLocks[3].destroy();

function tweenKeyUp () {
    spr.kill();
    
}
 answerKeys[3].destroy();                   
                    if(crntScore == 40)
                        this.level1Done();
                } else
                {
                if(this.dragOverLocks(spr)){
                    this.game.camera.shake(0.01, 150);
                    fxf.play('curse');
                    lifeLeft = lifeLeft - 1;
                }
                    //life.text = 'Life Left:'+' '+lifeLeft;
                    spr.position.x=xCoordinateKeys[3];
                    spr.position.y=yCoordinateKeys[3];
                    answerKeys[3].x = xCoordinateKeys[3]+65;
                    answerKeys[3].y = yCoordinateKeys[3]+25;
                }
               return result;
               break;      
  }

},
     level1Done:function() {
        // body...
        for(i = 0; i<group1.length; i++){
            group1.children[i].kill();
            group2.children[i].kill();
            answerKeys[i].destroy();
            questionLocks[i].destroy();
        }
        music.pause();
        claps.play();
        //music.resume();

        this.state.start('Level2');
    },
         dragOverLocks:function(spr) {
        // body...
        var result;
        for(i = 0; i<4; i++){
            var boundsA = spr.getBounds();
               var boundsB = group1.children[i].getBounds();
                 result = Phaser.Rectangle.intersects(boundsA, boundsB);
                 //console.log(result);
                 if(result)
                    return result;
        }
        return result;
    },
     dragStop:function(spr, pointer) {
  console.log("sprite1,sprite2")
  if (this.checkOverlap(spr))
    {
       // text.text = 'Drag the sprites. Overlapping: true';
       text.text = 'Match found';
    }
    else
    {
        //text.text = 'Drag the sprites. Overlapping: false';
        text.text = 'Match not found';
    }

}
  
};
