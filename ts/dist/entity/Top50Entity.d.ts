import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { Top50, Top50ListMatch } from '../CollegeRoiTypes';
declare class Top50Entity extends CollegeRoiEntityBase<Top50> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: Top50Entity): Top50Entity;
    list(this: any, reqmatch?: Top50ListMatch, ctrl?: Control): Promise<Top50Entity[]>;
}
export { Top50Entity };
