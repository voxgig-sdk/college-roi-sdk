"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "best_value",
        "accessor": "BestValue",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/rankings/best-value.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "meta": {
                "data_vintage": "x",
                "doi": "x",
                "generated": "2026-01-01",
                "license": "x",
                "source": "x",
                "url": "x"
            },
            "title": "x",
            "description": "x",
            "page_url": "x",
            "count": 1,
            "states": [
                {
                    "colleges": [
                        {
                            "city": "x",
                            "control": "x",
                            "institution": "x",
                            "npv_30yr_resident_usd": 1,
                            "rank_in_state": 1
                        }
                    ],
                    "page_url": "x",
                    "state": "x",
                    "state_name": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "college",
        "accessor": "College",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/colleges.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "meta": {
                "data_vintage": "x",
                "doi": "x",
                "generated": "2026-01-01",
                "license": "x",
                "source": "x",
                "url": "x"
            },
            "count": 1,
            "notes": [
                "x"
            ],
            "colleges": [
                {
                    "breakeven_age": 1,
                    "city": "x",
                    "control": "public",
                    "freopp_program_coverage": 1,
                    "median_earnings_10yr_usd": 1,
                    "name": "x",
                    "npv_30yr_nonresident_usd": 1,
                    "npv_30yr_resident_usd": 1,
                    "slug": "x",
                    "state": "x",
                    "state_name": "x",
                    "total_cost_of_attendance_nonresident_usd": 1,
                    "total_cost_of_attendance_usd": 1,
                    "unitid": 1,
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "index",
        "accessor": "Index",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/index.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "major",
        "accessor": "Major",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/majors.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "meta": {
                "data_vintage": "x",
                "doi": "x",
                "generated": "2026-01-01",
                "license": "x",
                "source": "x",
                "url": "x"
            },
            "count": 1,
            "categories": 1,
            "subfields": 1,
            "notes": [
                "x"
            ],
            "majors": [
                {
                    "ai_exposure": {
                        "acs_coverage": 1,
                        "band": "High",
                        "score_0_to_1": 1,
                        "top_occupations": [
                            {
                                "score": 1,
                                "share": 1,
                                "soc": "x",
                                "title": "x"
                            }
                        ]
                    },
                    "cip_program_name": "x",
                    "completion_adjusted_roi_usd": 1,
                    "dropout_roi_usd": 1,
                    "graduates": 1,
                    "kind": "category",
                    "mean_lifetime_roi_usd": 1,
                    "median_breakeven_age": 1,
                    "median_lifetime_roi_usd": 1,
                    "name": "x",
                    "p25_roi_usd": 1,
                    "p75_roi_usd": 1,
                    "parent": {
                        "name": "x",
                        "slug": "x"
                    },
                    "pct_never_breakeven": 1,
                    "programs": 1,
                    "rank_by_worst_roi": 1,
                    "slug": "x",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "openapi",
        "accessor": "Openapi",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/openapi.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "out_of_state_penalty",
        "accessor": "OutOfStatePenalty",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/rankings/out-of-state-penalty.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "meta": {
                "data_vintage": "x",
                "doi": "x",
                "generated": "2026-01-01",
                "license": "x",
                "source": "x",
                "url": "x"
            },
            "title": "x",
            "description": "x",
            "page_url": "x",
            "count": 1,
            "rankings": [
                {
                    "institution": "x",
                    "npv_nonresident_usd": 1,
                    "npv_resident_usd": 1,
                    "oos_penalty_30yr_npv_usd": 1,
                    "rank": 1,
                    "state": "x",
                    "tuition_in_state_usd": 1,
                    "tuition_out_of_state_usd": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "state",
        "accessor": "State",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/rankings/best-value/{state}.json",
        "args": [
            {
                "name": "state",
                "wire": "state",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "meta": {
                "data_vintage": "x",
                "doi": "x",
                "generated": "2026-01-01",
                "license": "x",
                "source": "x",
                "url": "x"
            },
            "title": "x",
            "description": "x",
            "page_url": "x",
            "state": "x",
            "state_name": "x",
            "count": 1,
            "colleges": [
                {
                    "city": "x",
                    "control": "x",
                    "institution": "x",
                    "npv_30yr_resident_usd": 1,
                    "rank_in_state": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "top_50",
        "accessor": "Top50",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/rankings/out-of-state-penalty/top-50.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "meta": {
                "data_vintage": "x",
                "doi": "x",
                "generated": "2026-01-01",
                "license": "x",
                "source": "x",
                "url": "x"
            },
            "title": "x",
            "description": "x",
            "page_url": "x",
            "count": 1,
            "rankings": [
                {
                    "institution": "x",
                    "npv_nonresident_usd": 1,
                    "npv_resident_usd": 1,
                    "oos_penalty_30yr_npv_usd": 1,
                    "rank": 1,
                    "state": "x",
                    "tuition_in_state_usd": 1,
                    "tuition_out_of_state_usd": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "worst_roi_major",
        "accessor": "WorstRoiMajor",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/rankings/worst-roi-majors.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "meta": {
                "data_vintage": "x",
                "doi": "x",
                "generated": "2026-01-01",
                "license": "x",
                "source": "x",
                "url": "x"
            },
            "title": "x",
            "description": "x",
            "page_url": "x",
            "count": 1,
            "rankings": [
                {
                    "graduates": 1,
                    "mean_lifetime_roi_usd": 1,
                    "median_breakeven_age": 1,
                    "median_lifetime_roi_usd": 1,
                    "name": "x",
                    "pct_never_breakeven": 1,
                    "rank": 1,
                    "slug": "x",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map