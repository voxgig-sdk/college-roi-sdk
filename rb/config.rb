# CollegeRoi SDK configuration

module CollegeRoiConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "CollegeRoi",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://le-teen.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "best_value" => {},
          "college" => {},
          "index" => {},
          "major" => {},
          "openapi" => {},
          "out_of_state_penalty" => {},
          "slug" => {},
          "state" => {},
          "top_50" => {},
          "worst_roi_major" => {},
        },
      },
      "entity" => {
        "best_value" => {
          "fields" => [
            {
              "name" => "colleges",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "page_url",
              "type" => "`$STRING`",
            },
            {
              "name" => "state",
              "type" => "`$STRING`",
            },
            {
              "name" => "state_name",
              "type" => "`$STRING`",
            },
          ],
          "name" => "best_value",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/rankings/best-value.json",
                  "parts" => [
                    "api",
                    "v1",
                    "rankings",
                    "best-value.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "college" => {
          "fields" => [
            {
              "name" => "breakeven_age",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "city",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "control",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "freopp_program_coverage",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "median_earnings_10yr_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "npv_30yr_nonresident_usd",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "npv_30yr_resident_usd",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "slug",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "state",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "state_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_cost_of_attendance_nonresident_usd",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "total_cost_of_attendance_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "unitid",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "url",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "college",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/colleges.json",
                  "parts" => [
                    "api",
                    "v1",
                    "colleges.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "index" => {
          "fields" => [],
          "name" => "index",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/index.json",
                  "parts" => [
                    "api",
                    "v1",
                    "index.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "major" => {
          "fields" => [
            {
              "name" => "ai_exposure",
              "type" => [
                "`$ONE`",
                [
                  "`$OBJECT`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "cip_program_name",
              "type" => [
                "`$ONE`",
                [
                  "`$STRING`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "completion_adjusted_roi_usd",
              "type" => [
                "`$ONE`",
                [
                  "`$NUMBER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "dropout_roi_usd",
              "type" => [
                "`$ONE`",
                [
                  "`$NUMBER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "graduates",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "kind",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "mean_lifetime_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "median_breakeven_age",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "median_lifetime_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "p25_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "p75_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "parent",
              "type" => [
                "`$ONE`",
                [
                  "`$OBJECT`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "pct_never_breakeven",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "programs",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rank_by_worst_roi",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "slug",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "major",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/majors.json",
                  "parts" => [
                    "api",
                    "v1",
                    "majors.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "openapi" => {
          "fields" => [],
          "name" => "openapi",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/openapi.json",
                  "parts" => [
                    "api",
                    "v1",
                    "openapi.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "out_of_state_penalty" => {
          "fields" => [
            {
              "name" => "institution",
              "type" => "`$STRING`",
            },
            {
              "name" => "npv_nonresident_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "npv_resident_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "oos_penalty_30yr_npv_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rank",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "state",
              "type" => "`$STRING`",
            },
            {
              "name" => "tuition_in_state_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "tuition_out_of_state_usd",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "out_of_state_penalty",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/rankings/out-of-state-penalty.json",
                  "parts" => [
                    "api",
                    "v1",
                    "rankings",
                    "out-of-state-penalty.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "slug" => {
          "fields" => [
            {
              "name" => "ai_exposure",
              "type" => [
                "`$ONE`",
                [
                  "`$OBJECT`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "breakeven_age",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "cip_program_name",
              "type" => [
                "`$ONE`",
                [
                  "`$STRING`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "city",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "completion_adjusted_roi_usd",
              "type" => [
                "`$ONE`",
                [
                  "`$NUMBER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "control",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "dropout_roi_usd",
              "type" => [
                "`$ONE`",
                [
                  "`$NUMBER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "freopp_program_coverage",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "graduates",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "kind",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "mean_lifetime_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "median_breakeven_age",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "median_earnings_10yr_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "median_lifetime_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "meta",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "npv_30yr_nonresident_usd",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "npv_30yr_resident_usd",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "p25_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "p75_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "parent",
              "type" => [
                "`$ONE`",
                [
                  "`$OBJECT`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "pct_never_breakeven",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "programs",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rank_by_worst_roi",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "slug",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "state",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "state_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_cost_of_attendance_nonresident_usd",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "total_cost_of_attendance_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "unitid",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "url",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "slug",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "slug",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/colleges/{slug}.json",
                  "parts" => [
                    "api",
                    "v1",
                    "colleges",
                    "{slug}.json",
                  ],
                  "select" => {
                    "exist" => [
                      "slug",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "slug",
                        "orig" => "slug",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/majors/{slug}.json",
                  "parts" => [
                    "api",
                    "v1",
                    "majors",
                    "{slug}.json",
                  ],
                  "select" => {
                    "exist" => [
                      "slug",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "college",
              ],
              [
                "major",
              ],
            ],
          },
        },
        "state" => {
          "fields" => [
            {
              "name" => "city",
              "type" => "`$STRING`",
            },
            {
              "name" => "control",
              "type" => "`$STRING`",
            },
            {
              "name" => "institution",
              "type" => "`$STRING`",
            },
            {
              "name" => "npv_30yr_resident_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rank_in_state",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "state",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "state",
                        "orig" => "state",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/rankings/best-value/{state}.json",
                  "parts" => [
                    "api",
                    "v1",
                    "rankings",
                    "best-value",
                    "{state}.json",
                  ],
                  "select" => {
                    "exist" => [
                      "state",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "best_value",
              ],
            ],
          },
        },
        "top_50" => {
          "fields" => [
            {
              "name" => "institution",
              "type" => "`$STRING`",
            },
            {
              "name" => "npv_nonresident_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "npv_resident_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "oos_penalty_30yr_npv_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rank",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "state",
              "type" => "`$STRING`",
            },
            {
              "name" => "tuition_in_state_usd",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "tuition_out_of_state_usd",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "top_50",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/rankings/out-of-state-penalty/top-50.json",
                  "parts" => [
                    "api",
                    "v1",
                    "rankings",
                    "out-of-state-penalty",
                    "top-50.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "worst_roi_major" => {
          "fields" => [
            {
              "name" => "graduates",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "mean_lifetime_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "median_breakeven_age",
              "type" => [
                "`$ONE`",
                [
                  "`$INTEGER`",
                  "`$NULL`",
                ],
              ],
            },
            {
              "name" => "median_lifetime_roi_usd",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "pct_never_breakeven",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "rank",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "slug",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
          ],
          "name" => "worst_roi_major",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/rankings/worst-roi-majors.json",
                  "parts" => [
                    "api",
                    "v1",
                    "rankings",
                    "worst-roi-majors.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CollegeRoiFeatures.make_feature(name)
  end
end
