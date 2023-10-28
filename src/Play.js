class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball','ball.png')
        this.load.image('wall','wall.png')
        this.load.image('oneway','one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup');
        this.cup.body.setCircle(this.cup.width / 4);
        this.cup.body.setOffset(this.cup.width / 4);        
        this.cup.body.setImmovable(true);

        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball');
        this.ball.body.setCircle(this.ball.width / 2);
        this.ball.body.setCollideWorldBounds(true);
        this.ball.body.setBounce(0.5);
        this.ball.body.setDamping(true).setDrag(0.5);

        //add walls
        let wallA = this.physics.add.sprite(0, height / 4, 'wall');
        wallA.setX(Phaser.Math.Between(wallA.width / 2, width - wallA.width / 2));
        wallA.setImmovable(true);

        this.wallB = this.physics.add.sprite(0, height / 2, 'wall');
        this.wallB.setX(Phaser.Math.Between(this.wallB.width / 2, width - this.wallB.width / 2));
        this.wallB.setImmovable(true);
        this.wallB.setVelocityX(100);
        
        this.walls = this.add.group([wallA, this.wallB]);

        // one way
        this.oneWay =  this.physics.add.sprite(0 , height / 4 * 3, 'oneway');
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width / 2, width - this.oneWay.width / 2))
        this.oneWay.setImmovable(true);
        this.oneWay.body.checkCollision.down = false;

        // shot config
        this.SHOT_VELOCITY_X = 200;
        this.SHOT_VELOCITY_Y_MIN = 700;
        this.SHOT_VELOCITY_Y_MAX = 1100;

        this.input.on('pointerdown',(pointer) => {
            // coding challenge: improve shot logic
            let shotDirectionY, shotDirectionX;
            pointer.y <= this.ball.y ? shotDirectionY = 1 : shotDirectionY = -1;
            pointer.x <= this.ball.x ? shotDirectionX = 1 : shotDirectionX = -1;
            this.ball.body.setVelocityX(Phaser.Math.Between(this.SHOT_VELOCITY_X , this.SHOT_VELOCITY_X) * shotDirectionX);
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirectionY);

        })

        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            // coding challenge: reset ball after scoring
            this.ball.body.setVelocityX(0);
            this.ball.body.setVelocityY(0);
            ball.x = width / 2;
            ball.y = height - height / 10;
        })

        this.physics.add.collider(this.ball, this.walls);
        this.physics.add.collider(this.ball, this.oneWay);


    }

    update() {
        this.wallBounce(this.wallB);
    }
    
    wallBounce(wall) {
        if (wall.x >= (width - (wall.width / 2))) {
            console.log('yes')
            wall.setVelocityX(-100);
        } else if(wall.x <= wall.width / 2) {
            console.log('yes')
            wall.setVelocityX(100)
        }
    }
}