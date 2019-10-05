import {Subject} from "./subject";

export class SubjectSkills {
    skillLevels = {};

    constructor(name: string = '') {

        if (name) console.log('<><><><>',name,'skill sheet','<><><><>');
        Object.values(Subject).forEach((key) => {
            if (!this.skillLevels[key]) {
                this.skillLevels[key] = this.getRandomSkillLevel();
                if(name) console.log(key, '=', this.skillLevels[key]);
            }
        });
    }

    getSkillLevel(subject: Subject) {
        return this.skillLevels[subject];
    }

    getRandomSkillLevel(): number {
        return Math.round(Math.random() * 100 + 1);
    }
}
