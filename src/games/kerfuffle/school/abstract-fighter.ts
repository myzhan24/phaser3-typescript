import {Fightable} from "./fightable";
import {SubjectSkills} from "./subject-skills";
import {Subject} from "./subject";

export abstract class AbstractFighter implements Fightable {
    name: string;
    hp: number = 100;
    mp: number = 0;
    damageLo: number = 5;
    damageHi: number = 20;
    critChance: number = 25;
    skills: SubjectSkills;

    constructor() {
        this.skills = new SubjectSkills(this.name);
    }

    getSkillLevel(subject: Subject): number {
        return this.skills.getSkillLevel(subject);
    }



    takeDamage(damage: number): void {
        this.hp -= damage;
    }

    isDead(): boolean {
        return this.hp <= 0;
    }
}
