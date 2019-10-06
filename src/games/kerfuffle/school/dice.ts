import {Rollable} from "./rollable";

export class Dice {
    static throw(props = {lo: 1, hi: 100, critChance: 5}): Rollable {
        const roll = Math.round(Math.random() * props.hi + props.lo);
        const isCrit = roll <= props.critChance;
        return {
            crit: isCrit,
            roll: roll,
            value: isCrit ? roll * 2 : roll
        };
    }
}
