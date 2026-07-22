# CollegeRoi SDK configuration


def make_config():
    return {
        "main": {
            "name": "CollegeRoi",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://le-teen.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "best_value": {},
                "college": {},
                "index": {},
                "major": {},
                "openapi": {},
                "out_of_state_penalty": {},
                "slug": {},
                "state": {},
                "top_50": {},
                "worst_roi_major": {},
            },
        },
        "entity": {
      "best_value": {
        "fields": [
          {
            "active": True,
            "name": "college",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "page_url",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "state",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "state_name",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "best_value",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/v1/rankings/best-value.json",
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "best-value.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "college": {
        "fields": [
          {
            "active": True,
            "name": "breakeven_age",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "index$": 0,
          },
          {
            "active": True,
            "name": "city",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "control",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "freopp_program_coverage",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "median_earnings_10yr_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "npv_30yr_nonresident_usd",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "index$": 6,
          },
          {
            "active": True,
            "name": "npv_30yr_resident_usd",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "slug",
            "req": True,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "state",
            "req": True,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "state_name",
            "req": False,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "total_cost_of_attendance_nonresident_usd",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "index$": 11,
          },
          {
            "active": True,
            "name": "total_cost_of_attendance_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "unitid",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "url",
            "req": True,
            "type": "`$STRING`",
            "index$": 14,
          },
        ],
        "name": "college",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/v1/colleges.json",
                "parts": [
                  "api",
                  "v1",
                  "colleges.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "index": {
        "fields": [],
        "name": "index",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/v1/index.json",
                "parts": [
                  "api",
                  "v1",
                  "index.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "major": {
        "fields": [
          {
            "active": True,
            "name": "ai_exposure",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "index$": 0,
          },
          {
            "active": True,
            "name": "cip_program_name",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "index$": 1,
          },
          {
            "active": True,
            "name": "completion_adjusted_roi_usd",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
            "index$": 2,
          },
          {
            "active": True,
            "name": "dropout_roi_usd",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
            "index$": 3,
          },
          {
            "active": True,
            "name": "graduate",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "kind",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "mean_lifetime_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "median_breakeven_age",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "index$": 7,
          },
          {
            "active": True,
            "name": "median_lifetime_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "p25_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "p75_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "parent",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "index$": 12,
          },
          {
            "active": True,
            "name": "pct_never_breakeven",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "program",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "rank_by_worst_roi",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "slug",
            "req": True,
            "type": "`$STRING`",
            "index$": 16,
          },
          {
            "active": True,
            "name": "url",
            "req": True,
            "type": "`$STRING`",
            "index$": 17,
          },
        ],
        "name": "major",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/v1/majors.json",
                "parts": [
                  "api",
                  "v1",
                  "majors.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "openapi": {
        "fields": [],
        "name": "openapi",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/v1/openapi.json",
                "parts": [
                  "api",
                  "v1",
                  "openapi.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "out_of_state_penalty": {
        "fields": [
          {
            "active": True,
            "name": "institution",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "npv_nonresident_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "npv_resident_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "oos_penalty_30yr_npv_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "rank",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "state",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "tuition_in_state_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "tuition_out_of_state_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 7,
          },
        ],
        "name": "out_of_state_penalty",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/v1/rankings/out-of-state-penalty.json",
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "out-of-state-penalty.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "slug": {
        "fields": [
          {
            "active": True,
            "name": "ai_exposure",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "index$": 0,
          },
          {
            "active": True,
            "name": "breakeven_age",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "index$": 1,
          },
          {
            "active": True,
            "name": "cip_program_name",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "index$": 2,
          },
          {
            "active": True,
            "name": "city",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "completion_adjusted_roi_usd",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
            "index$": 4,
          },
          {
            "active": True,
            "name": "control",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "dropout_roi_usd",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
            "index$": 6,
          },
          {
            "active": True,
            "name": "freopp_program_coverage",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "graduate",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "kind",
            "req": True,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "mean_lifetime_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "median_breakeven_age",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "index$": 11,
          },
          {
            "active": True,
            "name": "median_earnings_10yr_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "median_lifetime_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "meta",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "npv_30yr_nonresident_usd",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "index$": 16,
          },
          {
            "active": True,
            "name": "npv_30yr_resident_usd",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 17,
          },
          {
            "active": True,
            "name": "p25_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 18,
          },
          {
            "active": True,
            "name": "p75_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 19,
          },
          {
            "active": True,
            "name": "parent",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "index$": 20,
          },
          {
            "active": True,
            "name": "pct_never_breakeven",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 21,
          },
          {
            "active": True,
            "name": "program",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 22,
          },
          {
            "active": True,
            "name": "rank_by_worst_roi",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 23,
          },
          {
            "active": True,
            "name": "slug",
            "req": True,
            "type": "`$STRING`",
            "index$": 24,
          },
          {
            "active": True,
            "name": "state",
            "req": True,
            "type": "`$STRING`",
            "index$": 25,
          },
          {
            "active": True,
            "name": "state_name",
            "req": False,
            "type": "`$STRING`",
            "index$": 26,
          },
          {
            "active": True,
            "name": "total_cost_of_attendance_nonresident_usd",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "index$": 27,
          },
          {
            "active": True,
            "name": "total_cost_of_attendance_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 28,
          },
          {
            "active": True,
            "name": "unitid",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 29,
          },
          {
            "active": True,
            "name": "url",
            "req": True,
            "type": "`$STRING`",
            "index$": 30,
          },
        ],
        "name": "slug",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/v1/colleges/{slug}.json",
                "parts": [
                  "api",
                  "v1",
                  "colleges",
                  "{slug}.json",
                ],
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/v1/majors/{slug}.json",
                "parts": [
                  "api",
                  "v1",
                  "majors",
                  "{slug}.json",
                ],
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "college",
            ],
            [
              "major",
            ],
          ],
        },
      },
      "state": {
        "fields": [
          {
            "active": True,
            "name": "city",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "control",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "institution",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "npv_30yr_resident_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "rank_in_state",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
        ],
        "name": "state",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "state",
                      "orig": "state",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/v1/rankings/best-value/{state}.json",
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "best-value",
                  "{state}.json",
                ],
                "select": {
                  "exist": [
                    "state",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [
            [
              "best_value",
            ],
          ],
        },
      },
      "top_50": {
        "fields": [
          {
            "active": True,
            "name": "institution",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "npv_nonresident_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "npv_resident_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "oos_penalty_30yr_npv_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "rank",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "state",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "tuition_in_state_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "tuition_out_of_state_usd",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 7,
          },
        ],
        "name": "top_50",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/v1/rankings/out-of-state-penalty/top-50.json",
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "out-of-state-penalty",
                  "top-50.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "worst_roi_major": {
        "fields": [
          {
            "active": True,
            "name": "graduate",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "mean_lifetime_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "median_breakeven_age",
            "req": False,
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "index$": 2,
          },
          {
            "active": True,
            "name": "median_lifetime_roi_usd",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "pct_never_breakeven",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "rank",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "slug",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "url",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
        ],
        "name": "worst_roi_major",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/v1/rankings/worst-roi-majors.json",
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "worst-roi-majors.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
