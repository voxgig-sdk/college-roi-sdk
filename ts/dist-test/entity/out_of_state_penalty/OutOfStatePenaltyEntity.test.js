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
(0, node_test_1.describe)('OutOfStatePenaltyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COLLEGE_ROI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CollegeRoiSDK.test();
        const ent = testsdk.OutOfStatePenalty();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'out_of_state_penalty.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "institution": { "a": true, "h": "Institution", "n": "institution", "r": false, "t": "`$STRING`", "key$": "institution", "index$": 0 }, "npv_nonresident_usd": { "a": true, "h": "Npv Nonresident Usd", "n": "npv_nonresident_usd", "r": false, "t": "`$INTEGER`", "key$": "npv_nonresident_usd", "index$": 1 }, "npv_resident_usd": { "a": true, "h": "Npv Resident Usd", "n": "npv_resident_usd", "r": false, "t": "`$INTEGER`", "key$": "npv_resident_usd", "index$": 2 }, "oos_penalty_30yr_npv_usd": { "a": true, "h": "Oos Penalty 30yr Npv Usd", "n": "oos_penalty_30yr_npv_usd", "r": false, "t": "`$INTEGER`", "key$": "oos_penalty_30yr_npv_usd", "index$": 3 }, "rank": { "a": true, "h": "Rank", "n": "rank", "r": false, "t": "`$INTEGER`", "key$": "rank", "index$": 4 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "t": "`$STRING`", "key$": "state", "index$": 5 }, "tuition_in_state_usd": { "a": true, "h": "Tuition In State Usd", "n": "tuition_in_state_usd", "r": false, "t": "`$INTEGER`", "key$": "tuition_in_state_usd", "index$": 6 }, "tuition_out_of_state_usd": { "a": true, "h": "Tuition Out Of State Usd", "n": "tuition_out_of_state_usd", "r": false, "t": "`$INTEGER`", "key$": "tuition_out_of_state_usd", "index$": 7 } }, "name": "out_of_state_penalty", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/rankings/out-of-state-penalty.json", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/rankings/out-of-state-penalty.json", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "rankings" }, { "lit": "out-of-state-penalty.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "out_of_state_penalty", "name__orig": "out_of_state_penalty", "Name": "OutOfStatePenalty", "name_": "out_of_state_penalty", "name-": "out-of-state-penalty", "NAME": "OUT_OF_STATE_PENALTY", "index$": 5 }, { "active": true, "entity": "out_of_state_penalty", "key$": "BasicOutOfStatePenaltyFlow", "kind": "basic", "name": "BasicOutOfStatePenaltyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "out_of_state_penalty_ref01" } }], "index$": 0 }] }, 'OutOfStatePenalty', { "GET /api/v1/rankings/out-of-state-penalty.json": { "protocol": "http", "operationId": "getOutOfStatePenaltyRanking", "responses": { "200": { "description": "The full ranking. Every row NPV-positive both ways.", "content": { "application/json": { "schema": { "type": "object", "properties": { "meta": { "description": "Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.", "key$": "meta", "properties": { "data_vintage": { "type": "string" }, "doi": { "format": "uri", "type": "string" }, "generated": { "format": "date", "type": "string" }, "license": { "const": "CC-BY-4.0", "type": "string" }, "source": { "const": "LE TEEN", "type": "string" }, "url": { "format": "uri", "type": "string" } }, "required": ["source", "url", "license", "doi", "data_vintage", "generated"], "type": "object", "x-ref": "#/components/schemas/Meta" }, "title": { "key$": "title", "type": "string" }, "description": { "key$": "description", "type": "string" }, "page_url": { "format": "uri", "key$": "page_url", "type": "string" }, "count": { "key$": "count", "type": "integer" }, "rankings": { "items": { "properties": { "institution": { "type": "string", "key$": "institution" }, "npv_nonresident_usd": { "type": "integer", "key$": "npv_nonresident_usd" }, "npv_resident_usd": { "type": "integer", "key$": "npv_resident_usd" }, "oos_penalty_30yr_npv_usd": { "type": "integer", "key$": "oos_penalty_30yr_npv_usd" }, "rank": { "type": "integer", "key$": "rank" }, "state": { "type": "string", "key$": "state" }, "tuition_in_state_usd": { "type": "integer", "key$": "tuition_in_state_usd" }, "tuition_out_of_state_usd": { "type": "integer", "key$": "tuition_out_of_state_usd" } }, "type": "object", "index$": 0 }, "key$": "rankings", "type": "array" } } } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let out_of_state_penalty_ref01_data = Object.values(setup.data.existing.out_of_state_penalty)[0];
        // LIST
        const out_of_state_penalty_ref01_ent = client.OutOfStatePenalty();
        const out_of_state_penalty_ref01_match = {};
        const out_of_state_penalty_ref01_list = (await out_of_state_penalty_ref01_ent.list(out_of_state_penalty_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/out_of_state_penalty/OutOfStatePenaltyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CollegeRoiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['out_of_state_penalty01', 'out_of_state_penalty02', 'out_of_state_penalty03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID': idmap,
        'COLLEGE_ROI_TEST_LIVE': 'FALSE',
        'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID'];
    const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID'];
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
//# sourceMappingURL=OutOfStatePenaltyEntity.test.js.map