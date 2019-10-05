import {Faction} from './faction';
import {Ability} from './ability';
import {Passive} from './passive';
import {AbstractFighter} from './abstract-fighter';

export interface Entity extends AbstractFighter {
    faction: Faction;
    ability: Ability;
    passive: Passive;
}
