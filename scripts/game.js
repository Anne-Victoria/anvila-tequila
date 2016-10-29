var Game = {

	preload : function() {
		game.load.image('dot','assets/dot.png');
		game.load.image('circle','assets/kreis.png');
		game.load.image('platform','assets/platform.png')
	},

	create : function() {
	    game.stage.backgroundColor = "#ffffff";

	    game.physics.startSystem(Phaser.Physics.NINJA);

//	    var graphics = game.add.graphics(0, 0);
		//  The platforms group contains the ground and the 2 ledges we can jump on
    	clock = game.add.group();

//    	graphics.beginFill(0xFF0000, 1);
//    	graphics.drawCircle(300, 300, 100);

    	//  We will enable physics for any object that is created in this group
    	clock.enableBody = true;

    	clock.collideWorldBounds = true;

//	 	var outline = clock.create(0, 0, 'circle');
//    	outline.body.immovable = true;
		
		circle = new Phaser.Circle(400, 300, 300);
		circle2 = new Phaser.Circle(400, 300, 30);

		var graphics = game.add.graphics(0, 0);
    	graphics.lineStyle(3, 0x000000, 1);
    	graphics.drawCircle(circle.x, circle.y, circle.diameter);

    	graphics.beginFill(0x000000, 1);
    	graphics.drawCircle(circle2.x, circle2.y, circle2.diameter);
    	graphics.endFill();

    	platform = game.add.sprite(400, 300, 'platform');

    	game.physics.arcade.enable(platform);

    	platform.body.collideWorldBounds = true;

    	platform.scale.setTo(0.5, 0.2);
    	platform.anchor.setTo(-0.01, 0.5);

	    player = game.add.sprite(450, 400, 'dot');

	    game.physics.arcade.enable(player);

	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 300;
	    player.body.collideWorldBounds = true;

	    // starting point for player 2
	    currentAngle = 0;
	    var startX = this.calculateX(400, 150, currentAngle);
	    var startY = this.calculateY(300, 150, currentAngle);

	    // player 2 generation
	    player2 = game.add.sprite(startX, startY, 'dot');
	    game.physics.arcade.enable(player2);
	    player2.anchor.setTo(0.5);
	},

	update: function() {
	    game.physics.arcade.collide(player, clock);
	    game.physics.arcade.collide(player, platform);

	    // update the position of player 3 on the circle
	  	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	  		currentAngle += 0.1;
	  	}
	  	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	  		currentAngle -= 0.1;
	  	}
	  	player2.x = this.calculateX(400, 150, currentAngle);
	  	player2.y = this.calculateY(300, 150, currentAngle);

	  	// move clock hand
	  	platform.angle +=1;

	},

	// calculate x and y position on screen for positions on a circle
	calculateX: function (centerX, radius, angle) {
		return (centerX + radius * Math.cos(angle));
	},

	calculateY: function (centerY, radius, angle) {
		return (centerY + radius * Math.sin(angle));
	}



};