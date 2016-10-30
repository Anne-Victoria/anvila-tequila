var Menu = {
    preload : function() {
        game.load.spritesheet('start-button', 'assets/start-button-sheet.png', 200, 100);
    },
    create: function () {

        startButton = this.add.button(game.world.centerX - 100, 200, 'start-button', this.startGame, this, 0, 0, 1);

    },

    update: function () {
        // press left, right, spacebar or enter to start game
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)
            || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
            || game.input.keyboard.isDown(Phaser.Keyboard.ENTER)
            || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.startGame();
        }
    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};