gameObj.Game = function(game) {
    // Game Timer
    var myTime;
    var gameSeconds; // Total game seconds
    var timerSeconds;
    var secondsLeft; // Total game seconds - Current timer seconds
    
    var myPoints;
    var currentScore;
    
    var torch;
    var character;
    var mask;
    var move;
    var cell;
    var cells;

};

gameObj.Game.prototype = {
    
	create: function() {
		console.log("State - Game");
		//Add background image
//		var myLogo = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
//		myLogo.anchor.setTo(0.5, 0.5);

		//Add list graphics
		var background = this.add.sprite(0, 0, 'bg');
        
        cell = this.add.sprite(-110, 0, 'sideWall');
        cell = this.add.sprite(690, 0, 'sideWall');
        
		var leftWall = this.add.sprite(40, 29, 'time');
		var rightWall = this.add.sprite(this.world.width - 175, 35, 'score');

        
		/*cell = this.add.sprite(300, 100, 'wall');
        cell = this.add.sprite(400, 100, 'wall');
		cell = this.add.sprite(100, 200, 'wall');
        cell = this.add.sprite(200, 200, 'wall');
        cell = this.add.sprite(300, 200, 'wall');
        cell = this.add.sprite(300, 300, 'wall');
        
        cell = this.add.sprite(300, 500, 'wall');
        cell = this.add.sprite(400, 500, 'wall');
        cell = this.add.sprite(500, 500, 'wall');
        
        cell = this.add.sprite(100, 600, 'wall');
        cell = this.add.sprite(200, 700, 'wall');
        cell = this.add.sprite(300, 700, 'wall');*/
        
    cells = this.add.group();
    cells.enableBody = true;
    cells.physicsBodyType = Phaser.Physics.ARCADE;
    
    
        // Holds wall coordinates (x 100)
        var placex = [3, 4, 1, 2, 3, 3, 3, 4, 5, 1, 2, 3];
        var placey = [1, 1, 2, 2, 2, 3, 5, 5, 5, 6, 7, 7];
        
        for (var i = 0; i < 12; i++) {
            cell = cells.create(placex[i] * 100, placey[i] * 100, 'wall');
            cell.name = 'cell' + i;
            cell.body.immovable = true;
            
            /*vCount.name = 'wall';
            this.physics.enable(vCount, Phaser.Physics.ARCADE);
            vCount.body.collideWorldBounds = true;
            vCount.body.immovable = true;*/
            console.log("what is" + cell.name);
        }
        
        
        //Player
        snake = this.add.sprite(500, 410, 'gameSnake');
        
        character = this.add.sprite(300, 610, 'gameCharacter');
        this.physics.enable([character, cell], Phaser.Physics.ARCADE);
        character.anchor.setTo(0.5);
        
        torch = this.add.sprite(400, 410, 'gameTorch');
        this.physics.enable(torch, Phaser.Physics.ARCADE);
        torch.anchor.setTo(0.5);
    
        



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
        tmpButtonBg = this.add.sprite(this.world.centerX, 0, 'btn_bg');
        tmpButtonBg.anchor.setTo(0.5, 0);
        
		tmpWinnerBtn = this.add.button(this.world.centerX - 60, 20, 'btn_winner', this.winnerFun, this, 1, 0, 2);
		tmpWinnerBtn.anchor.setTo(1, 0.5);
		
		tmpLoserBtn = this.add.button(this.world.centerX, 20, 'btn_loser', this.loserFun, this, 1, 0, 2);
		tmpLoserBtn.anchor.setTo(0.5, 0.5);
        
        tmpPointBtn = this.add.button(this.world.centerX + 60, 20, 'btn_point', this.addPoint, this, 1, 0, 2);
		tmpPointBtn.anchor.setTo(0, 0.5);
        
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
    update: function() {    
    
    // Hide cursor only on this screen (flame is cursor)
    this.game.canvas.style.cursor = "none";
        
    this.physics.arcade.collide(cells, character);
    cells.imovable = true;
    
    // Move torch quickly to mouse position
    if (Phaser.Rectangle.contains(torch.body, this.input.x, this.input.y))
    {
        torch.body.velocity.setTo(0, 0);
    }
    else 
    {
        this.physics.arcade.moveToPointer(torch, 1000);
    }    
        
    //  Move character slowly to mouse position only on mousedown
    if (this.input.mousePointer.isDown)
    {
        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(character.body, this.input.x, this.input.y))
        {
            character.body.velocity.setTo(0, 0);
        }
        else 
        {
            //  400 is the speed it will move towards the mouse
            this.physics.arcade.moveToPointer(character, 200);
            character.rotation = this.physics.arcade.angleToPointer(character);
        }
    }
    else
    {
        character.body.velocity.setTo(0, 0);
    }
        
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
	},
    

};



