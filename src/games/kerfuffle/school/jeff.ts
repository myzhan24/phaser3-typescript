import {AbstractFighter} from './abstract-fighter';
import {SubjectSkills} from "./subject-skills";

export class Jeff extends AbstractFighter {
    name = 'Jeff';
    constructor() {
        super();
        this.skills = new SubjectSkills(this.name);
    }
}
