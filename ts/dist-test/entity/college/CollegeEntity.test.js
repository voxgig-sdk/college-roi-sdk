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
(0, node_test_1.describe)('CollegeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COLLEGE_ROI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CollegeRoiSDK.test();
        const ent = testsdk.College();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'college.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "breakeven_age": { "a": true, "h": "Breakeven Age", "n": "breakeven_age", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "breakeven_age", "index$": 0 }, "city": { "a": true, "h": "City", "n": "city", "r": true, "t": "`$STRING`", "key$": "city", "index$": 1 }, "control": { "a": true, "h": "Control", "n": "control", "r": true, "t": "`$STRING`", "key$": "control", "index$": 2 }, "freopp_program_coverage": { "a": true, "h": "Freopp Program Coverage", "n": "freopp_program_coverage", "r": false, "sh": "FREOPP-reported programs rolled into the earnings figure.", "t": "`$INTEGER`", "key$": "freopp_program_coverage", "index$": 3 }, "median_earnings_10yr_usd": { "a": true, "h": "Median Earnings 10yr Usd", "n": "median_earnings_10yr_usd", "r": false, "sh": "FREOPP cohort-weighted earnings ten years after entry.", "t": "`$INTEGER`", "key$": "median_earnings_10yr_usd", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 5 }, "npv_30yr_nonresident_usd": { "a": true, "h": "Npv 30yr Nonresident Usd", "n": "npv_30yr_nonresident_usd", "r": false, "sh": "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "npv_30yr_nonresident_usd", "index$": 6 }, "npv_30yr_resident_usd": { "a": true, "h": "Npv 30yr Resident Usd", "n": "npv_30yr_resident_usd", "r": true, "sh": "30-year projected net value at resident pricing.", "t": "`$INTEGER`", "key$": "npv_30yr_resident_usd", "index$": 7 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 8 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "sh": "USPS 2-letter state code.", "t": "`$STRING`", "key$": "state", "index$": 9 }, "state_name": { "a": true, "h": "State Name", "n": "state_name", "r": false, "t": "`$STRING`", "key$": "state_name", "index$": 10 }, "total_cost_of_attendance_nonresident_usd": { "a": true, "h": "Total Cost Of Attendance Nonresident Usd", "n": "total_cost_of_attendance_nonresident_usd", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "total_cost_of_attendance_nonresident_usd", "index$": 11 }, "total_cost_of_attendance_usd": { "a": true, "h": "Total Cost Of Attendance Usd", "n": "total_cost_of_attendance_usd", "r": false, "t": "`$INTEGER`", "key$": "total_cost_of_attendance_usd", "index$": 12 }, "unitid": { "a": true, "h": "Unitid", "n": "unitid", "r": true, "sh": "IPEDS UnitID — the universal join key.", "t": "`$INTEGER`", "key$": "unitid", "index$": 13 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": true, "sh": "The human-readable page for this school.", "t": "`$STRING`", "key$": "url", "index$": 14 } }, "name": "college", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/colleges.json", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/colleges.json", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "colleges.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "college", "name__orig": "college", "Name": "College", "name_": "college", "name-": "college", "NAME": "COLLEGE", "index$": 1 }, { "active": true, "entity": "college", "key$": "BasicCollegeFlow", "kind": "basic", "name": "BasicCollegeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "college_ref01" } }], "index$": 0 }] }, 'College', { "GET /api/v1/colleges.json": { "protocol": "http", "operationId": "listColleges", "responses": { "200": { "description": "Every gated college.", "content": { "application/json": { "schema": { "type": "object", "properties": { "meta": { "description": "Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.", "key$": "meta", "properties": { "data_vintage": { "type": "string" }, "doi": { "format": "uri", "type": "string" }, "generated": { "format": "date", "type": "string" }, "license": { "const": "CC-BY-4.0", "type": "string" }, "source": { "const": "LE TEEN", "type": "string" }, "url": { "format": "uri", "type": "string" } }, "required": ["source", "url", "license", "doi", "data_vintage", "generated"], "type": "object", "x-ref": "#/components/schemas/Meta" }, "count": { "key$": "count", "type": "integer" }, "notes": { "items": { "type": "string" }, "key$": "notes", "type": "array" }, "colleges": { "items": { "description": "One gated four-year institution (IPEDS 2023 · FREOPP 2021 · BEA 2023). Gates: real FREOPP earnings, >= 3 reported programs, hand-verified exclusions, positive 30-year NPV at resident pricing — no school outside the gate appears, and no named school carries a negative number.", "properties": { "breakeven_age": { "type": ["integer", "null"], "key$": "breakeven_age" }, "city": { "type": "string", "key$": "city" }, "control": { "enum": ["public", "private-nonprofit", "private-forprofit"], "type": "string", "key$": "control" }, "freopp_program_coverage": { "description": "FREOPP-reported programs rolled into the earnings figure.", "type": "integer", "key$": "freopp_program_coverage" }, "median_earnings_10yr_usd": { "description": "FREOPP cohort-weighted earnings ten years after entry.", "type": "integer", "key$": "median_earnings_10yr_usd" }, "name": { "type": "string", "key$": "name" }, "npv_30yr_nonresident_usd": { "description": "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.", "type": ["integer", "null"], "key$": "npv_30yr_nonresident_usd" }, "npv_30yr_resident_usd": { "description": "30-year projected net value at resident pricing. Positive by gate.", "type": "integer", "key$": "npv_30yr_resident_usd" }, "slug": { "type": "string", "key$": "slug" }, "state": { "description": "USPS 2-letter state code.", "type": "string", "key$": "state" }, "state_name": { "type": "string", "key$": "state_name" }, "total_cost_of_attendance_nonresident_usd": { "type": ["integer", "null"], "key$": "total_cost_of_attendance_nonresident_usd" }, "total_cost_of_attendance_usd": { "type": "integer", "key$": "total_cost_of_attendance_usd" }, "unitid": { "description": "IPEDS UnitID — the universal join key.", "type": "integer", "key$": "unitid" }, "url": { "description": "The human-readable page for this school.", "format": "uri", "type": "string", "key$": "url" } }, "required": ["slug", "unitid", "name", "city", "state", "control", "npv_30yr_resident_usd", "url"], "type": "object", "x-ref": "#/components/schemas/College", "index$": 0 }, "key$": "colleges", "type": "array" } } } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let college_ref01_data = Object.values(setup.data.existing.college)[0];
        // LIST
        const college_ref01_ent = client.College();
        const college_ref01_match = {};
        const college_ref01_list = (await college_ref01_ent.list(college_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/college/CollegeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CollegeRoiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['college01', 'college02', 'college03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COLLEGE_ROI_TEST_COLLEGE_ENTID': idmap,
        'COLLEGE_ROI_TEST_LIVE': 'FALSE',
        'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COLLEGE_ROI_TEST_COLLEGE_ENTID'];
    const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COLLEGE_ROI_TEST_COLLEGE_ENTID'];
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
//# sourceMappingURL=CollegeEntity.test.js.map