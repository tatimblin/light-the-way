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
        
        
        this.cell = this.add.tileSprite(-55, 0, 75, this.game.world.height,'wall');
        this.cell = this.add.tileSprite(this.game.world.width - 20, 0, 75, this.game.world.height,'wall');

        
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
        var placex = [3, 4, 1, 2, 3, 3, 6, 7, 8, 8, 3, 4, 5, 1, 2, 3, 7, 5, 6, 7, 6, 7];
        var placey = [1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 7, 7, 8, 9, 9, 9, 10, 10];
        
        for (var i = 0; i < placex.length; i++) {
            cell = cells.create(placex[i] * 75, placey[i] * 75, 'wall');
            cell.name = 'cell' + i;
            cell.body.immovable = true;
            
            /*vCount.name = 'wall';
            this.physics.enable(vCount, Phaser.Physics.ARCADE);
            vCount.body.collideWorldBounds = true;
            vCount.body.immovable = true;*/
            console.log("what is" + cell.name);
        }
        
        
// Snake and Character
        snake = this.add.sprite(500, 410, 'gameSnake');
        snake.anchor.setTo(0.5, 0.5);
        
        character = this.add.sprite(this.world.centerX, 230, 'gameCharacter');
        this.physics.enable([character, cell], Phaser.Physics.ARCADE);
        character.anchor.setTo(0.5);
        
            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.physics.arcade.enable([snake, character]);

            character.body.collideWorldBounds = true;
            snake.body.collideWorldBounds = true;
        
            snake.body.onCollide = new Phaser.Signal();
            snake.body.onCollide.add(this.loserFun, this);
        
// Coins
        coin = this.add.sprite(150 + 35, 300 + 35, 'gameCoin');
        coin.anchor.setTo(0.5, 0.5);
        coin.frame = 3;
        coin.animations.add('spinCoin', [0, 1, 2, 3], 4, true);
        coin.animations.play('spinCoin');
        
        this.physics.enable([coin, character], Phaser.Physics.ARCADE);
        
        coin.body.onCollide = new Phaser.Signal();
        coin.body.onCollide.add(this.collect, this);
        
        /*torch = this.add.sprite(400, 410, 'gameTorch');
        this.physics.enable(torch, Phaser.Physics.ARCADE);
        torch.anchor.setTo(0.5);*/
    
        
        // The radius of the circle of light
        this.LIGHT_RADIUS = 100;
        
        this.shadowTexture = this.game.add.bitmapData(this.game.world.width, this.game.world.height);    // Create an object that will use the bitmap as a texture
        this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);    // Set the blend mode to MULTIPLY. This will darken the colors of    // everything below this sprite.    
        this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
        
        // Simulate a pointer click/tap input at the center of the stage
        // when the example begins running.
        this.game.input.activePointer.x = this.game.width/2;
        this.game.input.activePointer.y = this.game.height/2;
        

        var leftWall = this.add.sprite(40, 29, 'time');
		var rightWall = this.add.sprite(this.world.width - 175, 35, 'score');
        

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
//    this.game.canvas.style.cursor = "none";
    
    console.log("Distance: " + this.physics.arcade.distanceToPointer(snake));
    if (this.physics.arcade.distanceToPointer(snake) < 100) {
        console.log("Stop it snake!");
        snake.body.velocity.x = 0;
    }
    
    // If snake is within range, move to character
    if (this.physics.arcade.distanceBetween(snake, character) < 150) {
        
        this.physics.arcade.moveToObject(snake, character, 200);
    }
        
    if (this.physics.arcade.distanceBetween(snake, Phaser.Point)  < 400) {
        console.log("The Distance isn't: " + this.physics.arcade.distanceBetween(snake, Phaser.Point));
        snake.body.velocity.x = 0;
        snake.body.velocity.y = 0;
    }
        
    //Call function on snake bite
    this.physics.arcade.collide(character, snake, this.loserFun, null, this);
    snake.imovable = true;
        
    //Call function to collect coins
    this.physics.arcade.collide(character, coin, this.collect, null, this);
    coin.imovable = true;
       
    //Make walls imovable
    this.physics.arcade.collide(cells, character);
    this.physics.arcade.collide(cells, snake);
    cells.imovable = true;
    
    /*
    Move torch quickly to mouse position
    if (Phaser.Rectangle.contains(torch.body, this.input.x, this.input.y))
    {
        torch.body.velocity.setTo(0, 0);
    }
    else 
    {
        this.physics.arcade.moveToPointer(torch, 1000);
    }   
    */
        
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
        
    this.updateShadowTexture();
        
},
    updateShadowTexture: function() {
        // Draw shadow
        this.shadowTexture.context.fillStyle = 'rgb(30, 30, 30)';
        this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

        // Draw circle of light
        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = 'rgb(170, 170, 170)';
        this.shadowTexture.context.arc(this.game.input.activePointer.x, this.game.input.activePointer.y,
            this.LIGHT_RADIUS, 0, Math.PI*2);
        this.shadowTexture.context.fill();

        // This just tells the engine it should update the texture cache
        this.shadowTexture.dirty = true;
},
    collect: function(character, coin) {
        console.log("COINS!");
        
        // Find a random number between 15 and 20 to be added to the score.
        var randomnumber = Math.floor(Math.random() * (20 - 15 + 1)) + 15;
        currentScore = currentScore + randomnumber;
        myPoints.setText(currentScore);
        //remove sprite
        coin.destroy();
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
            this.gameOver();
        }
    },
    addPoint: function() {
        console.log(currentScore);
        currentScore++
        myPoints.setText(currentScore);
    },
    gameOver: function() {
        if (currentScore > 13) {
            this.game.state.start('Winner');
        } else {
            this.game.state.start('Loser');
        }
    },
	winnerFun: function() {
        this.game.state.start('Winner');
	},
	loserFun: function() {
            console.log('YOU LOSE!');
            this.game.state.start('Loser');
	},

};



