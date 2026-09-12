import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { Openapi, OpenapiLoadMatch } from '../CollegeRoiTypes';
declare class OpenapiEntity extends CollegeRoiEntityBase<Openapi> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: OpenapiEntity): OpenapiEntity;
    load(this: any, reqmatch?: OpenapiLoadMatch, ctrl?: Control): Promise<OpenapiEntity>;
}
export { OpenapiEntity };
