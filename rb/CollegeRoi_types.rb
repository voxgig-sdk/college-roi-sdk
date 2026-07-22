# frozen_string_literal: true

# Typed models for the CollegeRoi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# BestValue entity data model.
#
# @!attribute [rw] college
#   @return [Array, nil]
#
# @!attribute [rw] page_url
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] state_name
#   @return [String, nil]
BestValue = Struct.new(
  :college,
  :page_url,
  :state,
  :state_name,
  keyword_init: true
)

# Request payload for BestValue#list.
#
# @!attribute [rw] college
#   @return [Array, nil]
#
# @!attribute [rw] page_url
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] state_name
#   @return [String, nil]
BestValueListMatch = Struct.new(
  :college,
  :page_url,
  :state,
  :state_name,
  keyword_init: true
)

# College entity data model.
#
# @!attribute [rw] breakeven_age
#   @return [Object, nil]
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] control
#   @return [String]
#
# @!attribute [rw] freopp_program_coverage
#   @return [Integer, nil]
#
# @!attribute [rw] median_earnings_10yr_usd
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] npv_30yr_nonresident_usd
#   @return [Object, nil]
#
# @!attribute [rw] npv_30yr_resident_usd
#   @return [Integer]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] state_name
#   @return [String, nil]
#
# @!attribute [rw] total_cost_of_attendance_nonresident_usd
#   @return [Object, nil]
#
# @!attribute [rw] total_cost_of_attendance_usd
#   @return [Integer, nil]
#
# @!attribute [rw] unitid
#   @return [Integer]
#
# @!attribute [rw] url
#   @return [String]
College = Struct.new(
  :breakeven_age,
  :city,
  :control,
  :freopp_program_coverage,
  :median_earnings_10yr_usd,
  :name,
  :npv_30yr_nonresident_usd,
  :npv_30yr_resident_usd,
  :slug,
  :state,
  :state_name,
  :total_cost_of_attendance_nonresident_usd,
  :total_cost_of_attendance_usd,
  :unitid,
  :url,
  keyword_init: true
)

# Request payload for College#list.
#
# @!attribute [rw] breakeven_age
#   @return [Object, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] control
#   @return [String, nil]
#
# @!attribute [rw] freopp_program_coverage
#   @return [Integer, nil]
#
# @!attribute [rw] median_earnings_10yr_usd
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] npv_30yr_nonresident_usd
#   @return [Object, nil]
#
# @!attribute [rw] npv_30yr_resident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] state_name
#   @return [String, nil]
#
# @!attribute [rw] total_cost_of_attendance_nonresident_usd
#   @return [Object, nil]
#
# @!attribute [rw] total_cost_of_attendance_usd
#   @return [Integer, nil]
#
# @!attribute [rw] unitid
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
CollegeListMatch = Struct.new(
  :breakeven_age,
  :city,
  :control,
  :freopp_program_coverage,
  :median_earnings_10yr_usd,
  :name,
  :npv_30yr_nonresident_usd,
  :npv_30yr_resident_usd,
  :slug,
  :state,
  :state_name,
  :total_cost_of_attendance_nonresident_usd,
  :total_cost_of_attendance_usd,
  :unitid,
  :url,
  keyword_init: true
)

# Index entity data model.
class Index
end

# Request payload for Index#load.
class IndexLoadMatch
end

# Major entity data model.
#
# @!attribute [rw] ai_exposure
#   @return [Object, nil]
#
# @!attribute [rw] cip_program_name
#   @return [Object, nil]
#
# @!attribute [rw] completion_adjusted_roi_usd
#   @return [Object, nil]
#
# @!attribute [rw] dropout_roi_usd
#   @return [Object, nil]
#
# @!attribute [rw] graduate
#   @return [Integer, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] mean_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] median_breakeven_age
#   @return [Object, nil]
#
# @!attribute [rw] median_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] p25_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] p75_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] parent
#   @return [Object, nil]
#
# @!attribute [rw] pct_never_breakeven
#   @return [Float, nil]
#
# @!attribute [rw] program
#   @return [Integer, nil]
#
# @!attribute [rw] rank_by_worst_roi
#   @return [Integer]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
Major = Struct.new(
  :ai_exposure,
  :cip_program_name,
  :completion_adjusted_roi_usd,
  :dropout_roi_usd,
  :graduate,
  :kind,
  :mean_lifetime_roi_usd,
  :median_breakeven_age,
  :median_lifetime_roi_usd,
  :name,
  :p25_roi_usd,
  :p75_roi_usd,
  :parent,
  :pct_never_breakeven,
  :program,
  :rank_by_worst_roi,
  :slug,
  :url,
  keyword_init: true
)

