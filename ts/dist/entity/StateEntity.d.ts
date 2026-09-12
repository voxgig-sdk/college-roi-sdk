import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { State, StateListMatch } from '../CollegeRoiTypes';
declare class StateEntity extends CollegeRoiEntityBase<State> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: StateEntity): StateEntity;
    list(this: any, reqmatch?: StateListMatch, ctrl?: Control): Promise<StateEntity[]>;
}
export { StateEntity };
