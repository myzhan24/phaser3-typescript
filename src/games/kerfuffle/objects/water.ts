import {UniverseSprite} from "./universe-sprite";
import {images} from "../assets";
import GameObject = Phaser.GameObjects.GameObject;
import Sprite = Phaser.GameObjects.Sprite;
import {dist} from "../../../utils/dist";
import Container = Phaser.GameObjects.Container;

export class Water extends UniverseSprite {
    private parentMass: number;
    private radius: number;
    private parent = {
        x: 0,
        y: 0,
        displayHeight: 40
    };

    constructor({scene, asset = images.rain}) {
        super({scene, x: 0, y: 0, asset});
        this.scene.physics.world.enable(this);
        this.getBody().setAllowGravity(false);
        this.parentMass = 10000;
        this.radius = Math.random() * 100 + this.parent.displayHeight / 2 + 10;
        this.putAroundParent();
        // console.log('water x',this.x,'y',this.y);
        // console.log('water constructor, parentContainer',this.parentContainer);
    }

    putAroundParent() {
        const radius = this.radius;
        const angle = Math.random() * 2 * Math.PI;
        const sideX = Math.cos(angle) * radius;
        const sideY = Math.sin(angle) * radius;

        const cLength = Math.sqrt(sideX * sideX + sideY * sideY);

        this.x = this.parent.x + sideX;
        this.y = this.parent.y + sideY;

        const V = Math.sqrt(this.parentMass / cLength);
        this.setVectorX(sideY / cLength * V);
        this.setVectorY(sideX / cLength * -1 * V);
    }

    update() {
        // console.log('water x',this.x,'y',this.y);
        const sideX = this.x - this.parent.x;
        const sideY = this.y - this.parent.y;
        const cLength = dist(this, this.parent);
        const Fg = this.parentMass / (cLength * cLength);
        const angle = Math.asin(sideY / cLength);

        if (sideX > 0) {
            this.setAccelX(((-1) * (((Math.abs(Math.cos(angle) * Fg))))));
        } else if (sideX < 0) {
            this.setAccelX(((((Math.abs(Math.cos(angle) * Fg))))));
        }
        if (sideY > 0) {
            this.setAccelY((((-1) * ((Math.abs(Math.sin(angle) * Fg))))));
        } else if (sideY < 0) {
            this.setAccelY(((((Math.abs(Math.sin(angle) * Fg))))));
        }

        // this.adjustVectorX(this.accelX);
        // this.adjustVectorY(this.accelY);

        // this.x += this.vectorX;
        // this.y += this.vectorY;

        // if (cLength > 500) {


        // let test = 1 / (1 + (1 / (cLength)));
        // this.x -= (this.mzparentContainer.x - this.mzparentContainer.lastX) * test;
        // this.y -= (this.mzparentContainer.y - this.mzparentContainer.lastY) * test;
        // console.log('c l', this.x, this.y);
        // }


        // this.x += this.parent.vectorX;
        // this.y += this.parent.vectorY;

        // console.log('water dist angle vX vY', cLength, '\t', angle, '\t', this.vectorX, '\t', this.vectorY);

        if (this.getVectorX() < 0) {
            this.rotation = 1.5708 + Math.atan(this.getVectorY() / this.getVectorX());
        } else {
            this.rotation = -1.5708 + Math.atan(this.getVectorY() / this.getVectorX());
        }

        // console.log('water dist', cLength);
        super.update();
    }
}
