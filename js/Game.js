gameObj.Game = function(game) {
    // Game Timer
    var myTime;
    var gameSeconds; // Total game seconds
    var timerSeconds;
    var secondsLeft; // Total game seconds - Current timer seconds
    
    var myPoints;
    var currentScore;
};

gameObj.Game.prototype = {
	create: function() {
		console.log("State - Game");
		//Add background image
//		var myLogo = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
//		myLogo.anchor.setTo(0.5, 0.5);

		//Add list graphics
		var cell = this.add.sprite(0, 0, 'bg');
        
		var cell = this.add.sprite(-100, 0, 'sideWall');
        var cell = this.add.sprite(680, 0, 'sideWall');
        
		var leftWall = this.add.sprite(40, 29, 'time');
		var rightWall = this.add.sprite(this.world.width - 175, 35, 'score');


		var cell = this.add.sprite(300, 100, 'wall');
		var cell = this.add.sprite(400, 100, 'wall');
		var cell = this.add.sprite(100, 200, 'wall');
        var cell = this.add.sprite(200, 200, 'wall');
        var cell = this.add.sprite(300, 200, 'wall');
        var cell = this.add.sprite(300, 300, 'wall');
        
        var cell = this.add.sprite(300, 500, 'wall');
        var cell = this.add.sprite(400, 500, 'wall');
        var cell = this.add.sprite(500, 500, 'wall');
        
        var cell = this.add.sprite(100, 600, 'wall');
        var cell = this.add.sprite(200, 700, 'wall');
        var cell = this.add.sprite(300, 700, 'wall');
        
        //Player
        var cell = this.add.sprite(300, 610, 'gameCharacter');
        var cell = this.add.sprite(500, 410, 'gameSnake');
        var cell = this.add.sprite(400, 410, 'gameTorch');

		//Add text
		var points = "0";
		var time = "2:00";

		var myStyle = {
			width: "150px",
			font: "35px Freckle Face",
			fill: "black",
			align: "left"
		};

		myPoints = this.add.text(this.world.width - 165, 59, points, myStyle);
        myTime = this.add.text(85, 59, time, myStyle);
		
		// Add button
		// The numbers given in parameters are the indexes of the frames, in this order: over, out, down
		tmpWinnerBtn = this.add.button(100, 200, 'btn_winner', this.winnerFun, this, 1, 0, 2);
		tmpWinnerBtn.anchor.setTo(0.5, 0.5);
		
		tmpLoserBtn = this.add.button(200, 200, 'btn_loser', this.loserFun, this, 1, 0, 2);
		tmpLoserBtn.anchor.setTo(0.5, 0.5);
        
        tmpPointBtn = this.add.button(300, 200, 'btn_point', this.addPoint, this, 1, 0, 2);
		tmpPointBtn.anchor.setTo(0.5, 0.5);
        
        currentScore = 0;
        
        gameSeconds = 120;
        timerSeconds = 0;
        secondsLeft = 0;
        // Create Timer Object
        timerObj = this.game.time.create(false);
        // Set a timer event to occur every 1 second
        timerObj.loop(1000, this.updateTimer, this);
        // Start the timer
        timerObj.start();
	},
    updateTimer: function() {
        //console.log("Timer Running");
        timerSeconds ++;
        
        secondsLeft = gameSeconds - timerSeconds;
        displayMin = Math.floor(secondsLeft/60) % 60;
        displaySec = Math.floor(secondsLeft) % 60;
        
        if (displayMin < 10){
            displayMin = "0" + displayMin;
        }
        if (displaySec < 10){
            displaySec = "0" + displaySec;
        }
        
        myTime.setText(displayMin + ":" + displaySec);
        if (displayMin == 0 && displaySec ==0) {
            this.game.state.start('Loser');
        }
    },
    addPoint: function() {
        console.log(currentScore);
        currentScore++
        myPoints.setText(currentScore);
    },
	winnerFun: function() {
		this.game.state.start('Winner');
	},
	loserFun: function() {
		this.game.state.start('Loser');
	}
};