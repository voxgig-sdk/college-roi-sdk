# CollegeRoi Ruby SDK Reference

Complete API reference for the CollegeRoi Ruby SDK.


## CollegeRoiSDK

### Constructor

```ruby
require_relative 'CollegeRoi_sdk'

client = CollegeRoiSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CollegeRoiSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CollegeRoiSDK.test
```


### Instance Methods

#### `BestValue(data = nil)`

Create a new `BestValue` entity instance. Pass `nil` for no initial data.

#### `College(data = nil)`

Create a new `College` entity instance. Pass `nil` for no initial data.

#### `Index(data = nil)`

Create a new `Index` entity instance. Pass `nil` for no initial data.

#### `Major(data = nil)`

Create a new `Major` entity instance. Pass `nil` for no initial data.

#### `Openapi(data = nil)`

Create a new `Openapi` entity instance. Pass `nil` for no initial data.

#### `OutOfStatePenalty(data = nil)`

Create a new `OutOfStatePenalty` entity instance. Pass `nil` for no initial data.

#### `Slug(data = nil)`

Create a new `Slug` entity instance. Pass `nil` for no initial data.

#### `State(data = nil)`

Create a new `State` entity instance. Pass `nil` for no initial data.

#### `Top50(data = nil)`

Create a new `Top50` entity instance. Pass `nil` for no initial data.

#### `WorstRoiMajor(data = nil)`

Create a new `WorstRoiMajor` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BestValueEntity

```ruby
best_value = client.BestValue
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `college` | `Array` | No |  |
| `page_url` | `String` | No |  |
| `state` | `String` | No |  |
| `state_name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.BestValue.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BestValueEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CollegeEntity

```ruby
college = client.College
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `breakeven_age` | `Object` | No |  |
| `city` | `String` | Yes |  |
| `control` | `String` | Yes |  |
| `freopp_program_coverage` | `Integer` | No |  |
| `median_earnings_10yr_usd` | `Integer` | No |  |
| `name` | `String` | Yes |  |
| `npv_30yr_nonresident_usd` | `Object` | No |  |
| `npv_30yr_resident_usd` | `Integer` | Yes |  |
| `slug` | `String` | Yes |  |
| `state` | `String` | Yes |  |
| `state_name` | `String` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `Object` | No |  |
| `total_cost_of_attendance_usd` | `Integer` | No |  |
| `unitid` | `Integer` | Yes |  |
| `url` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.College.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CollegeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IndexEntity

```ruby
index = client.Index
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Index.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IndexEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MajorEntity

```ruby
major = client.Major
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `Object` | No |  |
| `cip_program_name` | `Object` | No |  |
| `completion_adjusted_roi_usd` | `Object` | No |  |
| `dropout_roi_usd` | `Object` | No |  |
| `graduate` | `Integer` | No |  |
| `kind` | `String` | Yes |  |
| `mean_lifetime_roi_usd` | `Float` | No |  |
| `median_breakeven_age` | `Object` | No |  |
| `median_lifetime_roi_usd` | `Float` | No |  |
| `name` | `String` | Yes |  |
| `p25_roi_usd` | `Float` | No |  |
| `p75_roi_usd` | `Float` | No |  |
| `parent` | `Object` | No |  |
| `pct_never_breakeven` | `Float` | No |  |
| `program` | `Integer` | No |  |
| `rank_by_worst_roi` | `Integer` | Yes |  |
| `slug` | `String` | Yes |  |
| `url` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Major.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MajorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OpenapiEntity

```ruby
openapi = client.Openapi
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Openapi.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OpenapiEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OutOfStatePenaltyEntity

```ruby
out_of_state_penalty = client.OutOfStatePenalty
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `institution` | `String` | No |  |
| `npv_nonresident_usd` | `Integer` | No |  |
| `npv_resident_usd` | `Integer` | No |  |
| `oos_penalty_30yr_npv_usd` | `Integer` | No |  |
| `rank` | `Integer` | No |  |
| `state` | `String` | No |  |
| `tuition_in_state_usd` | `Integer` | No |  |
| `tuition_out_of_state_usd` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.OutOfStatePenalty.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OutOfStatePenaltyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SlugEntity

```ruby
slug = client.Slug
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `Object` | No |  |
| `breakeven_age` | `Object` | No |  |
| `cip_program_name` | `Object` | No |  |
| `city` | `String` | Yes |  |
| `completion_adjusted_roi_usd` | `Object` | No |  |
| `control` | `String` | Yes |  |
| `dropout_roi_usd` | `Object` | No |  |
| `freopp_program_coverage` | `Integer` | No |  |
| `graduate` | `Integer` | No |  |
| `kind` | `String` | Yes |  |
| `mean_lifetime_roi_usd` | `Float` | No |  |
| `median_breakeven_age` | `Object` | No |  |
| `median_earnings_10yr_usd` | `Integer` | No |  |
| `median_lifetime_roi_usd` | `Float` | No |  |
| `meta` | `Hash` | Yes |  |
| `name` | `String` | Yes |  |
| `npv_30yr_nonresident_usd` | `Object` | No |  |
| `npv_30yr_resident_usd` | `Integer` | Yes |  |
| `p25_roi_usd` | `Float` | No |  |
| `p75_roi_usd` | `Float` | No |  |
| `parent` | `Object` | No |  |
| `pct_never_breakeven` | `Float` | No |  |
| `program` | `Integer` | No |  |
| `rank_by_worst_roi` | `Integer` | Yes |  |
| `slug` | `String` | Yes |  |
| `state` | `String` | Yes |  |
| `state_name` | `String` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `Object` | No |  |
| `total_cost_of_attendance_usd` | `Integer` | No |  |
| `unitid` | `Integer` | Yes |  |
| `url` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Slug.load({ "slug" => "slug" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SlugEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StateEntity

```ruby
state = client.State
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | No |  |
| `control` | `String` | No |  |
| `institution` | `String` | No |  |
| `npv_30yr_resident_usd` | `Integer` | No |  |
| `rank_in_state` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.State.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Top50Entity

```ruby
top_50 = client.Top50
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `institution` | `String` | No |  |
| `npv_nonresident_usd` | `Integer` | No |  |
| `npv_resident_usd` | `Integer` | No |  |
| `oos_penalty_30yr_npv_usd` | `Integer` | No |  |
| `rank` | `Integer` | No |  |
| `state` | `String` | No |  |
| `tuition_in_state_usd` | `Integer` | No |  |
| `tuition_out_of_state_usd` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Top50.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `Top50Entity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WorstRoiMajorEntity

```ruby
worst_roi_major = client.WorstRoiMajor
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `graduate` | `Integer` | No |  |
| `mean_lifetime_roi_usd` | `Float` | No |  |
| `median_breakeven_age` | `Object` | No |  |
| `median_lifetime_roi_usd` | `Float` | No |  |
| `name` | `String` | No |  |
| `pct_never_breakeven` | `Float` | No |  |
| `rank` | `Integer` | No |  |
| `slug` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.WorstRoiMajor.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WorstRoiMajorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = CollegeRoiSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

