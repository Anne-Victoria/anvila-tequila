var Menu = {
    preload : function() {
        game.load.spritesheet('start-button', 'assets/start-button-sheet.png', 200, 100);
    },
    create: function () {

        startButton = this.add.button(game.world.centerX - 100, 200, 'start-button', this.startGame, this, 0, 0, 1);

    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Level2');

    }

};