import { CollegeRoiEntityBase } from '../CollegeRoiEntityBase';
import type { CollegeRoiSDK } from '../CollegeRoiSDK';
import type { Control } from '../types';
import type { OutOfStatePenalty, OutOfStatePenaltyListMatch } from '../CollegeRoiTypes';
declare class OutOfStatePenaltyEntity extends CollegeRoiEntityBase<OutOfStatePenalty> {
    constructor(client: CollegeRoiSDK, entopts: any);
    make(this: OutOfStatePenaltyEntity): OutOfStatePenaltyEntity;
    list(this: any, reqmatch?: OutOfStatePenaltyListMatch, ctrl?: Control): Promise<OutOfStatePenaltyEntity[]>;
}
export { OutOfStatePenaltyEntity };
