// Exercise 02: RNGolf
// Name:
// Date:

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config