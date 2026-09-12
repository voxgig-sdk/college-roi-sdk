import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { Slug, SlugLoadMatch } from '../CollegeRoiTypes';
declare class SlugEntity extends CollegeRoiEntityBase<Slug> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: SlugEntity): SlugEntity;
    load(this: any, reqmatch?: SlugLoadMatch, ctrl?: Control): Promise<SlugEntity>;
}
export { SlugEntity };
