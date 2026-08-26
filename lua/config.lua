-- CollegeRoi SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "CollegeRoi",
      slug = "college-roi",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://le-teen.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["best_value"] = {},
        ["college"] = {},
        ["index"] = {},
        ["major"] = {},
        ["openapi"] = {},
        ["out_of_state_penalty"] = {},
        ["slug"] = {},
        ["state"] = {},
        ["top_50"] = {},
        ["worst_roi_major"] = {},
      },
    },
    entity = {
      ["best_value"] = {
        ["fields"] = {
          {
            ["name"] = "colleges",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "page_url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state_name",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "best_value",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/rankings/best-value.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "rankings",
                  "best-value.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["college"] = {
        ["fields"] = {
          {
            ["name"] = "breakeven_age",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "city",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "control",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "freopp_program_coverage",
            ["short"] = "FREOPP-reported programs rolled into the earnings figure.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "median_earnings_10yr_usd",
            ["short"] = "FREOPP cohort-weighted earnings ten years after entry.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "npv_30yr_nonresident_usd",
            ["short"] = "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "npv_30yr_resident_usd",
            ["req"] = true,
            ["short"] = "30-year projected net value at resident pricing.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "slug",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state",
            ["req"] = true,
            ["short"] = "USPS 2-letter state code.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state_name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "total_cost_of_attendance_nonresident_usd",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "total_cost_of_attendance_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "unitid",
            ["req"] = true,
            ["short"] = "IPEDS UnitID — the universal join key.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "url",
            ["req"] = true,
            ["short"] = "The human-readable page for this school.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "college",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/colleges.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "colleges.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["index"] = {
        ["fields"] = {},
        ["name"] = "index",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/index.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "index.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["major"] = {
        ["fields"] = {
          {
            ["name"] = "ai_exposure",
            ["short"] = "le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.",
            ["type"] = {
              "`$ONE`",
              {
                "`$OBJECT`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "cip_program_name",
            ["short"] = "CIP program-family name — subfields only.",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "completion_adjusted_roi_usd",
            ["type"] = {
              "`$ONE`",
              {
                "`$NUMBER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "dropout_roi_usd",
            ["type"] = {
              "`$ONE`",
              {
                "`$NUMBER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "graduates",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "kind",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mean_lifetime_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "median_breakeven_age",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "median_lifetime_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "p25_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "p75_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "parent",
            ["short"] = "Parent category — subfields only.",
            ["type"] = {
              "`$ONE`",
              {
                "`$OBJECT`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "pct_never_breakeven",
            ["short"] = "Share of graduates who never break even, percent.",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "programs",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rank_by_worst_roi",
            ["req"] = true,
            ["short"] = "Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "slug",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["req"] = true,
            ["short"] = "The human-readable page for this major.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "major",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/majors.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "majors.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["openapi"] = {
        ["fields"] = {},
        ["name"] = "openapi",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/openapi.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "openapi.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["out_of_state_penalty"] = {
        ["fields"] = {
          {
            ["name"] = "institution",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "npv_nonresident_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "npv_resident_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "oos_penalty_30yr_npv_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rank",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "state",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tuition_in_state_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "tuition_out_of_state_usd",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "out_of_state_penalty",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/rankings/out-of-state-penalty.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "rankings",
                  "out-of-state-penalty.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["slug"] = {
        ["fields"] = {
          {
            ["name"] = "ai_exposure",
            ["short"] = "le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.",
            ["type"] = {
              "`$ONE`",
              {
                "`$OBJECT`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "breakeven_age",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "cip_program_name",
            ["short"] = "CIP program-family name — subfields only.",
            ["type"] = {
              "`$ONE`",
              {
                "`$STRING`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "city",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "completion_adjusted_roi_usd",
            ["type"] = {
              "`$ONE`",
              {
                "`$NUMBER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "control",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "dropout_roi_usd",
            ["type"] = {
              "`$ONE`",
              {
                "`$NUMBER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "freopp_program_coverage",
            ["short"] = "FREOPP-reported programs rolled into the earnings figure.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "graduates",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "kind",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mean_lifetime_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "median_breakeven_age",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "median_earnings_10yr_usd",
            ["short"] = "FREOPP cohort-weighted earnings ten years after entry.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "median_lifetime_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "meta",
            ["req"] = true,
            ["short"] = "Provenance block carried by every payload.",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "npv_30yr_nonresident_usd",
            ["short"] = "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "npv_30yr_resident_usd",
            ["req"] = true,
            ["short"] = "30-year projected net value at resident pricing.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "p25_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "p75_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "parent",
            ["short"] = "Parent category — subfields only.",
            ["type"] = {
              "`$ONE`",
              {
                "`$OBJECT`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "pct_never_breakeven",
            ["short"] = "Share of graduates who never break even, percent.",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "programs",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rank_by_worst_roi",
            ["req"] = true,
            ["short"] = "Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "slug",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state",
            ["req"] = true,
            ["short"] = "USPS 2-letter state code.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state_name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "total_cost_of_attendance_nonresident_usd",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "total_cost_of_attendance_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "unitid",
            ["req"] = true,
            ["short"] = "IPEDS UnitID — the universal join key.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "url",
            ["req"] = true,
            ["short"] = "The human-readable page for this school.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "slug",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "slug",
                      ["orig"] = "slug",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/colleges/{slug}.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "colleges",
                  "{slug}.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "slug",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "slug",
                      ["orig"] = "slug",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/majors/{slug}.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "majors",
                  "{slug}.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "slug",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "college",
            },
            {
              "major",
            },
          },
        },
      },
      ["state"] = {
        ["fields"] = {
          {
            ["name"] = "city",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "control",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "institution",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "npv_30yr_resident_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rank_in_state",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "state",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/rankings/best-value/{state}.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "rankings",
                  "best-value",
                  "{state}.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "state",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "best_value",
            },
          },
        },
      },
      ["top_50"] = {
        ["fields"] = {
          {
            ["name"] = "institution",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "npv_nonresident_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "npv_resident_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "oos_penalty_30yr_npv_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rank",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "state",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tuition_in_state_usd",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "tuition_out_of_state_usd",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "top_50",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/rankings/out-of-state-penalty/top-50.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "rankings",
                  "out-of-state-penalty",
                  "top-50.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["worst_roi_major"] = {
        ["fields"] = {
          {
            ["name"] = "graduates",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "mean_lifetime_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "median_breakeven_age",
            ["type"] = {
              "`$ONE`",
              {
                "`$INTEGER`",
                "`$NULL`",
              },
            },
          },
          {
            ["name"] = "median_lifetime_roi_usd",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pct_never_breakeven",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "rank",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "slug",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "worst_roi_major",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/rankings/worst-roi-majors.json",
                ["parts"] = {
                  "api",
                  "v1",
                  "rankings",
                  "worst-roi-majors.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
