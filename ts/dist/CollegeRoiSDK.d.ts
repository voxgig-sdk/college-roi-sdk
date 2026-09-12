import { BestValueEntity } from './entity/BestValueEntity';
import { CollegeEntity } from './entity/CollegeEntity';
import { IndexEntity } from './entity/IndexEntity';
import { MajorEntity } from './entity/MajorEntity';
import { OpenapiEntity } from './entity/OpenapiEntity';
import { OutOfStatePenaltyEntity } from './entity/OutOfStatePenaltyEntity';
import { SlugEntity } from './entity/SlugEntity';
import { StateEntity } from './entity/StateEntity';
import { Top50Entity } from './entity/Top50Entity';
import { WorstRoiMajorEntity } from './entity/WorstRoiMajorEntity';
export type * from './CollegeRoiTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CollegeRoiEntityBase } from './CollegeRoiEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CollegeRoiSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BestValue(entopts?: Record<string, any>): BestValueEntity;
    College(entopts?: Record<string, any>): CollegeEntity;
    Index(entopts?: Record<string, any>): IndexEntity;
    Major(entopts?: Record<string, any>): MajorEntity;
    Openapi(entopts?: Record<string, any>): OpenapiEntity;
    OutOfStatePenalty(entopts?: Record<string, any>): OutOfStatePenaltyEntity;
    Slug(entopts?: Record<string, any>): SlugEntity;
    State(entopts?: Record<string, any>): StateEntity;
    Top50(entopts?: Record<string, any>): Top50Entity;
    WorstRoiMajor(entopts?: Record<string, any>): WorstRoiMajorEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CollegeRoiSDK;
    tester(testopts?: any, sdkopts?: any): CollegeRoiSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CollegeRoiSDK;
export { stdutil, config, BaseFeature, CollegeRoiEntityBase, CollegeRoiSDK, SDK, };
