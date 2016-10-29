var Game = {

	preload : function() {
		game.load.image('kachel','assets/kachel.png');
		game.load.image('dot','assets/dot.png');
		game.load.image('circle','assets/kreis.png');
		game.load.image('platform','assets/platform.png');
	},

	create : function() {

		//add backgound color
	    game.stage.backgroundColor = "#ffffff";

	    game.physics.startSystem(Phaser.Physics.NINJA);

	    // create circle
	    var graphics = game.add.graphics(0, 0);
	    graphics.lineStyle(3, 0x000000, 1);
	    graphics.drawCircle(400, 300, 300);

		// create group for block
		block = game.add.group();

		//enable physics for every object created in group
		block.physicsBodyType = Phaser.Physics.ARCADE;
    	block.enableBody = true;

    	//create and align blockparts
	    x = 400;
		y = 300;

		for (i = 0; i < 13; i++) { 
   			var blockpart = block.create(x, y, 'kachel');
	   		blockpart.scale.setTo(0.1, 0.1);
	   		blockpart.checkWorldBounds = true;
	   		blockpart.body.velocity.set(100, 100);
	   		blockpart.collideWorldBounds = true;
	   		blockpart.body.bounce.set(1.01);
	   		blockpart.body.gravity.set(0, 180);
	    	x = x + 10;
	    	y = y - 10;
		}


	    // starting point for player 2
	    currentAngle = 0;
	    var startX = this.calculateX(400, 150, currentAngle);
	    var startY = this.calculateY(300, 150, currentAngle);

	    // player 2 generation
	    player = game.add.sprite(startX, startY, 'dot');
	    game.physics.arcade.enable(player);
	    player.anchor.setTo(0.5);

	    // player.body.bounce.y = 0.2;
	    // player.body.gravity.set(0, 0);
	    // player.checkWorldBounds = true;
	    // player.body.collideWorldBounds = true;

	    //create onCollide-Signal
	    player.body.onCollide = new Phaser.Signal();

	    //create function to be colled on collision
    	player.body.onCollide.add(this.collision, this);
	},

	// on collision remove blockpart
	collision: function(sprite, blockpart) {
		block.remove(blockpart);
	},

	update: function() {

		//declare collisions
	    game.physics.arcade.collide(player, block);

	    // update the position of player 2 on the circle
	  	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	  		currentAngle += 0.1;
	  	}
	  	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	  		currentAngle -= 0.1;
	  	}
	  	player.x = this.calculateX(400, 150, currentAngle);
	  	player.y = this.calculateY(300, 150, currentAngle);

	},

	// calculate x and y position on screen for positions on a circle
	calculateX: function (centerX, radius, angle) {
		return (centerX + radius * Math.cos(angle));
	},

	calculateY: function (centerY, radius, angle) {
		return (centerY + radius * Math.sin(angle));
	}



};