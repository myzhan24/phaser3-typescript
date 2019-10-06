import {RandomFighter} from "./random-fighter";
import {TestA} from "./test-a";
import {Fightable} from "./fightable";
import {HitCalculator} from "./hit-calculator";
import {Subject} from "./subject";
import {Logger} from "./logger";

export class Battle {
    jeff: Fightable;
    test: Fightable;
    hitCalc: HitCalculator = new HitCalculator();
    logger: Logger = new Logger();

    go() {
        this.jeff = new RandomFighter('Jeff');
        this.test = new TestA();
        while (!this.jeff.isDead() && !this.test.isDead()) {
            console.log('------------------------------------------------------');
            this.hitCalc.attack(this.jeff, this.test, Subject.Math);
            if (this.jeff.isDead() || this.test.isDead()) {
                break;
            }
            this.hitCalc.attack(this.test, this.jeff, Subject.Science);
        }
        console.log('------------------------------------------------------');

        const deadGuy = this.jeff.isDead() ? this.jeff : this.test;
        const aliveGuy = this.jeff.isDead() ? this.test : this.jeff;

        this.logger.log(`${deadGuy.getName()} has died.`);
        this.logger.log(`${aliveGuy.getName()} wins~`);

    }

    step() {
        while (!this.jeff.isDead() && !this.test.isDead()) {
            console.log('------------------------------------------------------');
            this.hitCalc.attack(this.jeff, this.test, Subject.Math);
            if (this.jeff.isDead() || this.test.isDead()) {
                break;
            }
            this.hitCalc.attack(this.test, this.jeff, Subject.Science);
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
