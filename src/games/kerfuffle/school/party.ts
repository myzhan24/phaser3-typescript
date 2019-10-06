import {Fightable} from "./fightable";
import {Subject} from "./subject";
import {Stats} from "./stats";
import {Dice} from "./dice";
import {Rollable} from "./rollable";
import {SubjectSkills} from "./subject-skills";

export class Party implements Fightable {
    members = [];
    add(fighter: Fightable) {
        this.members.push(fighter);
    }

    /**
     * Can return null
     */
    getFirstMember(): Fightable {
        let ret = null;
        this.members.some((member)=>{
            if(!member.isDead()) {
                ret = member;
                return true;
            }
        });

        return ret;
    }

    getNextMember(): Fightable {
        return this.getFirstMember();
    }

    getHp(): number {
        let hp = 0;
        this.members.forEach((member)=>{
            if (member.getHp() > 0){
                hp+=member.getHp();
            }
        });

        return hp;
    }

    getName(): string {
        let name = 'Party: [';
        this.members.forEach((member)=>{
            name+=member.getName()+', ';
        });
        name += ']';
        return name;
    }

    getSkillLevel(subject: Subject): number {
        return 0;
    }

    getStats(): Stats {
        return undefined;
    }

    isDead(): boolean {
        const first = this.getNextMember();
        if (first) {
            return first.isDead();
        }

        return true;
    }

    rollDamage(): Rollable {
        const first = this.getNextMember();
        return first ? first.rollDamage() : Dice.throw();
    }

    takeDamage(hp: number): void {
        const member = this.getNextMember();
        if (member) {
            member.takeDamage(hp);
        }
    }

    getSkills(): SubjectSkills {
        return this.getNextMember().getSkills();
    }

    getCurrentFighter(): Fightable {
        return this.getNextMember();
    }

}
