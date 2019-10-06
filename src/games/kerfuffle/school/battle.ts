import {RandomFighter} from "./random-fighter";
import {Fightable} from "./fightable";
import {HitCalculator} from "./hit-calculator";
import {Logger} from "./logger";
import {Party} from "./party";

export class Battle {
    jeff: Fightable;
    bobby: Fightable;
    party: Party;
    test: Fightable;

    hitCalc: HitCalculator = new HitCalculator();
    logger: Logger = new Logger();

    go() {
        this.jeff = new RandomFighter('Jeff');
        this.bobby = new RandomFighter('Bobby');
        this.party = new Party();
        this.party.add(this.jeff);
        this.party.add(this.bobby);
        this.test = new RandomFighter('Test');


        console.log('======================================================');
        console.log('====',this.party.getName(),'and',this.test.getName(),'want to fight! ====');
        console.log('======================================================');
        this.step();
    }

    step() {
        while (!this.done()) {
            console.log('------------------------------------------------------');
            this.hitCalc.attack(this.getPlayerFighter(), this.test, this.test.getSkills().getBestSubject());
            if (this.done()) {
                break;
            }
            this.hitCalc.attack(this.test, this.getPlayerFighter(), this.test.getSkills().getBestSubject());
        }
        console.log('------------------------------------------------------');

        const deadGuy = this.getPlayerFighter().isDead() ? this.party : this.test;
        const aliveGuy = this.getPlayerFighter().isDead() ? this.test : this.party;

        this.logger.log(`${deadGuy.getName()} has died.`);
        this.logger.log(`${aliveGuy.getName()} wins~`);
    }

    done(): boolean {
        return this.getPlayerFighter().isDead() || this.test.isDead()
    }

    getPlayerFighter(): Fightable {
        return this.party.getCurrentFighter() ? this.party.getCurrentFighter() : this.party;
    }
}
