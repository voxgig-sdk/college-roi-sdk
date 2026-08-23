# CollegeRoi Golang SDK Reference

Complete API reference for the CollegeRoi Golang SDK.


## CollegeRoiSDK

### Constructor

```go
func NewCollegeRoiSDK(options map[string]any) *CollegeRoiSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *CollegeRoiSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *CollegeRoiSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `BestValue(data map[string]any) CollegeRoiEntity`

Create a new `BestValue` entity instance. Pass `nil` for no initial data.

#### `College(data map[string]any) CollegeRoiEntity`

Create a new `College` entity instance. Pass `nil` for no initial data.

#### `Index(data map[string]any) CollegeRoiEntity`

Create a new `Index` entity instance. Pass `nil` for no initial data.

#### `Major(data map[string]any) CollegeRoiEntity`

Create a new `Major` entity instance. Pass `nil` for no initial data.

#### `Openapi(data map[string]any) CollegeRoiEntity`

Create a new `Openapi` entity instance. Pass `nil` for no initial data.

#### `OutOfStatePenalty(data map[string]any) CollegeRoiEntity`

Create a new `OutOfStatePenalty` entity instance. Pass `nil` for no initial data.

#### `Slug(data map[string]any) CollegeRoiEntity`

Create a new `Slug` entity instance. Pass `nil` for no initial data.

#### `State(data map[string]any) CollegeRoiEntity`

Create a new `State` entity instance. Pass `nil` for no initial data.

#### `Top50(data map[string]any) CollegeRoiEntity`

Create a new `Top50` entity instance. Pass `nil` for no initial data.

#### `WorstRoiMajor(data map[string]any) CollegeRoiEntity`

Create a new `WorstRoiMajor` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BestValueEntity

```go
bestValue := client.BestValue(nil)
fmt.Println(bestValue.GetName()) // "best_value"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `colleges` | `[]any` | No |  |
| `page_url` | `string` | No |  |
| `state` | `string` | No |  |
| `state_name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.BestValue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BestValueEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CollegeEntity

```go
college := client.College(nil)
fmt.Println(college.GetName()) // "college"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `breakeven_age` | `any` | No |  |
| `city` | `string` | Yes |  |
| `control` | `string` | Yes |  |
| `freopp_program_coverage` | `int` | No | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | `int` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `name` | `string` | Yes |  |
| `npv_30yr_nonresident_usd` | `any` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | Yes | 30-year projected net value at resident pricing. |
| `slug` | `string` | Yes |  |
| `state` | `string` | Yes | USPS 2-letter state code. |
| `state_name` | `string` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `any` | No |  |
| `total_cost_of_attendance_usd` | `int` | No |  |
| `unitid` | `int` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `string` | Yes | The human-readable page for this school. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.College(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CollegeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IndexEntity

```go
index := client.Index(nil)
fmt.Println(index.GetName()) // "index"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Index(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IndexEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MajorEntity

```go
major := client.Major(nil)
fmt.Println(major.GetName()) // "major"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `any` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | `any` | No | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` | `any` | No |  |
| `dropout_roi_usd` | `any` | No |  |
| `graduates` | `int` | No |  |
| `kind` | `string` | Yes |  |
| `mean_lifetime_roi_usd` | `float64` | No |  |
| `median_breakeven_age` | `any` | No |  |
| `median_lifetime_roi_usd` | `float64` | No |  |
| `name` | `string` | Yes |  |
| `p25_roi_usd` | `float64` | No |  |
| `p75_roi_usd` | `float64` | No |  |
| `parent` | `any` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `float64` | No | Share of graduates who never break even, percent. |
| `programs` | `int` | No |  |
| `rank_by_worst_roi` | `int` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` | Yes |  |
| `url` | `string` | Yes | The human-readable page for this major. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Major(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MajorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OpenapiEntity

```go
openapi := client.Openapi(nil)
fmt.Println(openapi.GetName()) // "openapi"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Openapi(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OpenapiEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OutOfStatePenaltyEntity

```go
outOfStatePenalty := client.OutOfStatePenalty(nil)
fmt.Println(outOfStatePenalty.GetName()) // "out_of_state_penalty"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `institution` | `string` | No |  |
| `npv_nonresident_usd` | `int` | No |  |
| `npv_resident_usd` | `int` | No |  |
| `oos_penalty_30yr_npv_usd` | `int` | No |  |
| `rank` | `int` | No |  |
| `state` | `string` | No |  |
| `tuition_in_state_usd` | `int` | No |  |
| `tuition_out_of_state_usd` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.OutOfStatePenalty(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OutOfStatePenaltyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SlugEntity

```go
slug := client.Slug(nil)
fmt.Println(slug.GetName()) // "slug"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `any` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` | `any` | No |  |
| `cip_program_name` | `any` | No | CIP program-family name — subfields only. |
| `city` | `string` | Yes |  |
| `completion_adjusted_roi_usd` | `any` | No |  |
| `control` | `string` | Yes |  |
| `dropout_roi_usd` | `any` | No |  |
| `freopp_program_coverage` | `int` | No | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` | `int` | No |  |
| `kind` | `string` | Yes |  |
| `mean_lifetime_roi_usd` | `float64` | No |  |
| `median_breakeven_age` | `any` | No |  |
| `median_earnings_10yr_usd` | `int` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` | `float64` | No |  |
| `meta` | `map[string]any` | Yes | Provenance block carried by every payload. |
| `name` | `string` | Yes |  |
| `npv_30yr_nonresident_usd` | `any` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | Yes | 30-year projected net value at resident pricing. |
| `p25_roi_usd` | `float64` | No |  |
| `p75_roi_usd` | `float64` | No |  |
| `parent` | `any` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `float64` | No | Share of graduates who never break even, percent. |
| `programs` | `int` | No |  |
| `rank_by_worst_roi` | `int` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` | Yes |  |
| `state` | `string` | Yes | USPS 2-letter state code. |
| `state_name` | `string` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `any` | No |  |
| `total_cost_of_attendance_usd` | `int` | No |  |
| `unitid` | `int` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `string` | Yes | The human-readable page for this school. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Slug(nil).Load(map[string]any{"slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SlugEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StateEntity

```go
state := client.State(nil)
fmt.Println(state.GetName()) // "state"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `control` | `string` | No |  |
| `institution` | `string` | No |  |
| `npv_30yr_resident_usd` | `int` | No |  |
| `rank_in_state` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.State(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Top50Entity

```go
top50 := client.Top50(nil)
fmt.Println(top50.GetName()) // "top_50"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `institution` | `string` | No |  |
| `npv_nonresident_usd` | `int` | No |  |
| `npv_resident_usd` | `int` | No |  |
| `oos_penalty_30yr_npv_usd` | `int` | No |  |
| `rank` | `int` | No |  |
| `state` | `string` | No |  |
| `tuition_in_state_usd` | `int` | No |  |
| `tuition_out_of_state_usd` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Top50(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `Top50Entity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WorstRoiMajorEntity

```go
worstRoiMajor := client.WorstRoiMajor(nil)
fmt.Println(worstRoiMajor.GetName()) // "worst_roi_major"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `graduates` | `int` | No |  |
| `mean_lifetime_roi_usd` | `float64` | No |  |
| `median_breakeven_age` | `any` | No |  |
| `median_lifetime_roi_usd` | `float64` | No |  |
| `name` | `string` | No |  |
| `pct_never_breakeven` | `float64` | No |  |
| `rank` | `int` | No |  |
| `slug` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.WorstRoiMajor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WorstRoiMajorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewCollegeRoiSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

