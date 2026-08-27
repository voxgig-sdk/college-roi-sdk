# CollegeRoi Python SDK Reference

Complete API reference for the CollegeRoi Python SDK.


## CollegeRoiSDK

### Constructor

```python
from collegeroi_sdk import CollegeRoiSDK

client = CollegeRoiSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CollegeRoiSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CollegeRoiSDK.test()
```


### Instance Methods

#### `BestValue(data=None)`

Create a new `BestValueEntity` instance. Pass `None` for no initial data.

#### `College(data=None)`

Create a new `CollegeEntity` instance. Pass `None` for no initial data.

#### `Index(data=None)`

Create a new `IndexEntity` instance. Pass `None` for no initial data.

#### `Major(data=None)`

Create a new `MajorEntity` instance. Pass `None` for no initial data.

#### `Openapi(data=None)`

Create a new `OpenapiEntity` instance. Pass `None` for no initial data.

#### `OutOfStatePenalty(data=None)`

Create a new `OutOfStatePenaltyEntity` instance. Pass `None` for no initial data.

#### `Slug(data=None)`

Create a new `SlugEntity` instance. Pass `None` for no initial data.

#### `State(data=None)`

Create a new `StateEntity` instance. Pass `None` for no initial data.

#### `Top50(data=None)`

Create a new `Top50Entity` instance. Pass `None` for no initial data.

#### `WorstRoiMajor(data=None)`

Create a new `WorstRoiMajorEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BestValueEntity

```python
best_value = client.BestValue()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `colleges` | `list` | No |  |
| `page_url` | `str` | No |  |
| `state` | `str` | No |  |
| `state_name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BestValue().list()
for best_value in results:
    print(best_value)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BestValueEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CollegeEntity

```python
college = client.College()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `breakeven_age` | `int | None` | No |  |
| `city` | `str` | Yes |  |
| `control` | `str` | Yes |  |
| `freopp_program_coverage` | `int` | No | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | `int` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `name` | `str` | Yes |  |
| `npv_30yr_nonresident_usd` | `int | None` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | Yes | 30-year projected net value at resident pricing. |
| `slug` | `str` | Yes |  |
| `state` | `str` | Yes | USPS 2-letter state code. |
| `state_name` | `str` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `int | None` | No |  |
| `total_cost_of_attendance_usd` | `int` | No |  |
| `unitid` | `int` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `str` | Yes | The human-readable page for this school. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.College().list()
for college in results:
    print(college)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollegeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IndexEntity

```python
index = client.Index()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Index().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IndexEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MajorEntity

```python
major = client.Major()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `dict | None` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | `str | None` | No | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` | `float | None` | No |  |
| `dropout_roi_usd` | `float | None` | No |  |
| `graduates` | `int` | No |  |
| `kind` | `str` | Yes |  |
| `mean_lifetime_roi_usd` | `float` | No |  |
| `median_breakeven_age` | `int | None` | No |  |
| `median_lifetime_roi_usd` | `float` | No |  |
| `name` | `str` | Yes |  |
| `p25_roi_usd` | `float` | No |  |
| `p75_roi_usd` | `float` | No |  |
| `parent` | `dict | None` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `float` | No | Share of graduates who never break even, percent. |
| `programs` | `int` | No |  |
| `rank_by_worst_roi` | `int` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `str` | Yes |  |
| `url` | `str` | Yes | The human-readable page for this major. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Major().list()
for major in results:
    print(major)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MajorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OpenapiEntity

```python
openapi = client.Openapi()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Openapi().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OpenapiEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OutOfStatePenaltyEntity

```python
out_of_state_penalty = client.OutOfStatePenalty()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `institution` | `str` | No |  |
| `npv_nonresident_usd` | `int` | No |  |
| `npv_resident_usd` | `int` | No |  |
| `oos_penalty_30yr_npv_usd` | `int` | No |  |
| `rank` | `int` | No |  |
| `state` | `str` | No |  |
| `tuition_in_state_usd` | `int` | No |  |
| `tuition_out_of_state_usd` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.OutOfStatePenalty().list()
for out_of_state_penalty in results:
    print(out_of_state_penalty)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OutOfStatePenaltyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SlugEntity

```python
slug = client.Slug()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `dict | None` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` | `int | None` | No |  |
| `cip_program_name` | `str | None` | No | CIP program-family name — subfields only. |
| `city` | `str` | Yes |  |
| `completion_adjusted_roi_usd` | `float | None` | No |  |
| `control` | `str` | Yes |  |
| `dropout_roi_usd` | `float | None` | No |  |
| `freopp_program_coverage` | `int` | No | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` | `int` | No |  |
| `kind` | `str` | Yes |  |
| `mean_lifetime_roi_usd` | `float` | No |  |
| `median_breakeven_age` | `int | None` | No |  |
| `median_earnings_10yr_usd` | `int` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` | `float` | No |  |
| `meta` | `dict` | Yes | Provenance block carried by every payload. |
| `name` | `str` | Yes |  |
| `npv_30yr_nonresident_usd` | `int | None` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | Yes | 30-year projected net value at resident pricing. |
| `p25_roi_usd` | `float` | No |  |
| `p75_roi_usd` | `float` | No |  |
| `parent` | `dict | None` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `float` | No | Share of graduates who never break even, percent. |
| `programs` | `int` | No |  |
| `rank_by_worst_roi` | `int` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `str` | Yes |  |
| `state` | `str` | Yes | USPS 2-letter state code. |
| `state_name` | `str` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `int | None` | No |  |
| `total_cost_of_attendance_usd` | `int` | No |  |
| `unitid` | `int` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `str` | Yes | The human-readable page for this school. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Slug().load({"slug": "slug"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SlugEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StateEntity

```python
state = client.State()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | No |  |
| `control` | `str` | No |  |
| `institution` | `str` | No |  |
| `npv_30yr_resident_usd` | `int` | No |  |
| `rank_in_state` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.State().list({"state": "example"})
for state in results:
    print(state)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Top50Entity

```python
top_50 = client.Top50()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `institution` | `str` | No |  |
| `npv_nonresident_usd` | `int` | No |  |
| `npv_resident_usd` | `int` | No |  |
| `oos_penalty_30yr_npv_usd` | `int` | No |  |
| `rank` | `int` | No |  |
| `state` | `str` | No |  |
| `tuition_in_state_usd` | `int` | No |  |
| `tuition_out_of_state_usd` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Top50().list()
for top_50 in results:
    print(top_50)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `Top50Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WorstRoiMajorEntity

```python
worst_roi_major = client.WorstRoiMajor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `graduates` | `int` | No |  |
| `mean_lifetime_roi_usd` | `float` | No |  |
| `median_breakeven_age` | `int | None` | No |  |
| `median_lifetime_roi_usd` | `float` | No |  |
| `name` | `str` | No |  |
| `pct_never_breakeven` | `float` | No |  |
| `rank` | `int` | No |  |
| `slug` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.WorstRoiMajor().list()
for worst_roi_major in results:
    print(worst_roi_major)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WorstRoiMajorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = CollegeRoiSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

