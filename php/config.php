<?php
declare(strict_types=1);

// CollegeRoi SDK configuration

class CollegeRoiConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CollegeRoi",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://le-teen.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "best_value" => [],
                    "college" => [],
                    "index" => [],
                    "major" => [],
                    "openapi" => [],
                    "out_of_state_penalty" => [],
                    "slug" => [],
                    "state" => [],
                    "top_50" => [],
                    "worst_roi_major" => [],
                ],
            ],
            "entity" => [
        'best_value' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'colleges',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'page_url',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'state',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'state_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
          ],
          'name' => 'best_value',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/rankings/best-value.json',
                  'parts' => [
                    'api',
                    'v1',
                    'rankings',
                    'best-value.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'college' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'breakeven_age',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$INTEGER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'city',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'control',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'freopp_program_coverage',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'median_earnings_10yr_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'npv_30yr_nonresident_usd',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$INTEGER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'npv_30yr_resident_usd',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'slug',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'state',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'state_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'total_cost_of_attendance_nonresident_usd',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$INTEGER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'total_cost_of_attendance_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'unitid',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 13,
            ],
            [
              'active' => true,
              'name' => 'url',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 14,
            ],
          ],
          'name' => 'college',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/colleges.json',
                  'parts' => [
                    'api',
                    'v1',
                    'colleges.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'index' => [
          'fields' => [],
          'name' => 'index',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/index.json',
                  'parts' => [
                    'api',
                    'v1',
                    'index.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'major' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'ai_exposure',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$OBJECT`',
                  '`$NULL`',
                ],
              ],
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'cip_program_name',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'completion_adjusted_roi_usd',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$NUMBER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'dropout_roi_usd',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$NUMBER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'graduates',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'kind',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'mean_lifetime_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'median_breakeven_age',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$INTEGER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'median_lifetime_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'p25_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'p75_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'parent',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$OBJECT`',
                  '`$NULL`',
                ],
              ],
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'pct_never_breakeven',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 13,
            ],
            [
              'active' => true,
              'name' => 'programs',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 14,
            ],
            [
              'active' => true,
              'name' => 'rank_by_worst_roi',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 15,
            ],
            [
              'active' => true,
              'name' => 'slug',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 16,
            ],
            [
              'active' => true,
              'name' => 'url',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 17,
            ],
          ],
          'name' => 'major',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/majors.json',
                  'parts' => [
                    'api',
                    'v1',
                    'majors.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'openapi' => [
          'fields' => [],
          'name' => 'openapi',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/openapi.json',
                  'parts' => [
                    'api',
                    'v1',
                    'openapi.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'out_of_state_penalty' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'institution',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'npv_nonresident_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'npv_resident_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'oos_penalty_30yr_npv_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'rank',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'state',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'tuition_in_state_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'tuition_out_of_state_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 7,
            ],
          ],
          'name' => 'out_of_state_penalty',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/rankings/out-of-state-penalty.json',
                  'parts' => [
                    'api',
                    'v1',
                    'rankings',
                    'out-of-state-penalty.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'slug' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'ai_exposure',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$OBJECT`',
                  '`$NULL`',
                ],
              ],
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'breakeven_age',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$INTEGER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'cip_program_name',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$STRING`',
                  '`$NULL`',
                ],
              ],
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'city',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'completion_adjusted_roi_usd',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$NUMBER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'control',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'dropout_roi_usd',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$NUMBER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'freopp_program_coverage',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'graduates',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'kind',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'mean_lifetime_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'median_breakeven_age',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$INTEGER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'median_earnings_10yr_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'median_lifetime_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 13,
            ],
            [
              'active' => true,
              'name' => 'meta',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 14,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 15,
            ],
            [
              'active' => true,
              'name' => 'npv_30yr_nonresident_usd',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$INTEGER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 16,
            ],
            [
              'active' => true,
              'name' => 'npv_30yr_resident_usd',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 17,
            ],
            [
              'active' => true,
              'name' => 'p25_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 18,
            ],
            [
              'active' => true,
              'name' => 'p75_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 19,
            ],
            [
              'active' => true,
              'name' => 'parent',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$OBJECT`',
                  '`$NULL`',
                ],
              ],
              'index$' => 20,
            ],
            [
              'active' => true,
              'name' => 'pct_never_breakeven',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 21,
            ],
            [
              'active' => true,
              'name' => 'programs',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 22,
            ],
            [
              'active' => true,
              'name' => 'rank_by_worst_roi',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 23,
            ],
            [
              'active' => true,
              'name' => 'slug',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 24,
            ],
            [
              'active' => true,
              'name' => 'state',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 25,
            ],
            [
              'active' => true,
              'name' => 'state_name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 26,
            ],
            [
              'active' => true,
              'name' => 'total_cost_of_attendance_nonresident_usd',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$INTEGER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 27,
            ],
            [
              'active' => true,
              'name' => 'total_cost_of_attendance_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 28,
            ],
            [
              'active' => true,
              'name' => 'unitid',
              'req' => true,
              'type' => '`$INTEGER`',
              'index$' => 29,
            ],
            [
              'active' => true,
              'name' => 'url',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 30,
            ],
          ],
          'name' => 'slug',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'slug',
                        'orig' => 'slug',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/colleges/{slug}.json',
                  'parts' => [
                    'api',
                    'v1',
                    'colleges',
                    '{slug}.json',
                  ],
                  'select' => [
                    'exist' => [
                      'slug',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'slug',
                        'orig' => 'slug',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/majors/{slug}.json',
                  'parts' => [
                    'api',
                    'v1',
                    'majors',
                    '{slug}.json',
                  ],
                  'select' => [
                    'exist' => [
                      'slug',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'college',
              ],
              [
                'major',
              ],
            ],
          ],
        ],
        'state' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'city',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'control',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'institution',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'npv_30yr_resident_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'rank_in_state',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 4,
            ],
          ],
          'name' => 'state',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'state',
                        'orig' => 'state',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'index$' => 0,
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/rankings/best-value/{state}.json',
                  'parts' => [
                    'api',
                    'v1',
                    'rankings',
                    'best-value',
                    '{state}.json',
                  ],
                  'select' => [
                    'exist' => [
                      'state',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'best_value',
              ],
            ],
          ],
        ],
        'top_50' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'institution',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'npv_nonresident_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'npv_resident_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'oos_penalty_30yr_npv_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'rank',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'state',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'tuition_in_state_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'tuition_out_of_state_usd',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 7,
            ],
          ],
          'name' => 'top_50',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/rankings/out-of-state-penalty/top-50.json',
                  'parts' => [
                    'api',
                    'v1',
                    'rankings',
                    'out-of-state-penalty',
                    'top-50.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'worst_roi_major' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'graduates',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'mean_lifetime_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'median_breakeven_age',
              'req' => false,
              'type' => [
                '`$ONE`',
                [
                  '`$INTEGER`',
                  '`$NULL`',
                ],
              ],
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'median_lifetime_roi_usd',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'pct_never_breakeven',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'rank',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'slug',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'url',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 8,
            ],
          ],
          'name' => 'worst_roi_major',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/rankings/worst-roi-majors.json',
                  'parts' => [
                    'api',
                    'v1',
                    'rankings',
                    'worst-roi-majors.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CollegeRoiFeatures::make_feature($name);
    }
}
