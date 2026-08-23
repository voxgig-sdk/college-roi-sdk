# CollegeRoi Lua SDK Reference

Complete API reference for the CollegeRoi Lua SDK.


## CollegeRoiSDK

### Constructor

```lua
local sdk = require("college-roi_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `BestValue(data)`

Create a new `BestValue` entity instance. Pass `nil` for no initial data.

#### `College(data)`

Create a new `College` entity instance. Pass `nil` for no initial data.

#### `Index(data)`

Create a new `Index` entity instance. Pass `nil` for no initial data.

#### `Major(data)`

Create a new `Major` entity instance. Pass `nil` for no initial data.

#### `Openapi(data)`

Create a new `Openapi` entity instance. Pass `nil` for no initial data.

#### `OutOfStatePenalty(data)`

Create a new `OutOfStatePenalty` entity instance. Pass `nil` for no initial data.

#### `Slug(data)`

Create a new `Slug` entity instance. Pass `nil` for no initial data.

#### `State(data)`

Create a new `State` entity instance. Pass `nil` for no initial data.

#### `Top50(data)`

Create a new `Top50` entity instance. Pass `nil` for no initial data.

#### `WorstRoiMajor(data)`

Create a new `WorstRoiMajor` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BestValueEntity

```lua
local best_value = client:BestValue(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `colleges` | `table` | No |  |
| `page_url` | `string` | No |  |
| `state` | `string` | No |  |
| `state_name` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:BestValue():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BestValueEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CollegeEntity

```lua
local college = client:College(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `breakeven_age` | `number|nil` | No |  |
| `city` | `string` | Yes |  |
| `control` | `string` | Yes |  |
| `freopp_program_coverage` | `number` | No | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | `number` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `name` | `string` | Yes |  |
| `npv_30yr_nonresident_usd` | `number|nil` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `number` | Yes | 30-year projected net value at resident pricing. |
| `slug` | `string` | Yes |  |
| `state` | `string` | Yes | USPS 2-letter state code. |
| `state_name` | `string` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `number|nil` | No |  |
| `total_cost_of_attendance_usd` | `number` | No |  |
| `unitid` | `number` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `string` | Yes | The human-readable page for this school. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:College():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollegeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IndexEntity

```lua
local index = client:Index(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Index():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IndexEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MajorEntity

```lua
local major = client:Major(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `table|nil` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | `string|nil` | No | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` | `number|nil` | No |  |
| `dropout_roi_usd` | `number|nil` | No |  |
| `graduates` | `number` | No |  |
| `kind` | `string` | Yes |  |
| `mean_lifetime_roi_usd` | `number` | No |  |
| `median_breakeven_age` | `number|nil` | No |  |
| `median_lifetime_roi_usd` | `number` | No |  |
| `name` | `string` | Yes |  |
| `p25_roi_usd` | `number` | No |  |
| `p75_roi_usd` | `number` | No |  |
| `parent` | `table|nil` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `number` | No | Share of graduates who never break even, percent. |
| `programs` | `number` | No |  |
| `rank_by_worst_roi` | `number` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` | Yes |  |
| `url` | `string` | Yes | The human-readable page for this major. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Major():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MajorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OpenapiEntity

```lua
local openapi = client:Openapi(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Openapi():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OpenapiEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OutOfStatePenaltyEntity

```lua
local out_of_state_penalty = client:OutOfStatePenalty(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `institution` | `string` | No |  |
| `npv_nonresident_usd` | `number` | No |  |
| `npv_resident_usd` | `number` | No |  |
| `oos_penalty_30yr_npv_usd` | `number` | No |  |
| `rank` | `number` | No |  |
| `state` | `string` | No |  |
| `tuition_in_state_usd` | `number` | No |  |
| `tuition_out_of_state_usd` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:OutOfStatePenalty():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OutOfStatePenaltyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SlugEntity

```lua
local slug = client:Slug(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `table|nil` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` | `number|nil` | No |  |
| `cip_program_name` | `string|nil` | No | CIP program-family name — subfields only. |
| `city` | `string` | Yes |  |
| `completion_adjusted_roi_usd` | `number|nil` | No |  |
| `control` | `string` | Yes |  |
| `dropout_roi_usd` | `number|nil` | No |  |
| `freopp_program_coverage` | `number` | No | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` | `number` | No |  |
| `kind` | `string` | Yes |  |
| `mean_lifetime_roi_usd` | `number` | No |  |
| `median_breakeven_age` | `number|nil` | No |  |
| `median_earnings_10yr_usd` | `number` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` | `number` | No |  |
| `meta` | `table` | Yes | Provenance block carried by every payload. |
| `name` | `string` | Yes |  |
| `npv_30yr_nonresident_usd` | `number|nil` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `number` | Yes | 30-year projected net value at resident pricing. |
| `p25_roi_usd` | `number` | No |  |
| `p75_roi_usd` | `number` | No |  |
| `parent` | `table|nil` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `number` | No | Share of graduates who never break even, percent. |
| `programs` | `number` | No |  |
| `rank_by_worst_roi` | `number` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` | Yes |  |
| `state` | `string` | Yes | USPS 2-letter state code. |
| `state_name` | `string` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `number|nil` | No |  |
| `total_cost_of_attendance_usd` | `number` | No |  |
| `unitid` | `number` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `string` | Yes | The human-readable page for this school. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Slug():load({ slug = "slug" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SlugEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StateEntity

```lua
local state = client:State(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `control` | `string` | No |  |
| `institution` | `string` | No |  |
| `npv_30yr_resident_usd` | `number` | No |  |
| `rank_in_state` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:State():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Top50Entity

```lua
local top_50 = client:Top50(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `institution` | `string` | No |  |
| `npv_nonresident_usd` | `number` | No |  |
| `npv_resident_usd` | `number` | No |  |
| `oos_penalty_30yr_npv_usd` | `number` | No |  |
| `rank` | `number` | No |  |
| `state` | `string` | No |  |
| `tuition_in_state_usd` | `number` | No |  |
| `tuition_out_of_state_usd` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Top50():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `Top50Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WorstRoiMajorEntity

```lua
local worst_roi_major = client:WorstRoiMajor(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `graduates` | `number` | No |  |
| `mean_lifetime_roi_usd` | `number` | No |  |
| `median_breakeven_age` | `number|nil` | No |  |
| `median_lifetime_roi_usd` | `number` | No |  |
| `name` | `string` | No |  |
| `pct_never_breakeven` | `number` | No |  |
| `rank` | `number` | No |  |
| `slug` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:WorstRoiMajor():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorstRoiMajorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

