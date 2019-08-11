export class UniverseSprite extends Phaser.Physics.Arcade.Sprite {
    protected asset: string;
    protected sfx: any;
    protected debugMode: boolean = false;

    constructor({scene, x, y, asset}) {
        super(scene, x, y, asset);
        this.scene = scene;
        this.asset = asset;
    }

    setVectorX(vector) {
        this.getBody().velocity.x = vector;
    }

    getSprite() {
        return this;
    }

    getBody(): Phaser.Physics.Arcade.Body {
        return this.getSprite().body as Phaser.Physics.Arcade.Body;
    }

    getVectorX() {
        return this.getBody().velocity.x;
    }

    getVectorY() {
        return this.getBody().velocity.y;
    }

    adjustVectorX(value) {
        this.getBody().velocity.x += value;
    }

    adjustVectorY(value) {
        this.getBody().velocity.y += value;
    }

    setVectorY(vector) {
        this.getBody().velocity.y = vector;
    }

    setAccelX(vector) {
        this.getBody().acceleration.x = vector;
    }

    setAccelY(vector) {
        this.getBody().acceleration.y = vector;
    }

    getAccelX(): number {
        return this.getBody().acceleration.x;
    }

    getAccelY(): number {
        return this.getBody().acceleration.y;
    }

    isGrounded() {
        return this.getBody().touching.down;
    }

    getX() {
        return this.getBody().x;
    }

    getY() {
        return this.getBody().y;
    }
}
