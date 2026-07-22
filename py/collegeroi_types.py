# Typed models for the CollegeRoi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BestValue(TypedDict, total=False):
    college: list
    page_url: str
    state: str
    state_name: str


class BestValueListMatch(TypedDict, total=False):
    college: list
    page_url: str
    state: str
    state_name: str


class CollegeRequired(TypedDict):
    city: str
    control: str
    name: str
    npv_30yr_resident_usd: int
    slug: str
    state: str
    unitid: int
    url: str


class College(CollegeRequired, total=False):
    breakeven_age: Any
    freopp_program_coverage: int
    median_earnings_10yr_usd: int
    npv_30yr_nonresident_usd: Any
    state_name: str
    total_cost_of_attendance_nonresident_usd: Any
    total_cost_of_attendance_usd: int


class CollegeListMatch(TypedDict, total=False):
    breakeven_age: Any
    city: str
    control: str
    freopp_program_coverage: int
    median_earnings_10yr_usd: int
    name: str
    npv_30yr_nonresident_usd: Any
    npv_30yr_resident_usd: int
    slug: str
    state: str
    state_name: str
    total_cost_of_attendance_nonresident_usd: Any
    total_cost_of_attendance_usd: int
    unitid: int
    url: str


class Index(TypedDict):
    pass


class IndexLoadMatch(TypedDict):
    pass


class MajorRequired(TypedDict):
    kind: str
    name: str
    rank_by_worst_roi: int
    slug: str
    url: str


class Major(MajorRequired, total=False):
    ai_exposure: Any
    cip_program_name: Any
    completion_adjusted_roi_usd: Any
    dropout_roi_usd: Any
    graduate: int
    mean_lifetime_roi_usd: float
    median_breakeven_age: Any
    median_lifetime_roi_usd: float
    p25_roi_usd: float
    p75_roi_usd: float
    parent: Any
    pct_never_breakeven: float
    program: int


class MajorListMatch(TypedDict, total=False):
    ai_exposure: Any
    cip_program_name: Any
    completion_adjusted_roi_usd: Any
    dropout_roi_usd: Any
    graduate: int
    kind: str
    mean_lifetime_roi_usd: float
    median_breakeven_age: Any
    median_lifetime_roi_usd: float
    name: str
    p25_roi_usd: float
    p75_roi_usd: float
    parent: Any
    pct_never_breakeven: float
    program: int
    rank_by_worst_roi: int
    slug: str
    url: str


class Openapi(TypedDict):
    pass


class OpenapiLoadMatch(TypedDict):
    pass


class OutOfStatePenalty(TypedDict, total=False):
    institution: str
    npv_nonresident_usd: int
    npv_resident_usd: int
    oos_penalty_30yr_npv_usd: int
    rank: int
    state: str
    tuition_in_state_usd: int
    tuition_out_of_state_usd: int


class OutOfStatePenaltyListMatch(TypedDict, total=False):
    institution: str
    npv_nonresident_usd: int
    npv_resident_usd: int
    oos_penalty_30yr_npv_usd: int
    rank: int
    state: str
    tuition_in_state_usd: int
    tuition_out_of_state_usd: int


class SlugRequired(TypedDict):
    city: str
    control: str
    kind: str
    meta: dict
    name: str
    npv_30yr_resident_usd: int
    rank_by_worst_roi: int
    slug: str
    state: str
    unitid: int
    url: str


class Slug(SlugRequired, total=False):
    ai_exposure: Any
    breakeven_age: Any
    cip_program_name: Any
    completion_adjusted_roi_usd: Any
    dropout_roi_usd: Any
    freopp_program_coverage: int
    graduate: int
    mean_lifetime_roi_usd: float
    median_breakeven_age: Any
    median_earnings_10yr_usd: int
    median_lifetime_roi_usd: float
    npv_30yr_nonresident_usd: Any
    p25_roi_usd: float
    p75_roi_usd: float
    parent: Any
    pct_never_breakeven: float
    program: int
    state_name: str
    total_cost_of_attendance_nonresident_usd: Any
    total_cost_of_attendance_usd: int


class SlugLoadMatch(TypedDict):
    slug: str


class State(TypedDict, total=False):
    city: str
    control: str
    institution: str
    npv_30yr_resident_usd: int
    rank_in_state: int


class StateListMatch(TypedDict):
    state: str


class Top50(TypedDict, total=False):
    institution: str
    npv_nonresident_usd: int
    npv_resident_usd: int
    oos_penalty_30yr_npv_usd: int
    rank: int
    state: str
    tuition_in_state_usd: int
    tuition_out_of_state_usd: int


class Top50ListMatch(TypedDict, total=False):
    institution: str
    npv_nonresident_usd: int
    npv_resident_usd: int
    oos_penalty_30yr_npv_usd: int
    rank: int
    state: str
    tuition_in_state_usd: int
    tuition_out_of_state_usd: int


class WorstRoiMajor(TypedDict, total=False):
    graduate: int
    mean_lifetime_roi_usd: float
    median_breakeven_age: Any
    median_lifetime_roi_usd: float
    name: str
    pct_never_breakeven: float
    rank: int
    slug: str
    url: str


class WorstRoiMajorListMatch(TypedDict, total=False):
    graduate: int
    mean_lifetime_roi_usd: float
    median_breakeven_age: Any
    median_lifetime_roi_usd: float
    name: str
    pct_never_breakeven: float
    rank: int
    slug: str
    url: str
