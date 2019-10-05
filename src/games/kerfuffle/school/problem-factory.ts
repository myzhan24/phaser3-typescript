import {Problem} from "./problem";
import {Subject} from "./subject";
import {SubjectSkills} from "./subject-skills";

export class ProblemFactory {
    build(): Problem {
        return new class implements Problem {
            critChance: number;
            damageHi: number;
            damageLo: number;
            hp: number;
            mp: number;
            name: string;
            skills: SubjectSkills;
            subject: Subject;

            getSkillLevel(subject: Subject): number {
                return 0;
            }

            isDead(): boolean {
                return false;
            }

            takeDamage(hp: number): void {
            }
        }
    }
}
