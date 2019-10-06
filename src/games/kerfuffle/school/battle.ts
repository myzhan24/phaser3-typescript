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

        console.log('======================================================');
        console.log('====',this.jeff.getName(),'and',this.test.getName(),'want to fight! ====');
        console.log('======================================================');
        this.step();
    }

    step() {
        while (!this.done()) {
            console.log('------------------------------------------------------');
            this.hitCalc.attack(this.jeff, this.test, this.test.getSkills().getBestSubject());
            if (this.done()) {
                break;
            }
            this.hitCalc.attack(this.test, this.jeff, this.test.getSkills().getBestSubject());
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
