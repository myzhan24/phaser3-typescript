import {Fightable} from "./fightable";
import {Subject} from "./subject";
import {Logger} from "./logger";
import {Dice} from "./dice";

export class HitCalculator {
    logger: Logger = new Logger();
    /**
     * did a hit b?
     * @param a
     * @param b
     */
    hit(a: number, b: number): boolean {
        // 5% base chance to miss
        // Every level difference has 0.5% increase chance to miss
        let missChance = 5;
        missChance += (b - a) / 2;
        // const roll = this.roll();
        // const roll = Dice.throw();

        // console.log('skill a',a,'skill b',b,'hit roll',roll,'miss chance',missChance);
        // return roll >= missChance;

        return Dice.throw().roll >= missChance
    }

    roll(lo: number = 1, hi: number = 100): number {
        const ret = Math.round((Math.random() * hi + lo));
        // this.logger.log(`\tRolled a ${ret}`);
        return ret;
    }

    attack(a: Fightable, b: Fightable, subject: Subject = a.getSkills().getBestSubject()) {
        const didHit = this.hit(a.getSkillLevel(subject), b.getSkillLevel(subject));
        this.logger.log(`${a.getName()} attempts to attack ${b.getName()} in ${Subject[subject]}...`);
        if (didHit) {
            const roll = Dice.throw({
                lo: a.getStats().dmgLo,
                hi: a.getStats().dmgHi,
                critChance: a.getStats().crit
            });
            const didCrit = roll.crit;
            if (didCrit) {
                this.logger.log('\tCRITICAL HIT!!')
            } else {
                this.logger.log('\tHIT!')
            }
            b.takeDamage(roll.value);
            this.logger.log(`\t${b.getName()} took\t\t${roll.value} damage\t(${b.getHp()})`);
        } else {
            this.logger.log('\tJust barely missed!')
        }
    }
}
