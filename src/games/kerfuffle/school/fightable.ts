import {SubjectSkills} from "./subject-skills";
import {Subject} from "./subject";
import {Stats} from "./stats";
import {Rollable} from "./rollable";

export interface Fightable {
    getName(): string;
    getHp(): number;
    getSkills(): SubjectSkills;
    getSkillLevel(subject: Subject): number;
    getStats(): Stats;
    isDead(): boolean;
    rollDamage(): Rollable;
    takeDamage(hp: number): void;
    getCurrentFighter(): Fightable;
}
