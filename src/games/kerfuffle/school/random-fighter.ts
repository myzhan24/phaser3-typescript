import {AbstractFighter} from './abstract-fighter';

export class RandomFighter extends AbstractFighter {
    constructor(name = 'Random Fighter') {
        super(name);
    }
}
