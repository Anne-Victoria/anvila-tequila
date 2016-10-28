var Menu = {

    preload : function() {
        game.load.image('smiley', '../assets/smiley.png');
    },

    create: function () {

        this.add.button(0, 0, 'smiley', this.startGame, this);

    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};