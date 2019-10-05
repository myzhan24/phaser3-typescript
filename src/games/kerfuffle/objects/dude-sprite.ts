import {clamp} from "../../../utils/clamp";
import {DudeConstants, Physics} from "../../../constants/constants";
import {UniverseSprite} from "./universe-sprite";
import {Water} from "./water";
import {Battle} from "../school/battle";

export class DudeSprite extends UniverseSprite {
    private cursors: any;
    private inputAccelX: number;
    private bullets: Water[];

    private battle: Battle = new Battle();

    constructor({scene, x, y, asset}) {
        super({scene, x, y, asset});

        this.create();
    }

    private getSceneAnims() {
        return this.scene.anims;
    }

    private create() {
        this.inputAccelX = 0;
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        //  physics properties. Give the little guy a slight bounce.
        this.scene.physics.world.enable(this);
        this.setBounce(0.1);
        this.setCollideWorldBounds(true);

        this.createAnimations();
        this.createSfx();

        this.bullets = [];
    }

    /**
     * Our player animations, turning, walking left and walking right.
     */
    private createAnimations() {
        this.getSceneAnims().create({
            key: 'left',
            frames: this.getSceneAnims().generateFrameNumbers(this.asset, {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.getSceneAnims().create({
            key: 'turn',
            frames: [{key: this.asset, frame: 4}],
            frameRate: 20
        });

        this.getSceneAnims().create({
            key: 'right',
            frames: this.getSceneAnims().generateFrameNumbers(this.asset, {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
    }

    private createSfx() {
        this.sfx = {};
        this.sfx.jump = this.scene.sound.add('jump');
        this.sfx.psi = this.scene.sound.add('psi');
    }

    private updatePlayer() {
        this.updateKeyBinds();
        // this.updateVectorInfluences();

        if (this.inputAccelX > 0) {
            if (this.getVectorX() < DudeConstants.maxRunSpeed) {
                this.adjustVectorX(this.inputAccelX);
                this.setVectorX(clamp(this.getVectorX(), -DudeConstants.maxRunSpeed, DudeConstants.maxRunSpeed));
            }
        } else if (this.inputAccelX < 0) {
            if (this.getVectorX() > -DudeConstants.maxRunSpeed) {
                this.adjustVectorX(this.inputAccelX);
                this.setVectorX(clamp(this.getVectorX(), -DudeConstants.maxRunSpeed, DudeConstants.maxRunSpeed));
            }
        }
    }

    private shoot(): void {
        this.addContainerChild(new Water({
            scene: this.scene
        }));

        if (!this.sfx.psi.isPlaying) {
            this.sfx.psi.play();
        }
    }


    private updateKeyBinds() {
        if (this.cursors.space.isDown && this.isGrounded()) {
            this.battle.go();
            // TODO is changing grounded here right?
            // this.isGrounded() = false;

            this.adjustVectorY(DudeConstants.jumpSpeed);
            try {
                this.sfx.jump.play();
            } catch (e) {

            }
        }

        // if (this.keyQ.isDown && !isPresent(this.water)) {
        if (this.cursors.shift.isDown) {
            this.shoot();
        }

        if (this.cursors.left.isDown) {
            // Left Pressed
            this.inputAccelX = -this.getAccelMu() * DudeConstants.accel;
            this.getSprite().anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            // Right Pressed
            this.inputAccelX = this.getAccelMu() * DudeConstants.accel;
            this.getSprite().anims.play('right', true);
        } else {
            // Neither Left or Right is being pressed.
            // Stop moving when reaching a low enough speed
            if (this.getVectorX() === 0 || Math.abs(this.getVectorX()) <= (Physics.groundFrictionMu * DudeConstants.frictionAccel) / 2) {
                this.inputAccelX = 0;
                this.setVectorX(0);
                this.getSprite().anims.play('turn');
            } else {
                this.inputAccelX = this.getFrictionMu() * DudeConstants.frictionAccel * (this.getVectorX() < 0 ? 1 : -1);
            }
        }
    }

    update(): void {
        if (this.active) {
            this.updatePlayer();
        } else {
        }

        if (this.debugMode) {
            this.log();
        }

        super.update();
    }

    /**
     * returns an acceleration of friction in the opposite magnitude this player is translating.
     * @returns {number}
     */
    getFrictionMu() {
        return this.isGrounded() ? Physics.groundFrictionMu : Physics.airFrictionMu;
    }

    getAccelMu() {
        return this.isGrounded() ? Physics.groundAccelMu : Physics.airAccelMu;
    }

    log() {
        console.log('x', this.getX(), 'y', this.getY(), 'vX', this.getVectorX(), 'vY', this.getVectorY());
    }
}
