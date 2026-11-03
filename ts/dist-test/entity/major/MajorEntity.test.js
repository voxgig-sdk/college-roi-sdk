"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('MajorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COLLEGE_ROI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CollegeRoiSDK.test();
        const ent = testsdk.Major();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('major hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.CollegeRoiSDK.test(offline).Major().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.CollegeRoiSDK.test(offline).Major()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.CollegeRoiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Major().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.CollegeRoiSDK.test().Major().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.CollegeRoiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Major().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Major().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CollegeRoiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Major().list({ "cip_program_name": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'major.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ai_exposure": { "a": true, "h": "Ai Exposure", "n": "ai_exposure", "r": false, "sh": "le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "ai_exposure", "index$": 0 }, "cip_program_name": { "a": true, "h": "Cip Program Name", "n": "cip_program_name", "r": false, "sh": "CIP program-family name — subfields only.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "cip_program_name", "index$": 1 }, "completion_adjusted_roi_usd": { "a": true, "h": "Completion Adjusted Roi Usd", "n": "completion_adjusted_roi_usd", "r": false, "t": ["`$ONE`", ["`$NUMBER`", "`$NULL`"]], "key$": "completion_adjusted_roi_usd", "index$": 2 }, "dropout_roi_usd": { "a": true, "h": "Dropout Roi Usd", "n": "dropout_roi_usd", "r": false, "t": ["`$ONE`", ["`$NUMBER`", "`$NULL`"]], "key$": "dropout_roi_usd", "index$": 3 }, "graduates": { "a": true, "h": "Graduates", "n": "graduates", "r": false, "t": "`$INTEGER`", "key$": "graduates", "index$": 4 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "t": "`$STRING`", "key$": "kind", "index$": 5 }, "mean_lifetime_roi_usd": { "a": true, "h": "Mean Lifetime Roi Usd", "n": "mean_lifetime_roi_usd", "r": false, "t": "`$NUMBER`", "key$": "mean_lifetime_roi_usd", "index$": 6 }, "median_breakeven_age": { "a": true, "h": "Median Breakeven Age", "n": "median_breakeven_age", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "median_breakeven_age", "index$": 7 }, "median_lifetime_roi_usd": { "a": true, "h": "Median Lifetime Roi Usd", "n": "median_lifetime_roi_usd", "r": false, "t": "`$NUMBER`", "key$": "median_lifetime_roi_usd", "index$": 8 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 9 }, "p25_roi_usd": { "a": true, "h": "P25 Roi Usd", "n": "p25_roi_usd", "r": false, "t": "`$NUMBER`", "key$": "p25_roi_usd", "index$": 10 }, "p75_roi_usd": { "a": true, "h": "P75 Roi Usd", "n": "p75_roi_usd", "r": false, "t": "`$NUMBER`", "key$": "p75_roi_usd", "index$": 11 }, "parent": { "a": true, "h": "Parent", "n": "parent", "r": false, "sh": "Parent category — subfields only.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "parent", "index$": 12 }, "pct_never_breakeven": { "a": true, "h": "Pct Never Breakeven", "n": "pct_never_breakeven", "r": false, "sh": "Share of graduates who never break even, percent.", "t": "`$NUMBER`", "key$": "pct_never_breakeven", "index$": 13 }, "programs": { "a": true, "h": "Programs", "n": "programs", "r": false, "t": "`$INTEGER`", "key$": "programs", "index$": 14 }, "rank_by_worst_roi": { "a": true, "h": "Rank By Worst Roi", "n": "rank_by_worst_roi", "r": true, "sh": "Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).", "t": "`$INTEGER`", "key$": "rank_by_worst_roi", "index$": 15 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 16 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": true, "sh": "The human-readable page for this major.", "t": "`$STRING`", "key$": "url", "index$": 17 } }, "name": "major", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/majors.json", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/majors.json", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "majors.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "major", "name__orig": "major", "Name": "Major", "name_": "major", "name-": "major", "NAME": "MAJOR", "index$": 3 }, { "active": true, "entity": "major", "key$": "BasicMajorFlow", "kind": "basic", "name": "BasicMajorFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "major_ref01" } }], "index$": 0 }] }, 'Major', { "GET /api/v1/majors.json": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let major_ref01_data = Object.values(setup.data.existing.major)[0];
        // LIST
        const major_ref01_ent = client.Major();
        const major_ref01_match = {};
        const major_ref01_list = (await major_ref01_ent.list(major_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/major/MajorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CollegeRoiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['major01', 'major02', 'major03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COLLEGE_ROI_TEST_MAJOR_ENTID': idmap,
        'COLLEGE_ROI_TEST_LIVE': 'FALSE',
        'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COLLEGE_ROI_TEST_MAJOR_ENTID'];
    const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COLLEGE_ROI_TEST_MAJOR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CollegeRoiSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.COLLEGE_ROI_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=MajorEntity.test.js.map