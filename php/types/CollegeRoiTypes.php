<?php
declare(strict_types=1);

// Typed models for the CollegeRoi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** BestValue entity data model. */
class BestValue
{
    public ?array $college = null;
    public ?string $page_url = null;
    public ?string $state = null;
    public ?string $state_name = null;
}

/** Request payload for BestValue#list. */
class BestValueListMatch
{
    public ?array $college = null;
    public ?string $page_url = null;
    public ?string $state = null;
    public ?string $state_name = null;
}

/** College entity data model. */
class College
{
    public mixed $breakeven_age = null;
    public string $city;
    public string $control;
    public ?int $freopp_program_coverage = null;
    public ?int $median_earnings_10yr_usd = null;
    public string $name;
    public mixed $npv_30yr_nonresident_usd = null;
    public int $npv_30yr_resident_usd;
    public string $slug;
    public string $state;
    public ?string $state_name = null;
    public mixed $total_cost_of_attendance_nonresident_usd = null;
    public ?int $total_cost_of_attendance_usd = null;
    public int $unitid;
    public string $url;
}

/** Request payload for College#list. */
class CollegeListMatch
{
    public mixed $breakeven_age = null;
    public ?string $city = null;
    public ?string $control = null;
    public ?int $freopp_program_coverage = null;
    public ?int $median_earnings_10yr_usd = null;
    public ?string $name = null;
    public mixed $npv_30yr_nonresident_usd = null;
    public ?int $npv_30yr_resident_usd = null;
    public ?string $slug = null;
    public ?string $state = null;
    public ?string $state_name = null;
    public mixed $total_cost_of_attendance_nonresident_usd = null;
    public ?int $total_cost_of_attendance_usd = null;
    public ?int $unitid = null;
    public ?string $url = null;
}

/** Index entity data model. */
class Index
{
}

/** Request payload for Index#load. */
class IndexLoadMatch
{
}

/** Major entity data model. */
class Major
{
    public mixed $ai_exposure = null;
    public mixed $cip_program_name = null;
    public mixed $completion_adjusted_roi_usd = null;
    public mixed $dropout_roi_usd = null;
    public ?int $graduate = null;
    public string $kind;
    public ?float $mean_lifetime_roi_usd = null;
    public mixed $median_breakeven_age = null;
    public ?float $median_lifetime_roi_usd = null;
    public string $name;
    public ?float $p25_roi_usd = null;
    public ?float $p75_roi_usd = null;
    public mixed $parent = null;
    public ?float $pct_never_breakeven = null;
    public ?int $program = null;
    public int $rank_by_worst_roi;
    public string $slug;
    public string $url;
}

/** Request payload for Major#list. */
class MajorListMatch
{
    public mixed $ai_exposure = null;
    public mixed $cip_program_name = null;
    public mixed $completion_adjusted_roi_usd = null;
    public mixed $dropout_roi_usd = null;
    public ?int $graduate = null;
    public ?string $kind = null;
    public ?float $mean_lifetime_roi_usd = null;
    public mixed $median_breakeven_age = null;
    public ?float $median_lifetime_roi_usd = null;
    public ?string $name = null;
    public ?float $p25_roi_usd = null;
    public ?float $p75_roi_usd = null;
    public mixed $parent = null;
    public ?float $pct_never_breakeven = null;
    public ?int $program = null;
    public ?int $rank_by_worst_roi = null;
    public ?string $slug = null;
    public ?string $url = null;
}

/** Openapi entity data model. */
class Openapi
{
}

/** Request payload for Openapi#load. */
class OpenapiLoadMatch
{
}

/** OutOfStatePenalty entity data model. */
class OutOfStatePenalty
{
    public ?string $institution = null;
    public ?int $npv_nonresident_usd = null;
    public ?int $npv_resident_usd = null;
    public ?int $oos_penalty_30yr_npv_usd = null;
    public ?int $rank = null;
    public ?string $state = null;
    public ?int $tuition_in_state_usd = null;
    public ?int $tuition_out_of_state_usd = null;
}

