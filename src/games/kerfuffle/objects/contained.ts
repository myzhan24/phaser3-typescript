import GameObject = Phaser.GameObjects.GameObject;
import GetBounds = Phaser.GameObjects.Components.GetBounds;

export class Contained extends Phaser.GameObjects.Container {
    protected mainChild: GameObject;

    constructor(scene: Phaser.Scene, x?: number, y?: number, mainChild?: GameObject, children?: GameObject[]) {
        super(scene, x, y, children);
        this.mainChild = mainChild;
        // this.scene.physics.world.enable(this);
    }

    update() {
        // this.updatePlayer();
        // this.water.update();
        for (let child of this.list) {
            child.update();
        }

        // this.x++;
        // console.log('contained velocity', this.body);
    }

    getMainChild(): GameObject {
        return this.mainChild;
    }

    /**
     * Rather than returning the bounds of all children, return the bounds of the main child.
     */
    getBounds() {
        // TODO check that this is necessary.
        // const gb = (this.mainChild as unknown as GetBounds);
        // return gb ? gb.getBounds() : super.getBounds();
        return super.getBounds();
    }
}
