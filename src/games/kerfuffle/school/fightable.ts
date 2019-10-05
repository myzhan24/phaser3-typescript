import {SubjectSkills} from "./subject-skills";
import {Subject} from "./subject";

export interface Fightable {
    name: string;
    hp: number;
    mp: number;
    skills: SubjectSkills;
    critChance: number;
    damageLo: number;
    damageHi: number;
    getSkillLevel(subject: Subject): number;
    isDead(): boolean;
    takeDamage(hp: number): void;
}