# Request payload for Major#list.
#
# @!attribute [rw] ai_exposure
#   @return [Object, nil]
#
# @!attribute [rw] cip_program_name
#   @return [Object, nil]
#
# @!attribute [rw] completion_adjusted_roi_usd
#   @return [Object, nil]
#
# @!attribute [rw] dropout_roi_usd
#   @return [Object, nil]
#
# @!attribute [rw] graduate
#   @return [Integer, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] mean_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] median_breakeven_age
#   @return [Object, nil]
#
# @!attribute [rw] median_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] p25_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] p75_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] parent
#   @return [Object, nil]
#
# @!attribute [rw] pct_never_breakeven
#   @return [Float, nil]
#
# @!attribute [rw] program
#   @return [Integer, nil]
#
# @!attribute [rw] rank_by_worst_roi
#   @return [Integer, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
MajorListMatch = Struct.new(
  :ai_exposure,
  :cip_program_name,
  :completion_adjusted_roi_usd,
  :dropout_roi_usd,
  :graduate,
  :kind,
  :mean_lifetime_roi_usd,
  :median_breakeven_age,
  :median_lifetime_roi_usd,
  :name,
  :p25_roi_usd,
  :p75_roi_usd,
  :parent,
  :pct_never_breakeven,
  :program,
  :rank_by_worst_roi,
  :slug,
  :url,
  keyword_init: true
)

# Openapi entity data model.
class Openapi
end

# Request payload for Openapi#load.
class OpenapiLoadMatch
end

# OutOfStatePenalty entity data model.
#
# @!attribute [rw] institution
#   @return [String, nil]
#
# @!attribute [rw] npv_nonresident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] npv_resident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] oos_penalty_30yr_npv_usd
#   @return [Integer, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] tuition_in_state_usd
#   @return [Integer, nil]
#
# @!attribute [rw] tuition_out_of_state_usd
#   @return [Integer, nil]
OutOfStatePenalty = Struct.new(
  :institution,
  :npv_nonresident_usd,
  :npv_resident_usd,
  :oos_penalty_30yr_npv_usd,
  :rank,
  :state,
  :tuition_in_state_usd,
  :tuition_out_of_state_usd,
  keyword_init: true
)

# Request payload for OutOfStatePenalty#list.
#
# @!attribute [rw] institution
#   @return [String, nil]
#
# @!attribute [rw] npv_nonresident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] npv_resident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] oos_penalty_30yr_npv_usd
#   @return [Integer, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] tuition_in_state_usd
#   @return [Integer, nil]
#
# @!attribute [rw] tuition_out_of_state_usd
#   @return [Integer, nil]
OutOfStatePenaltyListMatch = Struct.new(
  :institution,
  :npv_nonresident_usd,
  :npv_resident_usd,
  :oos_penalty_30yr_npv_usd,
  :rank,
  :state,
  :tuition_in_state_usd,
  :tuition_out_of_state_usd,
  keyword_init: true
)

# Slug entity data model.
#
# @!attribute [rw] ai_exposure
#   @return [Object, nil]
#
# @!attribute [rw] breakeven_age
#   @return [Object, nil]
#
# @!attribute [rw] cip_program_name
#   @return [Object, nil]
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] completion_adjusted_roi_usd
#   @return [Object, nil]
#
# @!attribute [rw] control
#   @return [String]
#
# @!attribute [rw] dropout_roi_usd
#   @return [Object, nil]
#
# @!attribute [rw] freopp_program_coverage
#   @return [Integer, nil]
#
# @!attribute [rw] graduate
#   @return [Integer, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] mean_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] median_breakeven_age
#   @return [Object, nil]
#
# @!attribute [rw] median_earnings_10yr_usd
#   @return [Integer, nil]
#
# @!attribute [rw] median_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] meta
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] npv_30yr_nonresident_usd
#   @return [Object, nil]
#
# @!attribute [rw] npv_30yr_resident_usd
#   @return [Integer]
#
# @!attribute [rw] p25_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] p75_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] parent
#   @return [Object, nil]
#
# @!attribute [rw] pct_never_breakeven
#   @return [Float, nil]
#
# @!attribute [rw] program
#   @return [Integer, nil]
#
# @!attribute [rw] rank_by_worst_roi
#   @return [Integer]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] state_name
#   @return [String, nil]
#
# @!attribute [rw] total_cost_of_attendance_nonresident_usd
#   @return [Object, nil]
#
# @!attribute [rw] total_cost_of_attendance_usd
#   @return [Integer, nil]
#
# @!attribute [rw] unitid
#   @return [Integer]
#
# @!attribute [rw] url
#   @return [String]
Slug = Struct.new(
  :ai_exposure,
  :breakeven_age,
  :cip_program_name,
  :city,
  :completion_adjusted_roi_usd,
  :control,
  :dropout_roi_usd,
  :freopp_program_coverage,
  :graduate,
  :kind,
  :mean_lifetime_roi_usd,
  :median_breakeven_age,
  :median_earnings_10yr_usd,
  :median_lifetime_roi_usd,
  :meta,
  :name,
  :npv_30yr_nonresident_usd,
  :npv_30yr_resident_usd,
  :p25_roi_usd,
  :p75_roi_usd,
  :parent,
  :pct_never_breakeven,
  :program,
  :rank_by_worst_roi,
  :slug,
  :state,
  :state_name,
  :total_cost_of_attendance_nonresident_usd,
  :total_cost_of_attendance_usd,
  :unitid,
  :url,
  keyword_init: true
)

