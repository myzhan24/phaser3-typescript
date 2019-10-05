import {Problem} from './problem';
import {Fightable} from "./fightable";

export interface Test extends Fightable {
    problems: Array<Problem>;
}
