import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { Major, MajorListMatch } from '../CollegeRoiTypes';
declare class MajorEntity extends CollegeRoiEntityBase<Major> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: MajorEntity): MajorEntity;
    list(this: any, reqmatch?: MajorListMatch, ctrl?: Control): Promise<MajorEntity[]>;
}
export { MajorEntity };
