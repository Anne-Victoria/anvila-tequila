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
	},

	update: function() {
	    game.physics.arcade.collide(player, clock);
	    game.physics.arcade.collide(player, platform);

	    platform.angle +=1;
	}

};