# Request payload for Slug#load.
#
# @!attribute [rw] slug
#   @return [String]
SlugLoadMatch = Struct.new(
  :slug,
  keyword_init: true
)

# State entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] control
#   @return [String, nil]
#
# @!attribute [rw] institution
#   @return [String, nil]
#
# @!attribute [rw] npv_30yr_resident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] rank_in_state
#   @return [Integer, nil]
State = Struct.new(
  :city,
  :control,
  :institution,
  :npv_30yr_resident_usd,
  :rank_in_state,
  keyword_init: true
)

# Request payload for State#list.
#
# @!attribute [rw] state
#   @return [String]
StateListMatch = Struct.new(
  :state,
  keyword_init: true
)

# Top50 entity data model.
#
# @!attribute [rw] institution
#   @return [String, nil]
#
# @!attribute [rw] npv_nonresident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] npv_resident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] oos_penalty_30yr_npv_usd
#   @return [Integer, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] tuition_in_state_usd
#   @return [Integer, nil]
#
# @!attribute [rw] tuition_out_of_state_usd
#   @return [Integer, nil]
Top50 = Struct.new(
  :institution,
  :npv_nonresident_usd,
  :npv_resident_usd,
  :oos_penalty_30yr_npv_usd,
  :rank,
  :state,
  :tuition_in_state_usd,
  :tuition_out_of_state_usd,
  keyword_init: true
)

# Request payload for Top50#list.
#
# @!attribute [rw] institution
#   @return [String, nil]
#
# @!attribute [rw] npv_nonresident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] npv_resident_usd
#   @return [Integer, nil]
#
# @!attribute [rw] oos_penalty_30yr_npv_usd
#   @return [Integer, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] tuition_in_state_usd
#   @return [Integer, nil]
#
# @!attribute [rw] tuition_out_of_state_usd
#   @return [Integer, nil]
Top50ListMatch = Struct.new(
  :institution,
  :npv_nonresident_usd,
  :npv_resident_usd,
  :oos_penalty_30yr_npv_usd,
  :rank,
  :state,
  :tuition_in_state_usd,
  :tuition_out_of_state_usd,
  keyword_init: true
)

# WorstRoiMajor entity data model.
#
# @!attribute [rw] graduate
#   @return [Integer, nil]
#
# @!attribute [rw] mean_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] median_breakeven_age
#   @return [Object, nil]
#
# @!attribute [rw] median_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pct_never_breakeven
#   @return [Float, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
WorstRoiMajor = Struct.new(
  :graduate,
  :mean_lifetime_roi_usd,
  :median_breakeven_age,
  :median_lifetime_roi_usd,
  :name,
  :pct_never_breakeven,
  :rank,
  :slug,
  :url,
  keyword_init: true
)

# Request payload for WorstRoiMajor#list.
#
# @!attribute [rw] graduate
#   @return [Integer, nil]
#
# @!attribute [rw] mean_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] median_breakeven_age
#   @return [Object, nil]
#
# @!attribute [rw] median_lifetime_roi_usd
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pct_never_breakeven
#   @return [Float, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
WorstRoiMajorListMatch = Struct.new(
  :graduate,
  :mean_lifetime_roi_usd,
  :median_breakeven_age,
  :median_lifetime_roi_usd,
  :name,
  :pct_never_breakeven,
  :rank,
  :slug,
  :url,
  keyword_init: true
)

