package core

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
						"active": true,
						"name": "colleges",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "page_url",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "state",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "state_name",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
				},
				"name": "best_value",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "breakeven_age",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "city",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "control",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "freopp_program_coverage",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "median_earnings_10yr_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": true,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "npv_30yr_nonresident_usd",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "npv_30yr_resident_usd",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "slug",
						"req": true,
						"type": "`$STRING`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "state",
						"req": true,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "state_name",
						"req": false,
						"type": "`$STRING`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "total_cost_of_attendance_nonresident_usd",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "total_cost_of_attendance_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "unitid",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "url",
						"req": true,
						"type": "`$STRING`",
						"index$": 14,
					},
				},
				"name": "college",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "ai_exposure",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "cip_program_name",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "completion_adjusted_roi_usd",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "dropout_roi_usd",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "graduates",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "kind",
						"req": true,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "mean_lifetime_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "median_breakeven_age",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "median_lifetime_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": true,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "p25_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "p75_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "parent",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "pct_never_breakeven",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "programs",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "rank_by_worst_roi",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 15,
					},
					map[string]any{
						"active": true,
						"name": "slug",
						"req": true,
						"type": "`$STRING`",
						"index$": 16,
					},
					map[string]any{
						"active": true,
						"name": "url",
						"req": true,
						"type": "`$STRING`",
						"index$": 17,
					},
				},
				"name": "major",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "institution",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "npv_nonresident_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "npv_resident_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "oos_penalty_30yr_npv_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "rank",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "state",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "tuition_in_state_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "tuition_out_of_state_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 7,
					},
				},
				"name": "out_of_state_penalty",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "ai_exposure",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "breakeven_age",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "cip_program_name",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "city",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "completion_adjusted_roi_usd",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "control",
						"req": true,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "dropout_roi_usd",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$NUMBER`",
								"`$NULL`",
							},
						},
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "freopp_program_coverage",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "graduates",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "kind",
						"req": true,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "mean_lifetime_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "median_breakeven_age",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "median_earnings_10yr_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "median_lifetime_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "meta",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": true,
						"type": "`$STRING`",
						"index$": 15,
					},
					map[string]any{
						"active": true,
						"name": "npv_30yr_nonresident_usd",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"index$": 16,
					},
					map[string]any{
						"active": true,
						"name": "npv_30yr_resident_usd",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 17,
					},
					map[string]any{
						"active": true,
						"name": "p25_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 18,
					},
					map[string]any{
						"active": true,
						"name": "p75_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 19,
					},
					map[string]any{
						"active": true,
						"name": "parent",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"index$": 20,
					},
					map[string]any{
						"active": true,
						"name": "pct_never_breakeven",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 21,
					},
					map[string]any{
						"active": true,
						"name": "programs",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 22,
					},
					map[string]any{
						"active": true,
						"name": "rank_by_worst_roi",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 23,
					},
					map[string]any{
						"active": true,
						"name": "slug",
						"req": true,
						"type": "`$STRING`",
						"index$": 24,
					},
					map[string]any{
						"active": true,
						"name": "state",
						"req": true,
						"type": "`$STRING`",
						"index$": 25,
					},
					map[string]any{
						"active": true,
						"name": "state_name",
						"req": false,
						"type": "`$STRING`",
						"index$": 26,
					},
					map[string]any{
						"active": true,
						"name": "total_cost_of_attendance_nonresident_usd",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"index$": 27,
					},
					map[string]any{
						"active": true,
						"name": "total_cost_of_attendance_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 28,
					},
					map[string]any{
						"active": true,
						"name": "unitid",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 29,
					},
					map[string]any{
						"active": true,
						"name": "url",
						"req": true,
						"type": "`$STRING`",
						"index$": 30,
					},
				},
				"name": "slug",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "slug",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "slug",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 1,
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
						"active": true,
						"name": "city",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "control",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "institution",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "npv_30yr_resident_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "rank_in_state",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 4,
					},
				},
				"name": "state",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "state",
											"orig": "state",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
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
						"active": true,
						"name": "institution",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "npv_nonresident_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "npv_resident_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "oos_penalty_30yr_npv_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "rank",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "state",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "tuition_in_state_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "tuition_out_of_state_usd",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 7,
					},
				},
				"name": "top_50",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "graduates",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "mean_lifetime_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "median_breakeven_age",
						"req": false,
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "median_lifetime_roi_usd",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "pct_never_breakeven",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "rank",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "slug",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "url",
						"req": false,
						"type": "`$STRING`",
						"index$": 8,
					},
				},
				"name": "worst_roi_major",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
