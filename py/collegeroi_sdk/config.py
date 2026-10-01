# CollegeRoi SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "CollegeRoi",
            "slug": "college-roi",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "name": "colleges",
            "title": "Colleges",
            "type": "`$ARRAY`",
          },
          {
            "name": "page_url",
            "title": "Page Url",
            "type": "`$STRING`",
            "format": "uri",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
          },
          {
            "name": "state_name",
            "title": "State Name",
            "type": "`$STRING`",
          },
        ],
        "name": "best_value",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/rankings/best-value.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "rankings",
                  },
                  {
                    "lit": "best-value.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "best-value.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.states`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "college": {
        "fields": [
          {
            "name": "breakeven_age",
            "title": "Breakeven Age",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "control",
            "title": "Control",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "freopp_program_coverage",
            "title": "Freopp Program Coverage",
            "type": "`$INTEGER`",
            "short": "FREOPP-reported programs rolled into the earnings figure.",
          },
          {
            "name": "median_earnings_10yr_usd",
            "title": "Median Earnings 10yr Usd",
            "type": "`$INTEGER`",
            "short": "FREOPP cohort-weighted earnings ten years after entry.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "npv_30yr_nonresident_usd",
            "title": "Npv 30yr Nonresident Usd",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "short": "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.",
          },
          {
            "name": "npv_30yr_resident_usd",
            "title": "Npv 30yr Resident Usd",
            "type": "`$INTEGER`",
            "req": True,
            "short": "30-year projected net value at resident pricing.",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "req": True,
            "short": "USPS 2-letter state code.",
          },
          {
            "name": "state_name",
            "title": "State Name",
            "type": "`$STRING`",
          },
          {
            "name": "total_cost_of_attendance_nonresident_usd",
            "title": "Total Cost Of Attendance Nonresident Usd",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "total_cost_of_attendance_usd",
            "title": "Total Cost Of Attendance Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "unitid",
            "title": "Unitid",
            "type": "`$INTEGER`",
            "req": True,
            "short": "IPEDS UnitID — the universal join key.",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "The human-readable page for this school.",
            "format": "uri",
          },
        ],
        "name": "college",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/colleges.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "colleges.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "colleges.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.colleges`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/index.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "index.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "index.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "major": {
        "fields": [
          {
            "name": "ai_exposure",
            "title": "Ai Exposure",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "short": "le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.",
          },
          {
            "name": "cip_program_name",
            "title": "Cip Program Name",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "short": "CIP program-family name — subfields only.",
          },
          {
            "name": "completion_adjusted_roi_usd",
            "title": "Completion Adjusted Roi Usd",
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "dropout_roi_usd",
            "title": "Dropout Roi Usd",
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "graduates",
            "title": "Graduates",
            "type": "`$INTEGER`",
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "mean_lifetime_roi_usd",
            "title": "Mean Lifetime Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "median_breakeven_age",
            "title": "Median Breakeven Age",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "median_lifetime_roi_usd",
            "title": "Median Lifetime Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "p25_roi_usd",
            "title": "P25 Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "p75_roi_usd",
            "title": "P75 Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "parent",
            "title": "Parent",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "short": "Parent category — subfields only.",
          },
          {
            "name": "pct_never_breakeven",
            "title": "Pct Never Breakeven",
            "type": "`$NUMBER`",
            "short": "Share of graduates who never break even, percent.",
          },
          {
            "name": "programs",
            "title": "Programs",
            "type": "`$INTEGER`",
          },
          {
            "name": "rank_by_worst_roi",
            "title": "Rank By Worst Roi",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "The human-readable page for this major.",
            "format": "uri",
          },
        ],
        "name": "major",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/majors.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "majors.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "majors.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/openapi.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "openapi.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "openapi.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "out_of_state_penalty": {
        "fields": [
          {
            "name": "institution",
            "title": "Institution",
            "type": "`$STRING`",
          },
          {
            "name": "npv_nonresident_usd",
            "title": "Npv Nonresident Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "npv_resident_usd",
            "title": "Npv Resident Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "oos_penalty_30yr_npv_usd",
            "title": "Oos Penalty 30yr Npv Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$INTEGER`",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
          },
          {
            "name": "tuition_in_state_usd",
            "title": "Tuition In State Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "tuition_out_of_state_usd",
            "title": "Tuition Out Of State Usd",
            "type": "`$INTEGER`",
          },
        ],
        "name": "out_of_state_penalty",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/rankings/out-of-state-penalty.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "rankings",
                  },
                  {
                    "lit": "out-of-state-penalty.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "out-of-state-penalty.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rankings`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "slug": {
        "fields": [
          {
            "name": "ai_exposure",
            "title": "Ai Exposure",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "short": "le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.",
          },
          {
            "name": "breakeven_age",
            "title": "Breakeven Age",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "cip_program_name",
            "title": "Cip Program Name",
            "type": [
              "`$ONE`",
              [
                "`$STRING`",
                "`$NULL`",
              ],
            ],
            "short": "CIP program-family name — subfields only.",
          },
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "completion_adjusted_roi_usd",
            "title": "Completion Adjusted Roi Usd",
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "control",
            "title": "Control",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "dropout_roi_usd",
            "title": "Dropout Roi Usd",
            "type": [
              "`$ONE`",
              [
                "`$NUMBER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "freopp_program_coverage",
            "title": "Freopp Program Coverage",
            "type": "`$INTEGER`",
            "short": "FREOPP-reported programs rolled into the earnings figure.",
          },
          {
            "name": "graduates",
            "title": "Graduates",
            "type": "`$INTEGER`",
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "mean_lifetime_roi_usd",
            "title": "Mean Lifetime Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "median_breakeven_age",
            "title": "Median Breakeven Age",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "median_earnings_10yr_usd",
            "title": "Median Earnings 10yr Usd",
            "type": "`$INTEGER`",
            "short": "FREOPP cohort-weighted earnings ten years after entry.",
          },
          {
            "name": "median_lifetime_roi_usd",
            "title": "Median Lifetime Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "meta",
            "title": "Meta",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Provenance block carried by every payload.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "npv_30yr_nonresident_usd",
            "title": "Npv 30yr Nonresident Usd",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
            "short": "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.",
          },
          {
            "name": "npv_30yr_resident_usd",
            "title": "Npv 30yr Resident Usd",
            "type": "`$INTEGER`",
            "req": True,
            "short": "30-year projected net value at resident pricing.",
          },
          {
            "name": "p25_roi_usd",
            "title": "P25 Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "p75_roi_usd",
            "title": "P75 Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "parent",
            "title": "Parent",
            "type": [
              "`$ONE`",
              [
                "`$OBJECT`",
                "`$NULL`",
              ],
            ],
            "short": "Parent category — subfields only.",
          },
          {
            "name": "pct_never_breakeven",
            "title": "Pct Never Breakeven",
            "type": "`$NUMBER`",
            "short": "Share of graduates who never break even, percent.",
          },
          {
            "name": "programs",
            "title": "Programs",
            "type": "`$INTEGER`",
          },
          {
            "name": "rank_by_worst_roi",
            "title": "Rank By Worst Roi",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "req": True,
            "short": "USPS 2-letter state code.",
          },
          {
            "name": "state_name",
            "title": "State Name",
            "type": "`$STRING`",
          },
          {
            "name": "total_cost_of_attendance_nonresident_usd",
            "title": "Total Cost Of Attendance Nonresident Usd",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "total_cost_of_attendance_usd",
            "title": "Total Cost Of Attendance Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "unitid",
            "title": "Unitid",
            "type": "`$INTEGER`",
            "req": True,
            "short": "IPEDS UnitID — the universal join key.",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "The human-readable page for this school.",
            "format": "uri",
          },
        ],
        "name": "slug",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/colleges/{slug}.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "colleges",
                  },
                  {
                    "lit": "{slug}.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "colleges",
                  "{slug}.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/majors/{slug}.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "majors",
                  },
                  {
                    "lit": "{slug}.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "majors",
                  "{slug}.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "slug",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "state": {
        "fields": [
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
          },
          {
            "name": "control",
            "title": "Control",
            "type": "`$STRING`",
          },
          {
            "name": "institution",
            "title": "Institution",
            "type": "`$STRING`",
          },
          {
            "name": "npv_30yr_resident_usd",
            "title": "Npv 30yr Resident Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "rank_in_state",
            "title": "Rank In State",
            "type": "`$INTEGER`",
          },
        ],
        "name": "state",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/rankings/best-value/{state}.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "rankings",
                  },
                  {
                    "lit": "best-value",
                  },
                  {
                    "lit": "{state}.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "best-value",
                  "{state}.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.colleges`",
                },
                "args": {
                  "params": [
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "state",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "top_50": {
        "fields": [
          {
            "name": "institution",
            "title": "Institution",
            "type": "`$STRING`",
          },
          {
            "name": "npv_nonresident_usd",
            "title": "Npv Nonresident Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "npv_resident_usd",
            "title": "Npv Resident Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "oos_penalty_30yr_npv_usd",
            "title": "Oos Penalty 30yr Npv Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$INTEGER`",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
          },
          {
            "name": "tuition_in_state_usd",
            "title": "Tuition In State Usd",
            "type": "`$INTEGER`",
          },
          {
            "name": "tuition_out_of_state_usd",
            "title": "Tuition Out Of State Usd",
            "type": "`$INTEGER`",
          },
        ],
        "name": "top_50",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/rankings/out-of-state-penalty/top-50.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "rankings",
                  },
                  {
                    "lit": "out-of-state-penalty",
                  },
                  {
                    "lit": "top-50.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "out-of-state-penalty",
                  "top-50.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rankings`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "worst_roi_major": {
        "fields": [
          {
            "name": "graduates",
            "title": "Graduates",
            "type": "`$INTEGER`",
          },
          {
            "name": "mean_lifetime_roi_usd",
            "title": "Mean Lifetime Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "median_breakeven_age",
            "title": "Median Breakeven Age",
            "type": [
              "`$ONE`",
              [
                "`$INTEGER`",
                "`$NULL`",
              ],
            ],
          },
          {
            "name": "median_lifetime_roi_usd",
            "title": "Median Lifetime Roi Usd",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "pct_never_breakeven",
            "title": "Pct Never Breakeven",
            "type": "`$NUMBER`",
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$INTEGER`",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "format": "uri",
          },
        ],
        "name": "worst_roi_major",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/rankings/worst-roi-majors.json",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "rankings",
                  },
                  {
                    "lit": "worst-roi-majors.json",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "rankings",
                  "worst-roi-majors.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rankings`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
