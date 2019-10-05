import {Test} from "./test";
import {Problem} from "./problem";
import {ProblemFactory} from "./problem-factory";
import {AbstractFighter} from "./abstract-fighter";

export class TestA extends AbstractFighter implements Test {
    problems: Array<Problem>;

    constructor() {
        super();
        this.name = 'Test A';
        this.problems = [];
        const problemFactory = new ProblemFactory();
        this.problems.push(problemFactory.build());
    }

    // isDead(): boolean {
    //     if (this.problems.length === 0) return true;
    //
    //     for (let problem of this.problems) {
    //         if (!problem.isDead()) {
    //             return false;
    //         }
    //     }
    //
    //     return true;
    // }
}
