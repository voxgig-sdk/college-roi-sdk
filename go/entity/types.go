// Typed models for the CollegeRoi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// BestValue is the typed data model for the best_value entity.
type BestValue struct {
	College *[]any `json:"college,omitempty"`
	PageUrl *string `json:"page_url,omitempty"`
	State *string `json:"state,omitempty"`
	StateName *string `json:"state_name,omitempty"`
}

// BestValueListMatch is the typed request payload for BestValue.ListTyped.
type BestValueListMatch struct {
	College *[]any `json:"college,omitempty"`
	PageUrl *string `json:"page_url,omitempty"`
	State *string `json:"state,omitempty"`
	StateName *string `json:"state_name,omitempty"`
}

// College is the typed data model for the college entity.
type College struct {
	BreakevenAge *any `json:"breakeven_age,omitempty"`
	City string `json:"city"`
	Control string `json:"control"`
	FreoppProgramCoverage *int `json:"freopp_program_coverage,omitempty"`
	MedianEarnings10yrUsd *int `json:"median_earnings_10yr_usd,omitempty"`
	Name string `json:"name"`
	Npv30yrNonresidentUsd *any `json:"npv_30yr_nonresident_usd,omitempty"`
	Npv30yrResidentUsd int `json:"npv_30yr_resident_usd"`
	Slug string `json:"slug"`
	State string `json:"state"`
	StateName *string `json:"state_name,omitempty"`
	TotalCostOfAttendanceNonresidentUsd *any `json:"total_cost_of_attendance_nonresident_usd,omitempty"`
	TotalCostOfAttendanceUsd *int `json:"total_cost_of_attendance_usd,omitempty"`
	Unitid int `json:"unitid"`
	Url string `json:"url"`
}

