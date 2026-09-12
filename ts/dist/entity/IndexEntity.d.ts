import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { Index, IndexLoadMatch } from '../CollegeRoiTypes';
declare class IndexEntity extends CollegeRoiEntityBase<Index> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: IndexEntity): IndexEntity;
    load(this: any, reqmatch?: IndexLoadMatch, ctrl?: Control): Promise<IndexEntity>;
}
export { IndexEntity };
