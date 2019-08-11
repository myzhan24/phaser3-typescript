import Vector2Like = Phaser.Types.Math.Vector2Like;

export function dist(a: Vector2Like, b: Vector2Like) {
    const xD = a.x - b.x;
    const yD = a.y - b.y;
    return Math.sqrt(xD * xD + yD * yD);
}