// CollegeListMatch is the typed request payload for College.ListTyped.
type CollegeListMatch struct {
	BreakevenAge *any `json:"breakeven_age,omitempty"`
	City *string `json:"city,omitempty"`
	Control *string `json:"control,omitempty"`
	FreoppProgramCoverage *int `json:"freopp_program_coverage,omitempty"`
	MedianEarnings10yrUsd *int `json:"median_earnings_10yr_usd,omitempty"`
	Name *string `json:"name,omitempty"`
	Npv30yrNonresidentUsd *any `json:"npv_30yr_nonresident_usd,omitempty"`
	Npv30yrResidentUsd *int `json:"npv_30yr_resident_usd,omitempty"`
	Slug *string `json:"slug,omitempty"`
	State *string `json:"state,omitempty"`
	StateName *string `json:"state_name,omitempty"`
	TotalCostOfAttendanceNonresidentUsd *any `json:"total_cost_of_attendance_nonresident_usd,omitempty"`
	TotalCostOfAttendanceUsd *int `json:"total_cost_of_attendance_usd,omitempty"`
	Unitid *int `json:"unitid,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Index is the typed data model for the index entity.
type Index struct {
}

// IndexLoadMatch is the typed request payload for Index.LoadTyped.
type IndexLoadMatch struct {
}

// Major is the typed data model for the major entity.
type Major struct {
	AiExposure *any `json:"ai_exposure,omitempty"`
	CipProgramName *any `json:"cip_program_name,omitempty"`
	CompletionAdjustedRoiUsd *any `json:"completion_adjusted_roi_usd,omitempty"`
	DropoutRoiUsd *any `json:"dropout_roi_usd,omitempty"`
	Graduate *int `json:"graduate,omitempty"`
	Kind string `json:"kind"`
	MeanLifetimeRoiUsd *float64 `json:"mean_lifetime_roi_usd,omitempty"`
	MedianBreakevenAge *any `json:"median_breakeven_age,omitempty"`
	MedianLifetimeRoiUsd *float64 `json:"median_lifetime_roi_usd,omitempty"`
	Name string `json:"name"`
	P25RoiUsd *float64 `json:"p25_roi_usd,omitempty"`
	P75RoiUsd *float64 `json:"p75_roi_usd,omitempty"`
	Parent *any `json:"parent,omitempty"`
	PctNeverBreakeven *float64 `json:"pct_never_breakeven,omitempty"`
	Program *int `json:"program,omitempty"`
	RankByWorstRoi int `json:"rank_by_worst_roi"`
	Slug string `json:"slug"`
	Url string `json:"url"`
}

// MajorListMatch is the typed request payload for Major.ListTyped.
type MajorListMatch struct {
	AiExposure *any `json:"ai_exposure,omitempty"`
	CipProgramName *any `json:"cip_program_name,omitempty"`
	CompletionAdjustedRoiUsd *any `json:"completion_adjusted_roi_usd,omitempty"`
	DropoutRoiUsd *any `json:"dropout_roi_usd,omitempty"`
	Graduate *int `json:"graduate,omitempty"`
	Kind *string `json:"kind,omitempty"`
	MeanLifetimeRoiUsd *float64 `json:"mean_lifetime_roi_usd,omitempty"`
	MedianBreakevenAge *any `json:"median_breakeven_age,omitempty"`
	MedianLifetimeRoiUsd *float64 `json:"median_lifetime_roi_usd,omitempty"`
	Name *string `json:"name,omitempty"`
	P25RoiUsd *float64 `json:"p25_roi_usd,omitempty"`
	P75RoiUsd *float64 `json:"p75_roi_usd,omitempty"`
	Parent *any `json:"parent,omitempty"`
	PctNeverBreakeven *float64 `json:"pct_never_breakeven,omitempty"`
	Program *int `json:"program,omitempty"`
	RankByWorstRoi *int `json:"rank_by_worst_roi,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Openapi is the typed data model for the openapi entity.
type Openapi struct {
}

// OpenapiLoadMatch is the typed request payload for Openapi.LoadTyped.
type OpenapiLoadMatch struct {
}

// OutOfStatePenalty is the typed data model for the out_of_state_penalty entity.
type OutOfStatePenalty struct {
	Institution *string `json:"institution,omitempty"`
	NpvNonresidentUsd *int `json:"npv_nonresident_usd,omitempty"`
	NpvResidentUsd *int `json:"npv_resident_usd,omitempty"`
	OosPenalty30yrNpvUsd *int `json:"oos_penalty_30yr_npv_usd,omitempty"`
	Rank *int `json:"rank,omitempty"`
	State *string `json:"state,omitempty"`
	TuitionInStateUsd *int `json:"tuition_in_state_usd,omitempty"`
	TuitionOutOfStateUsd *int `json:"tuition_out_of_state_usd,omitempty"`
}

// OutOfStatePenaltyListMatch is the typed request payload for OutOfStatePenalty.ListTyped.
type OutOfStatePenaltyListMatch struct {
	Institution *string `json:"institution,omitempty"`
	NpvNonresidentUsd *int `json:"npv_nonresident_usd,omitempty"`
	NpvResidentUsd *int `json:"npv_resident_usd,omitempty"`
	OosPenalty30yrNpvUsd *int `json:"oos_penalty_30yr_npv_usd,omitempty"`
	Rank *int `json:"rank,omitempty"`
	State *string `json:"state,omitempty"`
	TuitionInStateUsd *int `json:"tuition_in_state_usd,omitempty"`
	TuitionOutOfStateUsd *int `json:"tuition_out_of_state_usd,omitempty"`
}

// Slug is the typed data model for the slug entity.
type Slug struct {
	AiExposure *any `json:"ai_exposure,omitempty"`
	BreakevenAge *any `json:"breakeven_age,omitempty"`
	CipProgramName *any `json:"cip_program_name,omitempty"`
	City string `json:"city"`
	CompletionAdjustedRoiUsd *any `json:"completion_adjusted_roi_usd,omitempty"`
	Control string `json:"control"`
	DropoutRoiUsd *any `json:"dropout_roi_usd,omitempty"`
	FreoppProgramCoverage *int `json:"freopp_program_coverage,omitempty"`
	Graduate *int `json:"graduate,omitempty"`
	Kind string `json:"kind"`
	MeanLifetimeRoiUsd *float64 `json:"mean_lifetime_roi_usd,omitempty"`
	MedianBreakevenAge *any `json:"median_breakeven_age,omitempty"`
	MedianEarnings10yrUsd *int `json:"median_earnings_10yr_usd,omitempty"`
	MedianLifetimeRoiUsd *float64 `json:"median_lifetime_roi_usd,omitempty"`
	Meta map[string]any `json:"meta"`
	Name string `json:"name"`
	Npv30yrNonresidentUsd *any `json:"npv_30yr_nonresident_usd,omitempty"`
	Npv30yrResidentUsd int `json:"npv_30yr_resident_usd"`
	P25RoiUsd *float64 `json:"p25_roi_usd,omitempty"`
	P75RoiUsd *float64 `json:"p75_roi_usd,omitempty"`
	Parent *any `json:"parent,omitempty"`
	PctNeverBreakeven *float64 `json:"pct_never_breakeven,omitempty"`
	Program *int `json:"program,omitempty"`
	RankByWorstRoi int `json:"rank_by_worst_roi"`
	Slug string `json:"slug"`
	State string `json:"state"`
	StateName *string `json:"state_name,omitempty"`
	TotalCostOfAttendanceNonresidentUsd *any `json:"total_cost_of_attendance_nonresident_usd,omitempty"`
	TotalCostOfAttendanceUsd *int `json:"total_cost_of_attendance_usd,omitempty"`
	Unitid int `json:"unitid"`
	Url string `json:"url"`
}

// SlugLoadMatch is the typed request payload for Slug.LoadTyped.
type SlugLoadMatch struct {
	Slug string `json:"slug"`
}

// State is the typed data model for the state entity.
type State struct {
	City *string `json:"city,omitempty"`
	Control *string `json:"control,omitempty"`
	Institution *string `json:"institution,omitempty"`
	Npv30yrResidentUsd *int `json:"npv_30yr_resident_usd,omitempty"`
	RankInState *int `json:"rank_in_state,omitempty"`
}

// StateListMatch is the typed request payload for State.ListTyped.
type StateListMatch struct {
	State string `json:"state"`
}

// Top50 is the typed data model for the top_50 entity.
type Top50 struct {
	Institution *string `json:"institution,omitempty"`
	NpvNonresidentUsd *int `json:"npv_nonresident_usd,omitempty"`
	NpvResidentUsd *int `json:"npv_resident_usd,omitempty"`
	OosPenalty30yrNpvUsd *int `json:"oos_penalty_30yr_npv_usd,omitempty"`
	Rank *int `json:"rank,omitempty"`
	State *string `json:"state,omitempty"`
	TuitionInStateUsd *int `json:"tuition_in_state_usd,omitempty"`
	TuitionOutOfStateUsd *int `json:"tuition_out_of_state_usd,omitempty"`
}

// Top50ListMatch is the typed request payload for Top50.ListTyped.
type Top50ListMatch struct {
	Institution *string `json:"institution,omitempty"`
	NpvNonresidentUsd *int `json:"npv_nonresident_usd,omitempty"`
	NpvResidentUsd *int `json:"npv_resident_usd,omitempty"`
	OosPenalty30yrNpvUsd *int `json:"oos_penalty_30yr_npv_usd,omitempty"`
	Rank *int `json:"rank,omitempty"`
	State *string `json:"state,omitempty"`
	TuitionInStateUsd *int `json:"tuition_in_state_usd,omitempty"`
	TuitionOutOfStateUsd *int `json:"tuition_out_of_state_usd,omitempty"`
}

// WorstRoiMajor is the typed data model for the worst_roi_major entity.
type WorstRoiMajor struct {
	Graduate *int `json:"graduate,omitempty"`
	MeanLifetimeRoiUsd *float64 `json:"mean_lifetime_roi_usd,omitempty"`
	MedianBreakevenAge *any `json:"median_breakeven_age,omitempty"`
	MedianLifetimeRoiUsd *float64 `json:"median_lifetime_roi_usd,omitempty"`
	Name *string `json:"name,omitempty"`
	PctNeverBreakeven *float64 `json:"pct_never_breakeven,omitempty"`
	Rank *int `json:"rank,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Url *string `json:"url,omitempty"`
}

// WorstRoiMajorListMatch is the typed request payload for WorstRoiMajor.ListTyped.
type WorstRoiMajorListMatch struct {
	Graduate *int `json:"graduate,omitempty"`
	MeanLifetimeRoiUsd *float64 `json:"mean_lifetime_roi_usd,omitempty"`
	MedianBreakevenAge *any `json:"median_breakeven_age,omitempty"`
	MedianLifetimeRoiUsd *float64 `json:"median_lifetime_roi_usd,omitempty"`
	Name *string `json:"name,omitempty"`
	PctNeverBreakeven *float64 `json:"pct_never_breakeven,omitempty"`
	Rank *int `json:"rank,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Url *string `json:"url,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