/** Request payload for OutOfStatePenalty#list. */
class OutOfStatePenaltyListMatch
{
    public ?string $institution = null;
    public ?int $npv_nonresident_usd = null;
    public ?int $npv_resident_usd = null;
    public ?int $oos_penalty_30yr_npv_usd = null;
    public ?int $rank = null;
    public ?string $state = null;
    public ?int $tuition_in_state_usd = null;
    public ?int $tuition_out_of_state_usd = null;
}

/** Slug entity data model. */
class Slug
{
    public mixed $ai_exposure = null;
    public mixed $breakeven_age = null;
    public mixed $cip_program_name = null;
    public string $city;
    public mixed $completion_adjusted_roi_usd = null;
    public string $control;
    public mixed $dropout_roi_usd = null;
    public ?int $freopp_program_coverage = null;
    public ?int $graduate = null;
    public string $kind;
    public ?float $mean_lifetime_roi_usd = null;
    public mixed $median_breakeven_age = null;
    public ?int $median_earnings_10yr_usd = null;
    public ?float $median_lifetime_roi_usd = null;
    public array $meta;
    public string $name;
    public mixed $npv_30yr_nonresident_usd = null;
    public int $npv_30yr_resident_usd;
    public ?float $p25_roi_usd = null;
    public ?float $p75_roi_usd = null;
    public mixed $parent = null;
    public ?float $pct_never_breakeven = null;
    public ?int $program = null;
    public int $rank_by_worst_roi;
    public string $slug;
    public string $state;
    public ?string $state_name = null;
    public mixed $total_cost_of_attendance_nonresident_usd = null;
    public ?int $total_cost_of_attendance_usd = null;
    public int $unitid;
    public string $url;
}

/** Request payload for Slug#load. */
class SlugLoadMatch
{
    public string $slug;
}

/** State entity data model. */
class State
{
    public ?string $city = null;
    public ?string $control = null;
    public ?string $institution = null;
    public ?int $npv_30yr_resident_usd = null;
    public ?int $rank_in_state = null;
}

/** Request payload for State#list. */
class StateListMatch
{
    public string $state;
}

/** Top50 entity data model. */
class Top50
{
    public ?string $institution = null;
    public ?int $npv_nonresident_usd = null;
    public ?int $npv_resident_usd = null;
    public ?int $oos_penalty_30yr_npv_usd = null;
    public ?int $rank = null;
    public ?string $state = null;
    public ?int $tuition_in_state_usd = null;
    public ?int $tuition_out_of_state_usd = null;
}

/** Request payload for Top50#list. */
class Top50ListMatch
{
    public ?string $institution = null;
    public ?int $npv_nonresident_usd = null;
    public ?int $npv_resident_usd = null;
    public ?int $oos_penalty_30yr_npv_usd = null;
    public ?int $rank = null;
    public ?string $state = null;
    public ?int $tuition_in_state_usd = null;
    public ?int $tuition_out_of_state_usd = null;
}

/** WorstRoiMajor entity data model. */
class WorstRoiMajor
{
    public ?int $graduate = null;
    public ?float $mean_lifetime_roi_usd = null;
    public mixed $median_breakeven_age = null;
    public ?float $median_lifetime_roi_usd = null;
    public ?string $name = null;
    public ?float $pct_never_breakeven = null;
    public ?int $rank = null;
    public ?string $slug = null;
    public ?string $url = null;
}

/** Request payload for WorstRoiMajor#list. */
class WorstRoiMajorListMatch
{
    public ?int $graduate = null;
    public ?float $mean_lifetime_roi_usd = null;
    public mixed $median_breakeven_age = null;
    public ?float $median_lifetime_roi_usd = null;
    public ?string $name = null;
    public ?float $pct_never_breakeven = null;
    public ?int $rank = null;
    public ?string $slug = null;
    public ?string $url = null;
}

