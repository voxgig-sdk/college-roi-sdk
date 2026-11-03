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
			"slug": "college-roi",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Colleges",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "page_url",
						"title": "Page Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state_name",
						"title": "State Name",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/best-value.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "rankings",
									},
									map[string]any{
										"lit": "best-value.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"best-value.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.states`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Breakeven Age",
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
						"title": "City",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "control",
						"title": "Control",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "freopp_program_coverage",
						"title": "Freopp Program Coverage",
						"type": "`$INTEGER`",
						"short": "FREOPP-reported programs rolled into the earnings figure.",
					},
					map[string]any{
						"name": "median_earnings_10yr_usd",
						"title": "Median Earnings 10yr Usd",
						"type": "`$INTEGER`",
						"short": "FREOPP cohort-weighted earnings ten years after entry.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "npv_30yr_nonresident_usd",
						"title": "Npv 30yr Nonresident Usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.",
					},
					map[string]any{
						"name": "npv_30yr_resident_usd",
						"title": "Npv 30yr Resident Usd",
						"type": "`$INTEGER`",
						"req": true,
						"short": "30-year projected net value at resident pricing.",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"req": true,
						"short": "USPS 2-letter state code.",
					},
					map[string]any{
						"name": "state_name",
						"title": "State Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_cost_of_attendance_nonresident_usd",
						"title": "Total Cost Of Attendance Nonresident Usd",
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
						"title": "Total Cost Of Attendance Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "unitid",
						"title": "Unitid",
						"type": "`$INTEGER`",
						"req": true,
						"short": "IPEDS UnitID — the universal join key.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The human-readable page for this school.",
						"format": "uri",
					},
				},
				"name": "college",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/colleges.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "colleges.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"colleges.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.colleges`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/index.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "index.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"index.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Ai Exposure",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"short": "le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.",
					},
					map[string]any{
						"name": "cip_program_name",
						"title": "Cip Program Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "CIP program-family name — subfields only.",
					},
					map[string]any{
						"name": "completion_adjusted_roi_usd",
						"title": "Completion Adjusted Roi Usd",
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
						"title": "Dropout Roi Usd",
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
						"title": "Graduates",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "mean_lifetime_roi_usd",
						"title": "Mean Lifetime Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "median_breakeven_age",
						"title": "Median Breakeven Age",
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
						"title": "Median Lifetime Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "p25_roi_usd",
						"title": "P25 Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "p75_roi_usd",
						"title": "P75 Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "parent",
						"title": "Parent",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"short": "Parent category — subfields only.",
					},
					map[string]any{
						"name": "pct_never_breakeven",
						"title": "Pct Never Breakeven",
						"type": "`$NUMBER`",
						"short": "Share of graduates who never break even, percent.",
					},
					map[string]any{
						"name": "programs",
						"title": "Programs",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank_by_worst_roi",
						"title": "Rank By Worst Roi",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The human-readable page for this major.",
						"format": "uri",
					},
				},
				"name": "major",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/majors.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "majors.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"majors.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/openapi.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "openapi.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"openapi.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Institution",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "npv_nonresident_usd",
						"title": "Npv Nonresident Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "npv_resident_usd",
						"title": "Npv Resident Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "oos_penalty_30yr_npv_usd",
						"title": "Oos Penalty 30yr Npv Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tuition_in_state_usd",
						"title": "Tuition In State Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tuition_out_of_state_usd",
						"title": "Tuition Out Of State Usd",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/out-of-state-penalty.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "rankings",
									},
									map[string]any{
										"lit": "out-of-state-penalty.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"out-of-state-penalty.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rankings`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Ai Exposure",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"short": "le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.",
					},
					map[string]any{
						"name": "breakeven_age",
						"title": "Breakeven Age",
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
						"title": "Cip Program Name",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "CIP program-family name — subfields only.",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "completion_adjusted_roi_usd",
						"title": "Completion Adjusted Roi Usd",
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
						"title": "Control",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "dropout_roi_usd",
						"title": "Dropout Roi Usd",
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
						"title": "Freopp Program Coverage",
						"type": "`$INTEGER`",
						"short": "FREOPP-reported programs rolled into the earnings figure.",
					},
					map[string]any{
						"name": "graduates",
						"title": "Graduates",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "mean_lifetime_roi_usd",
						"title": "Mean Lifetime Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "median_breakeven_age",
						"title": "Median Breakeven Age",
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
						"title": "Median Earnings 10yr Usd",
						"type": "`$INTEGER`",
						"short": "FREOPP cohort-weighted earnings ten years after entry.",
					},
					map[string]any{
						"name": "median_lifetime_roi_usd",
						"title": "Median Lifetime Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Provenance block carried by every payload.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "npv_30yr_nonresident_usd",
						"title": "Npv 30yr Nonresident Usd",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"short": "Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.",
					},
					map[string]any{
						"name": "npv_30yr_resident_usd",
						"title": "Npv 30yr Resident Usd",
						"type": "`$INTEGER`",
						"req": true,
						"short": "30-year projected net value at resident pricing.",
					},
					map[string]any{
						"name": "p25_roi_usd",
						"title": "P25 Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "p75_roi_usd",
						"title": "P75 Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "parent",
						"title": "Parent",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"short": "Parent category — subfields only.",
					},
					map[string]any{
						"name": "pct_never_breakeven",
						"title": "Pct Never Breakeven",
						"type": "`$NUMBER`",
						"short": "Share of graduates who never break even, percent.",
					},
					map[string]any{
						"name": "programs",
						"title": "Programs",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank_by_worst_roi",
						"title": "Rank By Worst Roi",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"req": true,
						"short": "USPS 2-letter state code.",
					},
					map[string]any{
						"name": "state_name",
						"title": "State Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_cost_of_attendance_nonresident_usd",
						"title": "Total Cost Of Attendance Nonresident Usd",
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
						"title": "Total Cost Of Attendance Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "unitid",
						"title": "Unitid",
						"type": "`$INTEGER`",
						"req": true,
						"short": "IPEDS UnitID — the universal join key.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The human-readable page for this school.",
						"format": "uri",
					},
				},
				"name": "slug",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/colleges/{slug}.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "colleges",
									},
									map[string]any{
										"lit": "{slug}.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"colleges",
									"{slug}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/majors/{slug}.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "majors",
									},
									map[string]any{
										"lit": "{slug}.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"majors",
									"{slug}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"slug",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"state": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "control",
						"title": "Control",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "institution",
						"title": "Institution",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "npv_30yr_resident_usd",
						"title": "Npv 30yr Resident Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank_in_state",
						"title": "Rank In State",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/best-value/{state}.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "rankings",
									},
									map[string]any{
										"lit": "best-value",
									},
									map[string]any{
										"lit": "{state}.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"best-value",
									"{state}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.colleges`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"state",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"top_50": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "institution",
						"title": "Institution",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "npv_nonresident_usd",
						"title": "Npv Nonresident Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "npv_resident_usd",
						"title": "Npv Resident Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "oos_penalty_30yr_npv_usd",
						"title": "Oos Penalty 30yr Npv Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tuition_in_state_usd",
						"title": "Tuition In State Usd",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tuition_out_of_state_usd",
						"title": "Tuition Out Of State Usd",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/out-of-state-penalty/top-50.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "rankings",
									},
									map[string]any{
										"lit": "out-of-state-penalty",
									},
									map[string]any{
										"lit": "top-50.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"out-of-state-penalty",
									"top-50.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rankings`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Graduates",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mean_lifetime_roi_usd",
						"title": "Mean Lifetime Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "median_breakeven_age",
						"title": "Median Breakeven Age",
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
						"title": "Median Lifetime Roi Usd",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pct_never_breakeven",
						"title": "Pct Never Breakeven",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
					},
				},
				"name": "worst_roi_major",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/rankings/worst-roi-majors.json",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "rankings",
									},
									map[string]any{
										"lit": "worst-roi-majors.json",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"rankings",
									"worst-roi-majors.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rankings`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
