-- Typed models for the CollegeRoi SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BestValue
---@field college? table
---@field page_url? string
---@field state? string
---@field state_name? string

---@class BestValueListMatch
---@field college? table
---@field page_url? string
---@field state? string
---@field state_name? string

---@class College
---@field breakeven_age? any
---@field city string
---@field control string
---@field freopp_program_coverage? number
---@field median_earnings_10yr_usd? number
---@field name string
---@field npv_30yr_nonresident_usd? any
---@field npv_30yr_resident_usd number
---@field slug string
---@field state string
---@field state_name? string
---@field total_cost_of_attendance_nonresident_usd? any
---@field total_cost_of_attendance_usd? number
---@field unitid number
---@field url string

---@class CollegeListMatch
---@field breakeven_age? any
---@field city? string
---@field control? string
---@field freopp_program_coverage? number
---@field median_earnings_10yr_usd? number
---@field name? string
---@field npv_30yr_nonresident_usd? any
---@field npv_30yr_resident_usd? number
---@field slug? string
---@field state? string
---@field state_name? string
---@field total_cost_of_attendance_nonresident_usd? any
---@field total_cost_of_attendance_usd? number
---@field unitid? number
---@field url? string

---@class Index

---@class IndexLoadMatch

---@class Major
---@field ai_exposure? any
---@field cip_program_name? any
---@field completion_adjusted_roi_usd? any
---@field dropout_roi_usd? any
---@field graduate? number
---@field kind string
---@field mean_lifetime_roi_usd? number
---@field median_breakeven_age? any
---@field median_lifetime_roi_usd? number
---@field name string
---@field p25_roi_usd? number
---@field p75_roi_usd? number
---@field parent? any
---@field pct_never_breakeven? number
---@field program? number
---@field rank_by_worst_roi number
---@field slug string
---@field url string

---@class MajorListMatch
---@field ai_exposure? any
---@field cip_program_name? any
---@field completion_adjusted_roi_usd? any
---@field dropout_roi_usd? any
---@field graduate? number
---@field kind? string
---@field mean_lifetime_roi_usd? number
---@field median_breakeven_age? any
---@field median_lifetime_roi_usd? number
---@field name? string
---@field p25_roi_usd? number
---@field p75_roi_usd? number
---@field parent? any
---@field pct_never_breakeven? number
---@field program? number
---@field rank_by_worst_roi? number
---@field slug? string
---@field url? string

---@class Openapi

---@class OpenapiLoadMatch

---@class OutOfStatePenalty
---@field institution? string
---@field npv_nonresident_usd? number
---@field npv_resident_usd? number
---@field oos_penalty_30yr_npv_usd? number
---@field rank? number
---@field state? string
---@field tuition_in_state_usd? number
---@field tuition_out_of_state_usd? number

---@class OutOfStatePenaltyListMatch
---@field institution? string
---@field npv_nonresident_usd? number
---@field npv_resident_usd? number
---@field oos_penalty_30yr_npv_usd? number
---@field rank? number
---@field state? string
---@field tuition_in_state_usd? number
---@field tuition_out_of_state_usd? number

---@class Slug
---@field ai_exposure? any
---@field breakeven_age? any
---@field cip_program_name? any
---@field city string
---@field completion_adjusted_roi_usd? any
---@field control string
---@field dropout_roi_usd? any
---@field freopp_program_coverage? number
---@field graduate? number
---@field kind string
---@field mean_lifetime_roi_usd? number
---@field median_breakeven_age? any
---@field median_earnings_10yr_usd? number
---@field median_lifetime_roi_usd? number
---@field meta table
---@field name string
---@field npv_30yr_nonresident_usd? any
---@field npv_30yr_resident_usd number
---@field p25_roi_usd? number
---@field p75_roi_usd? number
---@field parent? any
---@field pct_never_breakeven? number
---@field program? number
---@field rank_by_worst_roi number
---@field slug string
---@field state string
---@field state_name? string
---@field total_cost_of_attendance_nonresident_usd? any
---@field total_cost_of_attendance_usd? number
---@field unitid number
---@field url string

---@class SlugLoadMatch
---@field slug string

---@class State
---@field city? string
---@field control? string
---@field institution? string
---@field npv_30yr_resident_usd? number
---@field rank_in_state? number

---@class StateListMatch
---@field state string

---@class Top50
---@field institution? string
---@field npv_nonresident_usd? number
---@field npv_resident_usd? number
---@field oos_penalty_30yr_npv_usd? number
---@field rank? number
---@field state? string
---@field tuition_in_state_usd? number
---@field tuition_out_of_state_usd? number

---@class Top50ListMatch
---@field institution? string
---@field npv_nonresident_usd? number
---@field npv_resident_usd? number
---@field oos_penalty_30yr_npv_usd? number
---@field rank? number
---@field state? string
---@field tuition_in_state_usd? number
---@field tuition_out_of_state_usd? number

---@class WorstRoiMajor
---@field graduate? number
---@field mean_lifetime_roi_usd? number
---@field median_breakeven_age? any
---@field median_lifetime_roi_usd? number
---@field name? string
---@field pct_never_breakeven? number
---@field rank? number
---@field slug? string
---@field url? string

---@class WorstRoiMajorListMatch
---@field graduate? number
---@field mean_lifetime_roi_usd? number
---@field median_breakeven_age? any
---@field median_lifetime_roi_usd? number
---@field name? string
---@field pct_never_breakeven? number
---@field rank? number
---@field slug? string
---@field url? string

local M = {}

return M
