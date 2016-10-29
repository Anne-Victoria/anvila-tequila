var Menu = {
    preload : function() {
        game.load.image('start-button', 'assets/start-button.png');
    },
    create: function () {

        startButton = this.add.button(game.world.centerX - 100, 200, 'start-button', this.startGame, this);

    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};