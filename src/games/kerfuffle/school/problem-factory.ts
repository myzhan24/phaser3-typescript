import {Problem} from "./problem";
import {Subject} from "./subject";
import {SubjectSkills} from "./subject-skills";
import {AbstractFighter} from "./abstract-fighter";

export class ProblemFactory {
    build(): Problem {
        const fighter: AbstractFighter = new class extends AbstractFighter {};
        return fighter;
    }
}
