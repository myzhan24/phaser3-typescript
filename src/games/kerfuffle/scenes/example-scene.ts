
import {images} from '../assets'
import {DudeSprite} from "../objects/dude-sprite";

export class ExampleScene extends Phaser.Scene {
    private score: number;
    private universeMembers: Array<any>;
    private gameOver:boolean;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private stars: Phaser.Physics.Arcade.Group;
    private bombs: Phaser.Physics.Arcade.Group;
    private scoreText: Phaser.GameObjects.Text;
    private player: Phaser.GameObjects.Sprite;

    constructor() {
        super({key: 'ExampleScene'});
        console.log(this);
    }

    preload() {
        this.score = 0;
        this.gameOver = false;

        this.load.image(images.sky, "./src/games/kerfuffle/assets/sky.png");
        this.load.image(images.ground, './src/games/kerfuffle/assets/platform.png');
        this.load.image(images.star, './src/games/kerfuffle/assets/star.png');
        this.load.image(images.bomb, './src/games/kerfuffle/assets/bomb.png');
        this.load.spritesheet(images.dude, './src/games/kerfuffle/assets/dude.png', {frameWidth: 32, frameHeight: 48});

        this.load.audio('sfx', '/src/games/kerfuffle/assets/audio/SoundEffects/8.mp3');
        this.load.audio('cursor1', '/src/games/kerfuffle/assets/audio/SoundEffects/cursor1.wav');
        this.load.audio('cursor2', '/src/games/kerfuffle/assets/audio/SoundEffects/cursor2.wav');
        this.load.audio('jump', '/src/games/kerfuffle/assets/audio/SoundEffects/jump.mp3');
        this.load.audio('psi', '/src/games/kerfuffle/assets/audio/SoundEffects/psi.wav');
    }

    addToUniverse(universeMember) {
        this.universeMembers.push(universeMember);
    }

    updateUniverse() {
        this.universeMembers.forEach((universeMember) => {
            universeMember.update();

            if (universeMember.iterate) {
                universeMember.iterate((child) => {
                    console.log('child', child);
                    child.update();
                });
            }
        });
    }

    create() {
        this.universeMembers = [];
        //  A simple background for our game
        this.add.image(400, 300, images.sky);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.platforms.create(400, 568, images.ground).setScale(2).refreshBody();

        //  Now let's create some ledges
        this.platforms.create(600, 400, images.ground);
        this.platforms.create(50, 250, images.ground);
        this.platforms.create(750, 220, images.ground);

        //  Input Events
        // this.cursors = this.input.keyboard.createCursorKeys();
        // The player and its settings
        // this.player = this.physics.add.sprite(100, 450, images.dude);
        console.log(this);
        var test = new DudeSprite({
            scene: this,
            x: 100,
            y: 450,
            asset: images.dude
        });

        this.player = test.getSprite();
        // this.add.existing(this.player);
        this.addToUniverse(this.player);
        // var xd = this.scene.physics.add.sprite(test);
        // xd.setBounce(0.1);
        // xd.setCollideWorldBounds(true);

        // var container = new Phaser.GameObjects.Container(this, 100, 450);
        // container.add(test.getSprite());
        // this.add.existing(container);
        // this.addToUniverse(container);


        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            key: images.star,
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70}
        });

        this.stars.children.iterate(function (child: Phaser.Physics.Arcade.Sprite) {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.bombs = this.physics.add.group();

        //  The score
        this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        //  Checks to see if the this.player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update() {
        if (this.gameOver) {
            return;
        }

        this.updateUniverse();
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0) {
            //  A new batch of this.stars to collect
            this.stars.children.iterate(function (child: Phaser.Physics.Arcade.Sprite) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, images.bomb);
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    };

    hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }
};
