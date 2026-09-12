import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { BestValue, BestValueListMatch } from '../CollegeRoiTypes';
declare class BestValueEntity extends CollegeRoiEntityBase<BestValue> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: BestValueEntity): BestValueEntity;
    list(this: any, reqmatch?: BestValueListMatch, ctrl?: Control): Promise<BestValueEntity[]>;
}
export { BestValueEntity };
