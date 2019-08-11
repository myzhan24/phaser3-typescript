

export class Dude extends Phaser.GameObjects.Container {
    private sprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);
        // this.sprite = new DudeSprite(this.scene, 0, 0);
    }
}
