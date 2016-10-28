var Game = {
	preload : function() {

	},

	create : function() {
	    game.stage.backgroundColor = "#ffffff";


	    var graphics = game.add.graphics(0, 0);


	    graphics.lineStyle(10, 0x000000, 0.8);

	    graphics.drawCircle(400, 300, 500);
	    graphics.endFill();

	    graphics.beginFill(0x000000);
	    graphics.drawCircle(400,300,10);
	    graphics.endFill();
	},

	update : function() {
	}
};