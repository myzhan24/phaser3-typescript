import {Fightable} from "./fightable";
import {Subject} from "./subject";
import {Logger} from "./logger";

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
        const roll = this.roll();

        // console.log('skill a',a,'skill b',b,'hit roll',roll,'miss chance',missChance);
        return roll >= missChance;
    }

    crit(a: Fightable):boolean {
        return a.critChance >= this.roll();
    }

    damage(a: Fightable, b: Fightable, didCrit: boolean): number {
        let dmg = this.roll(a.damageLo, a.damageHi);
        if (didCrit) {
            dmg *= 2;
        }

        return dmg;
    }

    roll(lo: number = 1, hi: number = 100): number {
        const ret = Math.round((Math.random() * hi + lo));
        // this.logger.log(`\tRolled a ${ret}`);
        return ret;
    }

    attack(a: Fightable, b: Fightable, subject: Subject) {
        const didHit = this.hit(a.getSkillLevel(subject), b.getSkillLevel(subject));
        this.logger.log(`${a.name} attempts to attack ${b.name} in ${Subject[subject]}...`);
        if (didHit) {
            const didCrit = this.crit(a);
            if (didCrit) {
                this.logger.log('\tCRITICAL HIT!!')
            } else {
                this.logger.log('\tHIT!')
            }
            const dmg = this.damage(a, b, didCrit);
            b.takeDamage(dmg);
            this.logger.log(`\t${b.name} took\t\t${dmg} damage\t(${b.hp})`);
        } else {
            this.logger.log('\tJust barely missed!')
        }
    }
}
