var Game = {

	preload : function() {
		game.load.image('kachel','assets/kachel.png');
		game.load.image('dot','assets/dot.png');
		game.load.image('circle','assets/kreis.png');
		game.load.image('platform','assets/platform.png');
		game.load.image('candy-red', 'assets/candy-red.png');
		game.load.image('candy-blue', 'assets/candy-blue.png');
		game.load.image('candy-green', 'assets/candy-green.png');
		game.load.image('candy-yellow', 'assets/candy-yellow.png');
	},

	create : function() {

		score = 0;
		counter = 0;
		blockNumber = 22;

		//add backgound color
	    game.stage.backgroundColor = "#ffffff";

	    text = game.add.text(300, 50, "Level 1" , { font: "65px Arial", fill: "#ff0044", align: "center" });

	    game.physics.startSystem(Phaser.Physics.NINJA);

	    // create circle
	    var graphics = game.add.graphics(0, 0);
	    graphics.lineStyle(3, 0x000000, 1);
	    graphics.drawCircle(400, 300, 300);

	    // starting point for player 2
	    currentAngle = 0;
	    var startX = this.calculateX(400, 150, currentAngle);
	    var startY = this.calculateY(300, 150, currentAngle);

	    // player 2 generation
	    player = game.add.sprite(startX, startY, 'dot');
	    game.physics.arcade.enable(player);
	    player.anchor.setTo(0.5);

	    // create group for block
		blocks = game.add.group();

		//enable physics for every object created in group
		blocks.physicsBodyType = Phaser.Physics.ARCADE;

    	blocks.enableBody = true;

	    // player.body.bounce.y = 0.2;
	    // player.body.gravity.set(0, 0);
	    // player.checkWorldBounds = true;
	    // player.body.collideWorldBounds = true;

	    game.time.events.repeat(Phaser.Timer.SECOND, blockNumber, this.createBlock, this);

	    //  The score
    	scoreText = game.add.text(650, 100, 'score: 0', { fontSize: '32px', fill: '#000000' });

	},

	createBlock: function() {
    	//create and align blockparts
	    x = 400;
		y = 300;

		// lazy workaround
		Zahl = ((Math.random() * 4) + 1);

		if ((1 <= Zahl) && (Zahl < 2)) {
			bonbon = 'candy-red';
		}
		else if ((2 <= Zahl) && (Zahl < 3)) {
			bonbon = 'candy-yellow';
		}
		else if ((3 <= Zahl) && (Zahl < 4)) {
			bonbon = 'candy-green';
		}
		else {
			bonbon = 'candy-blue';
		}

   			block = blocks.create(x, y, bonbon);
	   		block.scale.setTo(0.02, 0.02);
	   		block.checkWorldBounds = true;
	   		block.outOfBoundsKill = true;
	   		game.physics.arcade.moveToXY(block, (Math.random() * 800) + 1, (Math.random() * 600) + 1, 80, 0);
	   		counter += 1;

			this.ende();

	},

	update: function(block) {

		//declare collisions
	    game.physics.arcade.collide(player, blocks);

	    // update the position of player 2 on the circle
	  	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	  		currentAngle += 0.1;
	  	}
	  	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	  		currentAngle -= 0.1;
	  	}
	  	player.x = this.calculateX(400, 150, currentAngle);
	  	player.y = this.calculateY(300, 150, currentAngle);

	  	game.physics.arcade.overlap(player, blocks, this.collectBlock, null, this);
	},

	// calculate x and y position on screen for positions on a circle
	calculateX: function (centerX, radius, angle) {
		return (centerX + radius * Math.cos(angle));
	},

	calculateY: function (centerY, radius, angle) {
		return (centerY + radius * Math.sin(angle));
	},

	collectBlock: function (player, block) {
    
	    // Removes the star from the screen
	    block.kill();

	    //  Add and update the score
	    score += 1;
	    scoreText.text = 'Score: ' + score;
	},

	ende: function() {

		if (counter == blockNumber){
		  		console.log('ende');
				console.log((3/4)*(blockNumber - 1));
		  		if (score <= 1) {
		  		//(3/4)*(blockNumber-2)) {
					this.state.start('Menu');
		  		}
		  		else
		  		{
		  			this.state.start('Level2');
		  		};
		}
	}

};