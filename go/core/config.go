package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CollegeRoi",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://le-teen.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"best_value": map[string]any{},
				"college": map[string]any{},
				"index": map[string]any{},
				"major": map[string]any{},
				"openapi": map[string]any{},
				"out_of_state_penalty": map[string]any{},
				"slug": map[string]any{},
				"state": map[string]any{},
				"top_50": map[string]any{},
				"worst_roi_major": map[string]any{},
			},
		},
		"entity": map[string]any{
			"best_value": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "colleges",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "page_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state_name",
						"type": "`$STRING`",
					},
				},
				"name": "best_value",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/best-value.json",
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"best-value.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"college": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "breakeven_age",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "city",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "control",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "freopp_program_coverage",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "median_earnings_10yr_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "npv_30yr_nonresident_usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "npv_30yr_resident_usd",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "slug",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_cost_of_attendance_nonresident_usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "total_cost_of_attendance_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "unitid",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "college",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/colleges.json",
								"parts": []any{
									"api",
									"v1",
									"colleges.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"index": map[string]any{
				"fields": []any{},
				"name": "index",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/index.json",
								"parts": []any{
									"api",
									"v1",
									"index.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"major": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ai_exposure",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "cip_program_name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "completion_adjusted_roi_usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "dropout_roi_usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "graduates",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "kind",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mean_lifetime_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "median_breakeven_age",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "median_lifetime_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "p25_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "p75_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "parent",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "pct_never_breakeven",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "programs",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank_by_worst_roi",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "slug",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "major",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/majors.json",
								"parts": []any{
									"api",
									"v1",
									"majors.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"openapi": map[string]any{
				"fields": []any{},
				"name": "openapi",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/openapi.json",
								"parts": []any{
									"api",
									"v1",
									"openapi.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"out_of_state_penalty": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "institution",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "npv_nonresident_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "npv_resident_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "oos_penalty_30yr_npv_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tuition_in_state_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tuition_out_of_state_usd",
						"type": "`$INTEGER`",
					},
				},
				"name": "out_of_state_penalty",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/out-of-state-penalty.json",
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"out-of-state-penalty.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"slug": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ai_exposure",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "breakeven_age",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "cip_program_name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "city",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "completion_adjusted_roi_usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "control",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dropout_roi_usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "freopp_program_coverage",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "graduates",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "kind",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mean_lifetime_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "median_breakeven_age",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "median_earnings_10yr_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "median_lifetime_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "meta",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "npv_30yr_nonresident_usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "npv_30yr_resident_usd",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "p25_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "p75_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "parent",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "pct_never_breakeven",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "programs",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank_by_worst_roi",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "slug",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_cost_of_attendance_nonresident_usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "total_cost_of_attendance_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "unitid",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "slug",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "slug",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/colleges/{slug}.json",
								"parts": []any{
									"api",
									"v1",
									"colleges",
									"{slug}.json",
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "slug",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/majors/{slug}.json",
								"parts": []any{
									"api",
									"v1",
									"majors",
									"{slug}.json",
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"college",
						},
						[]any{
							"major",
						},
					},
				},
			},
			"state": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "control",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "institution",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "npv_30yr_resident_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank_in_state",
						"type": "`$INTEGER`",
					},
				},
				"name": "state",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "state",
											"orig": "state",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/best-value/{state}.json",
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"best-value",
									"{state}.json",
								},
								"select": map[string]any{
									"exist": []any{
										"state",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"best_value",
						},
					},
				},
			},
			"top_50": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "institution",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "npv_nonresident_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "npv_resident_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "oos_penalty_30yr_npv_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tuition_in_state_usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tuition_out_of_state_usd",
						"type": "`$INTEGER`",
					},
				},
				"name": "top_50",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/out-of-state-penalty/top-50.json",
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"out-of-state-penalty",
									"top-50.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"worst_roi_major": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "graduates",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mean_lifetime_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "median_breakeven_age",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
					},
					map[string]any{
						"name": "median_lifetime_roi_usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pct_never_breakeven",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "worst_roi_major",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/worst-roi-majors.json",
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"worst-roi-majors.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
