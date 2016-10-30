var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('Menu', Menu);

game.state.add('Game', Game);

game.state.add('Level2', Level2);

game.state.start('Menu');