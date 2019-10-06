import {Fightable} from "./fightable";
import {SubjectSkills} from "./subject-skills";
import {Subject} from "./subject";
import {Stats} from "./stats";
import {Dice} from "./dice";
import {Rollable} from "./rollable";

export abstract class AbstractFighter implements Fightable {
    name: string;
    skills: SubjectSkills;
    stats: Stats = {
        dmgLo: 5,
        dmgHi: 20,
        hp: 100,
        maxHp: 100,
        mp: 0,
        maxMp: 100,
        crit: 5,
        hit: 5,
        dodge: 0
    };

    constructor() {
        this.skills = new SubjectSkills(this.name);
    }

    getHp(): number {
        return this.stats.hp;
    }

    getName(): string {
        return this.name;
    }

    rollDamage(): Rollable {
        return Dice.throw({
            lo: this.getStats().dmgLo,
            hi: this.getStats().dmgHi,
            critChance: this.getStats().crit
        });
    }

    getSkillLevel(subject: Subject): number {
        return this.skills.getSkillLevel(subject);
    }

    takeDamage(damage: number): void {
        this.stats.hp -= damage;
    }

    isDead(): boolean {
        return this.getHp() <= 0;
    }

    getStats(): Stats {
        return this.stats;
    }

    getPrimarySubject(): Subject {
        return this.skills.getBestSubject();
    }

}
