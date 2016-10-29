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

		// create clock-group
    	clock = game.add.group();

    	// enable physics for any object that is created in this group
    	clock.enableBody = true;

    	// enable collision with world fot any object created in this group
    	clock.collideWorldBounds = true;

	    // create tiles for clock-outline
	    var tile = clock.create(375, 25, 'kachel');
	    tile.scale.setTo(0.5, 0.5);
	    tile.body.immovable = true;

	    tile = clock.create(125, 275, 'kachel');
	    tile.scale.setTo(0.5, 0.5);
	    tile.body.immovable = true;

	    tile = clock.create(375, 525, 'kachel');
	    tile.scale.setTo(0.5, 0.5);
	    tile.body.immovable = true;

	    tile = clock.create(625, 275, 'kachel');
	    tile.scale.setTo(0.5, 0.5);
	    tile.body.immovable = true;

	    x = 325;
	    y = 25;
	    for (i = 0; i < 5; i++) { 
   			tile = clock.create(x, y, 'kachel');
	   		tile.scale.setTo(0.5, 0.5);
	    	tile.body.immovable = true;
	    	x = x - 50;
	    	y = y + 50;
		}

		x = 425;
		y = 25;

		for (i = 0; i < 5; i++) { 
   			tile = clock.create(x, y, 'kachel');
	   		tile.scale.setTo(0.5, 0.5);
	    	tile.body.immovable = true;
	    	x = x + 50;
	    	y = y + 50;
		}

		x = 125;
		y = 325;

		for (i = 0; i < 5; i++) { 
   			tile = clock.create(x, y, 'kachel');
	   		tile.scale.setTo(0.5, 0.5);
	    	tile.body.immovable = true;
	    	x = x + 50;
	    	y = y + 50;
		}

		x = 425;
		y = 525;

		for (i = 0; i < 5; i++) { 
   			tile = clock.create(x, y, 'kachel');
	   		tile.scale.setTo(0.5, 0.5);
	    	tile.body.immovable = true;
	    	x = x + 50;
	    	y = y - 50;
		}

		// create group for hande
		hand = game.add.group();

		//enable physics for every object created in group
		hand.physicsBodyType = Phaser.Physics.ARCADE;
    	hand.enableBody = true;

    	//create and align handparts
	    x = 400;
		y = 300;

		for (i = 0; i < 13; i++) { 
   			var handpart = hand.create(x, y, 'kachel');
	   		handpart.scale.setTo(0.1, 0.1);
	   		handpart.checkWorldBounds = true;
	   		handpart.body.velocity.set(100, 100);
	   		handpart.collideWorldBounds = true;
	   		handpart.body.bounce.set(1.01);
	   		handpart.body.gravity.set(0, 180);
	    	x = x + 10;
	    	y = y - 10;
		}

		// add player
	    player = game.add.sprite(380, 280, 'dot');

	    // enable physics for player
	    game.physics.arcade.enable(player);

	    player.body.bounce.y = 0.2;
	    player.body.gravity.set(0, 0);
	    player.checkWorldBounds = true;
	    player.body.collideWorldBounds = true;

	    // starting point for player 2
	    currentAngle = 0;
	    var startX = this.calculateX(400, 150, currentAngle);
	    var startY = this.calculateY(300, 150, currentAngle);

	    // player 2 generation
	    player2 = game.add.sprite(startX, startY, 'dot');
	    game.physics.arcade.enable(player2);
	    player2.anchor.setTo(0.5);

///////////////////////////////////////////////////
	    cursors = game.input.keyboard.createCursorKeys();

	    //create onCollide-Signal
	    player.body.onCollide = new Phaser.Signal();

	    //create function to be colled on collision
    	player.body.onCollide.add(this.collision, this);
	},

	// on collision remove handpart
	collision: function(sprite, handpart) {
		hand.remove(handpart);
//////////////////////////////////////////////////////////
	},

	update: function() {

		//declare collisions
	    game.physics.arcade.collide(player, clock);
	    game.physics.arcade.collide(player, hand);
	    game.physics.arcade.collide(clock, hand);
    
    	//set player velocity to 0
    	player.body.velocity.x = 0;

		if (cursors.left.isDown)
	    {
	        // Move to the left
	        player.body.x -= 4;
	    }
	    else if (cursors.right.isDown)
	    {
	        // Move to the right
	        player.body.x += 4;
	    }
	    else if (cursors.up.isDown)
	    {
	    	// Move up
	    	player.body.y -= 4; 
	    }
	    else if (cursors.down.isDown)
	    {
	    	// Move down
	    	player.body.y += 4;
	    }
	    else
	    {
	        //  Stand still
	        player.frame = 4;
	    }


	    // update the position of player 3 on the circle
	  	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	  		currentAngle += 0.1;
	  	}
	  	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	  		currentAngle -= 0.1;
	  	}
	  	player2.x = this.calculateX(400, 150, currentAngle);
	  	player2.y = this.calculateY(300, 150, currentAngle);

	},

	// calculate x and y position on screen for positions on a circle
	calculateX: function (centerX, radius, angle) {
		return (centerX + radius * Math.cos(angle));
	},

	calculateY: function (centerY, radius, angle) {
		return (centerY + radius * Math.sin(angle));
	}



};