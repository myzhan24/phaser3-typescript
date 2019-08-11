import GameObject = Phaser.GameObjects.GameObject;
import GetBounds = Phaser.GameObjects.Components.GetBounds;

export class Contained extends Phaser.GameObjects.Container {
    protected mainChild: GameObject;

    constructor(scene: Phaser.Scene, x?: number, y?: number, mainChild?: GameObject, children?: GameObject[]) {
        super(scene, x, y, children);
        this.mainChild = mainChild;

        // this.scene.physics.world.enable(this);
        // this.scene.add.existing(this);
    }

    getMainChild(): GameObject {
        return this.mainChild;
    }

    getBounds() {
        const gb = (this.mainChild as unknown as GetBounds);
        if (gb) {
            return gb.getBounds();
        }

        return super.getBounds();
    }

    // getBoundsTransformMatrix() {
    //     return this.mainChild.get
    // }

    // getHeight() {
    //     return this.mainChild.displayHeight;
    // }
}
