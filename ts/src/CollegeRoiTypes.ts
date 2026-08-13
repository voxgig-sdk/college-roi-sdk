// Typed models for the CollegeRoi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BestValue {
  colleges?: any[]
  page_url?: string
  state?: string
  state_name?: string
}

export interface BestValueListMatch {
  colleges?: any[]
  page_url?: string
  state?: string
  state_name?: string
}

export interface College {
  breakeven_age?: number | null
  city: string
  control: string
  freopp_program_coverage?: number
  median_earnings_10yr_usd?: number
  name: string
  npv_30yr_nonresident_usd?: number | null
  npv_30yr_resident_usd: number
  slug: string
  state: string
  state_name?: string
  total_cost_of_attendance_nonresident_usd?: number | null
  total_cost_of_attendance_usd?: number
  unitid: number
  url: string
}

export interface CollegeListMatch {
  breakeven_age?: number | null
  city?: string
  control?: string
  freopp_program_coverage?: number
  median_earnings_10yr_usd?: number
  name?: string
  npv_30yr_nonresident_usd?: number | null
  npv_30yr_resident_usd?: number
  slug?: string
  state?: string
  state_name?: string
  total_cost_of_attendance_nonresident_usd?: number | null
  total_cost_of_attendance_usd?: number
  unitid?: number
  url?: string
}

export interface Index {
}

export interface IndexLoadMatch {
}

export interface Major {
  ai_exposure?: Record<string, any> | null
  cip_program_name?: string | null
  completion_adjusted_roi_usd?: number | null
  dropout_roi_usd?: number | null
  graduates?: number
  kind: string
  mean_lifetime_roi_usd?: number
  median_breakeven_age?: number | null
  median_lifetime_roi_usd?: number
  name: string
  p25_roi_usd?: number
  p75_roi_usd?: number
  parent?: Record<string, any> | null
  pct_never_breakeven?: number
  programs?: number
  rank_by_worst_roi: number
  slug: string
  url: string
}

export interface MajorListMatch {
  ai_exposure?: Record<string, any> | null
  cip_program_name?: string | null
  completion_adjusted_roi_usd?: number | null
  dropout_roi_usd?: number | null
  graduates?: number
  kind?: string
  mean_lifetime_roi_usd?: number
  median_breakeven_age?: number | null
  median_lifetime_roi_usd?: number
  name?: string
  p25_roi_usd?: number
  p75_roi_usd?: number
  parent?: Record<string, any> | null
  pct_never_breakeven?: number
  programs?: number
  rank_by_worst_roi?: number
  slug?: string
  url?: string
}

export interface Openapi {
}

export interface OpenapiLoadMatch {
}

export interface OutOfStatePenalty {
  institution?: string
  npv_nonresident_usd?: number
  npv_resident_usd?: number
  oos_penalty_30yr_npv_usd?: number
  rank?: number
  state?: string
  tuition_in_state_usd?: number
  tuition_out_of_state_usd?: number
}

export interface OutOfStatePenaltyListMatch {
  institution?: string
  npv_nonresident_usd?: number
  npv_resident_usd?: number
  oos_penalty_30yr_npv_usd?: number
  rank?: number
  state?: string
  tuition_in_state_usd?: number
  tuition_out_of_state_usd?: number
}

export interface Slug {
  ai_exposure?: Record<string, any> | null
  breakeven_age?: number | null
  cip_program_name?: string | null
  city: string
  completion_adjusted_roi_usd?: number | null
  control: string
  dropout_roi_usd?: number | null
  freopp_program_coverage?: number
  graduates?: number
  kind: string
  mean_lifetime_roi_usd?: number
  median_breakeven_age?: number | null
  median_earnings_10yr_usd?: number
  median_lifetime_roi_usd?: number
  meta: Record<string, any>
  name: string
  npv_30yr_nonresident_usd?: number | null
  npv_30yr_resident_usd: number
  p25_roi_usd?: number
  p75_roi_usd?: number
  parent?: Record<string, any> | null
  pct_never_breakeven?: number
  programs?: number
  rank_by_worst_roi: number
  slug: string
  state: string
  state_name?: string
  total_cost_of_attendance_nonresident_usd?: number | null
  total_cost_of_attendance_usd?: number
  unitid: number
  url: string
}

export interface SlugLoadMatch {
  slug: string
}

export interface State {
  city?: string
  control?: string
  institution?: string
  npv_30yr_resident_usd?: number
  rank_in_state?: number
}

export interface StateListMatch {
  state: string
}

export interface Top50 {
  institution?: string
  npv_nonresident_usd?: number
  npv_resident_usd?: number
  oos_penalty_30yr_npv_usd?: number
  rank?: number
  state?: string
  tuition_in_state_usd?: number
  tuition_out_of_state_usd?: number
}

export interface Top50ListMatch {
  institution?: string
  npv_nonresident_usd?: number
  npv_resident_usd?: number
  oos_penalty_30yr_npv_usd?: number
  rank?: number
  state?: string
  tuition_in_state_usd?: number
  tuition_out_of_state_usd?: number
}

export interface WorstRoiMajor {
  graduates?: number
  mean_lifetime_roi_usd?: number
  median_breakeven_age?: number | null
  median_lifetime_roi_usd?: number
  name?: string
  pct_never_breakeven?: number
  rank?: number
  slug?: string
  url?: string
}

export interface WorstRoiMajorListMatch {
  graduates?: number
  mean_lifetime_roi_usd?: number
  median_breakeven_age?: number | null
  median_lifetime_roi_usd?: number
  name?: string
  pct_never_breakeven?: number
  rank?: number
  slug?: string
  url?: string
}

