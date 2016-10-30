var Menu = {


    preload : function() {
        game.load.spritesheet('start-button', 'assets/start-button-sheet.png', 200, 100);
    },
    create: function () {

        //add background color
        game.stage.backgroundColor = "#1e2633";

        //startButton = this.add.button(game.world.centerX - 100, 200, 'start-button', this.startGame, this, 0, 0, 1);

        titleText = game.add.text(75, 50, 'Spooky McSpookface', { fontSize: '50px', fill: '#ff0044' });
        text2 = game.add.text(75, 150, 'Help Spooky McSpookface catch', { fontSize: '30px', fill: '#ffffff' });
        text2 = game.add.text(85, 200, 'the spooky candy', { fontSize: '30px', fill: '#ffffff' });
        text3 = game.add.text(75, 300, 'Movement keys:  ← and →', { fontSize: '30px', fill: '#ffffff' });
        text1 = game.add.text(75, 350, 'Press ↲ to play', { fontSize: '30px', fill: '#ffffff' });
        //text4 = game.add.text(75, , '<- ->', { fontSize: '30px', fill: '#ffffff' });


    },

    update: function () {
        // press left, right, spacebar or enter to start game
        if (
            //game.input.keyboard.isDown(Phaser.Keyboard.LEFT)
            //|| game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
            //|| 
            game.input.keyboard.isDown(Phaser.Keyboard.ENTER)
            || game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.startGame();
        }
    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};