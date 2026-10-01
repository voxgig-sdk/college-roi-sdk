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
(0, node_test_1.describe)('StateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COLLEGE_ROI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CollegeRoiSDK.test();
        const ent = testsdk.State();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'state.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "city": { "a": true, "h": "City", "n": "city", "r": false, "t": "`$STRING`", "key$": "city", "index$": 0 }, "control": { "a": true, "h": "Control", "n": "control", "r": false, "t": "`$STRING`", "key$": "control", "index$": 1 }, "institution": { "a": true, "h": "Institution", "n": "institution", "r": false, "t": "`$STRING`", "key$": "institution", "index$": 2 }, "npv_30yr_resident_usd": { "a": true, "h": "Npv 30yr Resident Usd", "n": "npv_30yr_resident_usd", "r": false, "t": "`$INTEGER`", "key$": "npv_30yr_resident_usd", "index$": 3 }, "rank_in_state": { "a": true, "h": "Rank In State", "n": "rank_in_state", "r": false, "t": "`$INTEGER`", "key$": "rank_in_state", "index$": 4 } }, "name": "state", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/rankings/best-value/{state}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "state", "or": "state", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/rankings/best-value/{state}.json", "q": { "exist": ["state"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "rankings" }, { "lit": "best-value" }, { "lit": "{state}.json" }], "t": { "req": "`reqdata`", "res": "`body.colleges`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "state", "name__orig": "state", "Name": "State", "name_": "state", "name-": "state", "NAME": "STATE", "index$": 7 }, { "active": true, "entity": "state", "key$": "BasicStateFlow", "kind": "basic", "name": "BasicStateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "state": "state01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "state_ref01" } }], "index$": 0 }] }, 'State', { "GET /api/v1/rankings/best-value/{state}.json": { "protocol": "http", "parameters": [{ "name": "state", "in": "path", "required": true, "description": "Lowercase USPS 2-letter state code (50 states + DC).", "schema": { "type": "string", "enum": ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "dc", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"] }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let state_ref01_data = Object.values(setup.data.existing.state)[0];
        // LIST
        const state_ref01_ent = client.State();
        const state_ref01_match = {};
        state_ref01_match['state'] = setup.idmap['state01'];
        const state_ref01_list = (await state_ref01_ent.list(state_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/state/StateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CollegeRoiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['state01', 'state02', 'state03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COLLEGE_ROI_TEST_STATE_ENTID': idmap,
        'COLLEGE_ROI_TEST_LIVE': 'FALSE',
        'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COLLEGE_ROI_TEST_STATE_ENTID'];
    const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COLLEGE_ROI_TEST_STATE_ENTID'];
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
//# sourceMappingURL=StateEntity.test.js.map