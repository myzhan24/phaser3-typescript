import {Jeff} from "./jeff";
import {TestA} from "./test-a";
import {Fightable} from "./fightable";
import {HitCalculator} from "./hit-calculator";
import {Subject} from "./subject";
import {Logger} from "./logger";

export class Battle {
    entity: Fightable;
    test: Fightable;
    hitCalc: HitCalculator = new HitCalculator();
    logger: Logger = new Logger();

    go() {
        this.entity = new Jeff();
        this.test = new TestA();
        while (!this.entity.isDead() && !this.test.isDead()) {
            console.log('------------------------------------------------------');
            this.hitCalc.attack(this.entity, this.test, Subject.Math);
            if (this.entity.isDead() || this.test.isDead()) {
                break;
            }
            this.hitCalc.attack(this.test, this.entity, Subject.Science);
        }
        console.log('------------------------------------------------------');

        const deadGuy = this.entity.isDead() ? this.entity : this.test;
        const aliveGuy = this.entity.isDead() ? this.test : this.entity;

        this.logger.log(`${deadGuy.name} has died.`);
        this.logger.log(`${aliveGuy.name} wins~`);

    }
}
