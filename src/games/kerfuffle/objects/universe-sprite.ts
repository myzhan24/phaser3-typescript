export class UniverseSprite extends Phaser.Physics.Arcade.Sprite {
    protected asset: string;
    protected sfx: any;
    constructor({scene, x, y, asset}) {
        super(scene, x, y, asset);
        this.scene = scene;
        this.asset = asset;
    }
}
