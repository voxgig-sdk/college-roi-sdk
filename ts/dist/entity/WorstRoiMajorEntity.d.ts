import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { WorstRoiMajor, WorstRoiMajorListMatch } from '../CollegeRoiTypes';
declare class WorstRoiMajorEntity extends CollegeRoiEntityBase<WorstRoiMajor> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: WorstRoiMajorEntity): WorstRoiMajorEntity;
    list(this: any, reqmatch?: WorstRoiMajorListMatch, ctrl?: Control): Promise<WorstRoiMajorEntity[]>;
}
export { WorstRoiMajorEntity };
