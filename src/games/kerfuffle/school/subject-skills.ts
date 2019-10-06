import {Subject} from "./subject";

export class SubjectSkills {
    skillLevels = {};
    bestSubject: Subject;

    constructor(name: string = '') {

        if (name) console.log('<><><><>',name,'skill sheet','<><><><>');
        let bestSkillLevel = 0;
        let bestSubject: Subject;
        Object.values(Subject).forEach((key) => {
            if (!this.skillLevels[key]) {
                const lvl  = this.getRandomSkillLevel();
                this.skillLevels[key] = lvl;
                if (lvl > bestSkillLevel) {
                    bestSkillLevel = lvl;
                    bestSubject = key as Subject;
                }

                if(name) console.log(key, '=', this.skillLevels[key]);
            }
        });
    }

    getSkillLevel(subject: Subject) {
        return this.skillLevels[subject];
    }

    getBestSubject(): Subject {
        return this.bestSubject;
    }

    getRandomSkillLevel(): number {
        return Math.round(Math.random() * 100 + 1);
    }
}
