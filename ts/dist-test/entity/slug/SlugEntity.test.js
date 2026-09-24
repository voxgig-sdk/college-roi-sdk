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
(0, node_test_1.describe)('SlugEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COLLEGE_ROI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CollegeRoiSDK.test();
        const ent = testsdk.Slug();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'slug.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ai_exposure": { "a": true, "h": "Ai Exposure", "n": "ai_exposure", "r": false, "sh": "le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "ai_exposure", "index$": 0 }, "breakeven_age": { "a": true, "h": "Breakeven Age", "n": "breakeven_age", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "breakeven_age", "index$": 1 }, "cip_program_name": { "a": true, "h": "Cip Program Name", "n": "cip_program_name", "r": false, "sh": "CIP program-family name — subfields only.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "cip_program_name", "index$": 2 }, "city": { "a": true, "h": "City", "n": "city", "r": true, "t": "`$STRING`", "key$": "city", "index$": 3 }, "completion_adjusted_roi_usd": { "a": true, "h": "Completion Adjusted Roi Usd", "n": "completion_adjusted_roi_usd", "r": false, "t": ["`$ONE`", ["`$NUMBER`", "`$NULL`"]], "key$": "completion_adjusted_roi_usd", "index$": 4 }, "control": { "a": true, "h": "Control", "n": "control", "r": true, "t": "`$STRING`", "key$": "control", "index$": 5 }, "dropout_roi_usd": { "a": true, "h": "Dropout Roi Usd", "n": "dropout_roi_usd", "r": false, "t": ["`$ONE`", ["`$NUMBER`", "`$NULL`"]], "key$": "dropout_roi_usd", "index$": 6 }, "freopp_program_coverage": { "a": true, "h": "Freopp Program Coverage", "n": "freopp_program_coverage", "r": false, "sh": "FREOPP-reported programs rolled into the earnings figure.", "t": "`$INTEGER`", "key$": "freopp_program_coverage", "index$": 7 }, "graduates": { "a": true, "h": "Graduates", "n": "graduates", "r": false, "t": "`$INTEGER`", "key$": "graduates", "index$": 8 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "t": "`$STRING`", "key$": "kind", "index$": 9 }, "mean_lifetime_roi_usd": { "a": true, "h": "Mean Lifetime Roi Usd", "n": "mean_lifetime_roi_usd", "r": false, "t": "`$NUMBER`", "key$": "mean_lifetime_roi_usd", "index$": 10 }, "median_breakeven_age": { "a": true, "h": "Median Breakeven Age", "n": "median_breakeven_age", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "median_breakeven_age", "index$": 11 }, "median_earnings_10yr_usd": { "a": true, "h": "Median Earnings 10yr Usd", "n": "median_earnings_10yr_usd", "r": false, "sh": "FREOPP cohort-weighted earnings ten years after entry.", "t": "`$INTEGER`", "key$": "median_earnings_10yr_usd", "index$": 12 }, "median_lifetime_roi_usd": { "a": true, "h": "Median Lifetime Roi Usd", "n": "median_lifetime_roi_usd", "r": false, "t": "`$NUMBER`", "key$": "median_lifetime_roi_usd", "index$": 13 }, "meta": { "a": true, "h": "Meta", "n": "meta", "r": true, "sh": "Provenance block carried by every payload.", "t": "`$OBJECT`", "key$": "meta", "index$": 14 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 15 }, "npv_30yr_nonresident_usd": { "a": true, "h": "Npv 30yr Nonresident Usd", "n": "npv_30yr_nonresident_usd", "r": false, "sh": "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "npv_30yr_nonresident_usd", "index$": 16 }, "npv_30yr_resident_usd": { "a": true, "h": "Npv 30yr Resident Usd", "n": "npv_30yr_resident_usd", "r": true, "sh": "30-year projected net value at resident pricing.", "t": "`$INTEGER`", "key$": "npv_30yr_resident_usd", "index$": 17 }, "p25_roi_usd": { "a": true, "h": "P25 Roi Usd", "n": "p25_roi_usd", "r": false, "t": "`$NUMBER`", "key$": "p25_roi_usd", "index$": 18 }, "p75_roi_usd": { "a": true, "h": "P75 Roi Usd", "n": "p75_roi_usd", "r": false, "t": "`$NUMBER`", "key$": "p75_roi_usd", "index$": 19 }, "parent": { "a": true, "h": "Parent", "n": "parent", "r": false, "sh": "Parent category — subfields only.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "parent", "index$": 20 }, "pct_never_breakeven": { "a": true, "h": "Pct Never Breakeven", "n": "pct_never_breakeven", "r": false, "sh": "Share of graduates who never break even, percent.", "t": "`$NUMBER`", "key$": "pct_never_breakeven", "index$": 21 }, "programs": { "a": true, "h": "Programs", "n": "programs", "r": false, "t": "`$INTEGER`", "key$": "programs", "index$": 22 }, "rank_by_worst_roi": { "a": true, "h": "Rank By Worst Roi", "n": "rank_by_worst_roi", "r": true, "sh": "Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).", "t": "`$INTEGER`", "key$": "rank_by_worst_roi", "index$": 23 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 24 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "sh": "USPS 2-letter state code.", "t": "`$STRING`", "key$": "state", "index$": 25 }, "state_name": { "a": true, "h": "State Name", "n": "state_name", "r": false, "t": "`$STRING`", "key$": "state_name", "index$": 26 }, "total_cost_of_attendance_nonresident_usd": { "a": true, "h": "Total Cost Of Attendance Nonresident Usd", "n": "total_cost_of_attendance_nonresident_usd", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "total_cost_of_attendance_nonresident_usd", "index$": 27 }, "total_cost_of_attendance_usd": { "a": true, "h": "Total Cost Of Attendance Usd", "n": "total_cost_of_attendance_usd", "r": false, "t": "`$INTEGER`", "key$": "total_cost_of_attendance_usd", "index$": 28 }, "unitid": { "a": true, "h": "Unitid", "n": "unitid", "r": true, "sh": "IPEDS UnitID — the universal join key.", "t": "`$INTEGER`", "key$": "unitid", "index$": 29 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": true, "sh": "The human-readable page for this school.", "t": "`$STRING`", "key$": "url", "index$": 30 } }, "name": "slug", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/colleges/{slug}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "slug", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/colleges/{slug}.json", "q": { "exist": ["slug"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "colleges" }, { "lit": "{slug}.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/majors/{slug}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "slug", "or": "slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/majors/{slug}.json", "q": { "exist": ["slug"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "majors" }, { "lit": "{slug}.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "slug", "name__orig": "slug", "Name": "Slug", "name_": "slug", "name-": "slug", "NAME": "SLUG", "index$": 6 }, { "active": true, "entity": "slug", "key$": "BasicSlugFlow", "kind": "basic", "name": "BasicSlugFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "slug_ref01", "srcdatavar": "slug_ref01_data", "suffix": "_dt0" }, "m": { "slug": "slug01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-slug_ref01" } }], "index$": 0 }] }, 'Slug', { "GET /api/v1/colleges/{slug}.json": { "protocol": "http", "operationId": "getCollege", "responses": { "200": { "description": "The college with its meta block.", "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "properties": { "meta": { "description": "Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.", "key$": "meta", "properties": { "data_vintage": { "type": "string" }, "doi": { "format": "uri", "type": "string" }, "generated": { "format": "date", "type": "string" }, "license": { "const": "CC-BY-4.0", "type": "string" }, "source": { "const": "LE TEEN", "type": "string" }, "url": { "format": "uri", "type": "string" } }, "required": ["source", "url", "license", "doi", "data_vintage", "generated"], "type": "object", "x-ref": "#/components/schemas/Meta" } }, "index$": 0 }, { "type": "object", "description": "One gated four-year institution (IPEDS 2023 · FREOPP 2021 · BEA 2023). Gates: real FREOPP earnings, >= 3 reported programs, hand-verified exclusions, positive 30-year NPV at resident pricing — no school outside the gate appears, and no named school carries a negative number.", "required": ["slug", "unitid", "name", "city", "state", "control", "npv_30yr_resident_usd", "url"], "properties": { "slug": { "key$": "slug", "type": "string" }, "unitid": { "description": "IPEDS UnitID — the universal join key.", "key$": "unitid", "type": "integer" }, "name": { "key$": "name", "type": "string" }, "city": { "key$": "city", "type": "string" }, "state": { "description": "USPS 2-letter state code.", "key$": "state", "type": "string" }, "state_name": { "key$": "state_name", "type": "string" }, "control": { "enum": ["public", "private-nonprofit", "private-forprofit"], "key$": "control", "type": "string" }, "npv_30yr_resident_usd": { "description": "30-year projected net value at resident pricing. Positive by gate.", "key$": "npv_30yr_resident_usd", "type": "integer" }, "npv_30yr_nonresident_usd": { "description": "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.", "key$": "npv_30yr_nonresident_usd", "type": ["integer", "null"] }, "total_cost_of_attendance_usd": { "key$": "total_cost_of_attendance_usd", "type": "integer" }, "total_cost_of_attendance_nonresident_usd": { "key$": "total_cost_of_attendance_nonresident_usd", "type": ["integer", "null"] }, "median_earnings_10yr_usd": { "description": "FREOPP cohort-weighted earnings ten years after entry.", "key$": "median_earnings_10yr_usd", "type": "integer" }, "breakeven_age": { "key$": "breakeven_age", "type": ["integer", "null"] }, "freopp_program_coverage": { "description": "FREOPP-reported programs rolled into the earnings figure.", "key$": "freopp_program_coverage", "type": "integer" }, "url": { "description": "The human-readable page for this school.", "format": "uri", "key$": "url", "type": "string" } }, "x-ref": "#/components/schemas/College", "index$": 1 }] } } } }, "404": { "description": "Unknown slug — the school is outside the gate or not covered." } }, "parameters": [{ "name": "slug", "in": "path", "required": true, "description": "College slug, e.g. university-of-michigan-ann-arbor.", "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /api/v1/majors/{slug}.json": { "protocol": "http", "operationId": "getMajor", "responses": { "200": { "description": "The major with its meta block.", "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "properties": { "meta": { "description": "Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.", "key$": "meta", "properties": { "data_vintage": { "type": "string" }, "doi": { "format": "uri", "type": "string" }, "generated": { "format": "date", "type": "string" }, "license": { "const": "CC-BY-4.0", "type": "string" }, "source": { "const": "LE TEEN", "type": "string" }, "url": { "format": "uri", "type": "string" } }, "required": ["source", "url", "license", "doi", "data_vintage", "generated"], "type": "object", "x-ref": "#/components/schemas/Meta" } }, "index$": 0 }, { "type": "object", "description": "One major category or CIP subfield with its full lifetime-ROI stat set (FREOPP 2021, cohort-weighted). Field averages may be negative — no institution is named.", "required": ["slug", "kind", "name", "rank_by_worst_roi", "url"], "properties": { "slug": { "key$": "slug", "type": "string" }, "kind": { "enum": ["category", "subfield"], "key$": "kind", "type": "string" }, "name": { "key$": "name", "type": "string" }, "cip_program_name": { "description": "CIP program-family name — subfields only.", "key$": "cip_program_name", "type": ["string", "null"] }, "parent": { "description": "Parent category — subfields only.", "key$": "parent", "properties": { "name": { "type": "string" }, "slug": { "type": "string" } }, "type": ["object", "null"] }, "rank_by_worst_roi": { "description": "Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).", "key$": "rank_by_worst_roi", "type": "integer" }, "url": { "description": "The human-readable page for this major.", "format": "uri", "key$": "url", "type": "string" }, "mean_lifetime_roi_usd": { "key$": "mean_lifetime_roi_usd", "type": "number" }, "median_lifetime_roi_usd": { "key$": "median_lifetime_roi_usd", "type": "number" }, "p25_roi_usd": { "key$": "p25_roi_usd", "type": "number" }, "p75_roi_usd": { "key$": "p75_roi_usd", "type": "number" }, "pct_never_breakeven": { "description": "Share of graduates who never break even, percent.", "key$": "pct_never_breakeven", "type": "number" }, "median_breakeven_age": { "key$": "median_breakeven_age", "type": ["integer", "null"] }, "completion_adjusted_roi_usd": { "key$": "completion_adjusted_roi_usd", "type": ["number", "null"] }, "dropout_roi_usd": { "key$": "dropout_roi_usd", "type": ["number", "null"] }, "graduates": { "key$": "graduates", "type": "integer" }, "programs": { "key$": "programs", "type": "integer" }, "ai_exposure": { "description": "le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. NOT displacement. Category rows only; null for subfields and dropped categories.", "key$": "ai_exposure", "properties": { "acs_coverage": { "type": "number" }, "band": { "enum": ["High", "Elevated", "Lower"], "type": "string" }, "score_0_to_1": { "type": "number" }, "top_occupations": { "items": { "properties": { "score": { "description": "AI applicability, 0–1.", "type": "number" }, "share": { "description": "Share of the field’s graduates working here, 0–1.", "type": "number" }, "soc": { "description": "SOC occupation code.", "type": "string" }, "title": { "type": "string" } }, "type": "object" }, "type": "array" } }, "type": ["object", "null"], "x-ref": "#/components/schemas/AiExposure" } }, "x-ref": "#/components/schemas/Major", "index$": 1 }] } } } }, "404": { "description": "Unknown slug (static file does not exist)." } }, "parameters": [{ "name": "slug", "in": "path", "required": true, "description": "Major slug, e.g. philosophy-and-religious-studies or registered-nursing.", "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let slug_ref01_data = Object.values(setup.data.existing.slug)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const slug_ref01_ent = client.Slug();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/slug/SlugTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CollegeRoiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['slug01', 'slug02', 'slug03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COLLEGE_ROI_TEST_SLUG_ENTID': idmap,
        'COLLEGE_ROI_TEST_LIVE': 'FALSE',
        'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COLLEGE_ROI_TEST_SLUG_ENTID'];
    const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COLLEGE_ROI_TEST_SLUG_ENTID'];
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
//# sourceMappingURL=SlugEntity.test.js.map