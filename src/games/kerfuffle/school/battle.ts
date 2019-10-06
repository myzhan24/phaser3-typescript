import {RandomFighter} from "./random-fighter";
import {Fightable} from "./fightable";
import {HitCalculator} from "./hit-calculator";
import {Logger} from "./logger";

export class Battle {
    jeff: Fightable;
    test: Fightable;
    hitCalc: HitCalculator = new HitCalculator();
    logger: Logger = new Logger();

    go() {
        this.jeff = new RandomFighter('Jeff');
        this.test = new RandomFighter('Test A');
        while (!this.done()) {
            console.log('------------------------------------------------------');
            this.hitCalc.attack(this.jeff, this.test);
            if (this.jeff.isDead() || this.test.isDead()) {
                break;
            }
            this.hitCalc.attack(this.test, this.jeff);
        }
        console.log('------------------------------------------------------');

        const deadGuy = this.jeff.isDead() ? this.jeff : this.test;
        const aliveGuy = this.jeff.isDead() ? this.test : this.jeff;

        this.logger.log(`${deadGuy.getName()} has died.`);
        this.logger.log(`${aliveGuy.getName()} wins~`);

    }

    step() {
        while (!this.done()) {
            console.log('------------------------------------------------------');
            this.hitCalc.attack(this.jeff, this.test);
            if (this.jeff.isDead() || this.test.isDead()) {
                break;
            }
            this.hitCalc.attack(this.test, this.jeff);
        }
        console.log('------------------------------------------------------');

        const deadGuy = this.jeff.isDead() ? this.jeff : this.test;
        const aliveGuy = this.jeff.isDead() ? this.test : this.jeff;

        this.logger.log(`${deadGuy.getName()} has died.`);
        this.logger.log(`${aliveGuy.getName()} wins~`);
    }

    done(): boolean {
        return this.jeff.isDead() || this.test.isDead()
    }
}
