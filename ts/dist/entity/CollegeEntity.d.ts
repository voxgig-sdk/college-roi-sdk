import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { College, CollegeListMatch } from '../CollegeRoiTypes';
declare class CollegeEntity extends CollegeRoiEntityBase<College> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: CollegeEntity): CollegeEntity;
    list(this: any, reqmatch?: CollegeListMatch, ctrl?: Control): Promise<CollegeEntity[]>;
}
export { CollegeEntity };
