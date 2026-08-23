# CollegeRoi Python SDK



The Python SDK for the CollegeRoi API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.BestValue()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/college-roi-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from collegeroi_sdk import CollegeRoiSDK

client = CollegeRoiSDK()
```

### 2. List bestvalue records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    bestvalues = client.BestValue().list()
    for bestvalue in bestvalues:
        print(bestvalue)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a slug

Slug is nested under slug, so provide the `slug`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    slug = client.Slug().load({"slug": "example_slug"})
    print(slug)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    top50s = client.Top50().list()
    print(top50s)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = CollegeRoiSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
top50 = client.Top50().list()
# top50 contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = CollegeRoiSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
COLLEGE_ROI_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### CollegeRoiSDK

```python
from collegeroi_sdk import CollegeRoiSDK

client = CollegeRoiSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = CollegeRoiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### CollegeRoiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `BestValue` | `(data) -> BestValueEntity` | Create a BestValue entity instance. |
| `College` | `(data) -> CollegeEntity` | Create a College entity instance. |
| `Index` | `(data) -> IndexEntity` | Create an Index entity instance. |
| `Major` | `(data) -> MajorEntity` | Create a Major entity instance. |
| `Openapi` | `(data) -> OpenapiEntity` | Create an Openapi entity instance. |
| `OutOfStatePenalty` | `(data) -> OutOfStatePenaltyEntity` | Create an OutOfStatePenalty entity instance. |
| `Slug` | `(data) -> SlugEntity` | Create a Slug entity instance. |
| `State` | `(data) -> StateEntity` | Create a State entity instance. |
| `Top50` | `(data) -> Top50Entity` | Create a Top50 entity instance. |
| `WorstRoiMajor` | `(data) -> WorstRoiMajorEntity` | Create a WorstRoiMajor entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### BestValue

| Field | Description |
| --- | --- |
| `colleges` |  |
| `page_url` |  |
| `state` |  |
| `state_name` |  |

Operations: List.

API path: `/api/v1/rankings/best-value.json`

#### College

| Field | Description |
| --- | --- |
| `breakeven_age` |  |
| `city` |  |
| `control` |  |
| `freopp_program_coverage` | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | FREOPP cohort-weighted earnings ten years after entry. |
| `name` |  |
| `npv_30yr_nonresident_usd` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | 30-year projected net value at resident pricing. |
| `slug` |  |
| `state` | USPS 2-letter state code. |
| `state_name` |  |
| `total_cost_of_attendance_nonresident_usd` |  |
| `total_cost_of_attendance_usd` |  |
| `unitid` | IPEDS UnitID — the universal join key. |
| `url` | The human-readable page for this school. |

Operations: List.

API path: `/api/v1/colleges.json`

#### Index

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/index.json`

#### Major

| Field | Description |
| --- | --- |
| `ai_exposure` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` |  |
| `dropout_roi_usd` |  |
| `graduates` |  |
| `kind` |  |
| `mean_lifetime_roi_usd` |  |
| `median_breakeven_age` |  |
| `median_lifetime_roi_usd` |  |
| `name` |  |
| `p25_roi_usd` |  |
| `p75_roi_usd` |  |
| `parent` | Parent category — subfields only. |
| `pct_never_breakeven` | Share of graduates who never break even, percent. |
| `programs` |  |
| `rank_by_worst_roi` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` |  |
| `url` | The human-readable page for this major. |

Operations: List.

API path: `/api/v1/majors.json`

#### Openapi

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/openapi.json`

#### OutOfStatePenalty

| Field | Description |
| --- | --- |
| `institution` |  |
| `npv_nonresident_usd` |  |
| `npv_resident_usd` |  |
| `oos_penalty_30yr_npv_usd` |  |
| `rank` |  |
| `state` |  |
| `tuition_in_state_usd` |  |
| `tuition_out_of_state_usd` |  |

Operations: List.

API path: `/api/v1/rankings/out-of-state-penalty.json`

#### Slug

| Field | Description |
| --- | --- |
| `ai_exposure` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` |  |
| `cip_program_name` | CIP program-family name — subfields only. |
| `city` |  |
| `completion_adjusted_roi_usd` |  |
| `control` |  |
| `dropout_roi_usd` |  |
| `freopp_program_coverage` | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` |  |
| `kind` |  |
| `mean_lifetime_roi_usd` |  |
| `median_breakeven_age` |  |
| `median_earnings_10yr_usd` | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` |  |
| `meta` | Provenance block carried by every payload. |
| `name` |  |
| `npv_30yr_nonresident_usd` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | 30-year projected net value at resident pricing. |
| `p25_roi_usd` |  |
| `p75_roi_usd` |  |
| `parent` | Parent category — subfields only. |
| `pct_never_breakeven` | Share of graduates who never break even, percent. |
| `programs` |  |
| `rank_by_worst_roi` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` |  |
| `state` | USPS 2-letter state code. |
| `state_name` |  |
| `total_cost_of_attendance_nonresident_usd` |  |
| `total_cost_of_attendance_usd` |  |
| `unitid` | IPEDS UnitID — the universal join key. |
| `url` | The human-readable page for this school. |

Operations: Load.

API path: `/api/v1/colleges/{slug}.json`

#### State

| Field | Description |
| --- | --- |
| `city` |  |
| `control` |  |
| `institution` |  |
| `npv_30yr_resident_usd` |  |
| `rank_in_state` |  |

Operations: List.

API path: `/api/v1/rankings/best-value/{state}.json`

#### Top50

| Field | Description |
| --- | --- |
| `institution` |  |
| `npv_nonresident_usd` |  |
| `npv_resident_usd` |  |
| `oos_penalty_30yr_npv_usd` |  |
| `rank` |  |
| `state` |  |
| `tuition_in_state_usd` |  |
| `tuition_out_of_state_usd` |  |

Operations: List.

API path: `/api/v1/rankings/out-of-state-penalty/top-50.json`

#### WorstRoiMajor

| Field | Description |
| --- | --- |
| `graduates` |  |
| `mean_lifetime_roi_usd` |  |
| `median_breakeven_age` |  |
| `median_lifetime_roi_usd` |  |
| `name` |  |
| `pct_never_breakeven` |  |
| `rank` |  |
| `slug` |  |
| `url` |  |

Operations: List.

API path: `/api/v1/rankings/worst-roi-majors.json`



## Entities


### BestValue

Create an instance: `best_value = client.BestValue()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `colleges` | `list` |  |
| `page_url` | `str` |  |
| `state` | `str` |  |
| `state_name` | `str` |  |

#### Example: List

```python
best_values = client.BestValue().list()
```


### College

Create an instance: `college = client.College()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakeven_age` | `int | None` |  |
| `city` | `str` |  |
| `control` | `str` |  |
| `freopp_program_coverage` | `int` | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | `int` | FREOPP cohort-weighted earnings ten years after entry. |
| `name` | `str` |  |
| `npv_30yr_nonresident_usd` | `int | None` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | 30-year projected net value at resident pricing. |
| `slug` | `str` |  |
| `state` | `str` | USPS 2-letter state code. |
| `state_name` | `str` |  |
| `total_cost_of_attendance_nonresident_usd` | `int | None` |  |
| `total_cost_of_attendance_usd` | `int` |  |
| `unitid` | `int` | IPEDS UnitID — the universal join key. |
| `url` | `str` | The human-readable page for this school. |

#### Example: List

```python
colleges = client.College().list()
```


### Index

Create an instance: `index = client.Index()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
index = client.Index().load()
```


### Major

Create an instance: `major = client.Major()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `dict | None` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | `str | None` | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` | `float | None` |  |
| `dropout_roi_usd` | `float | None` |  |
| `graduates` | `int` |  |
| `kind` | `str` |  |
| `mean_lifetime_roi_usd` | `float` |  |
| `median_breakeven_age` | `int | None` |  |
| `median_lifetime_roi_usd` | `float` |  |
| `name` | `str` |  |
| `p25_roi_usd` | `float` |  |
| `p75_roi_usd` | `float` |  |
| `parent` | `dict | None` | Parent category — subfields only. |
| `pct_never_breakeven` | `float` | Share of graduates who never break even, percent. |
| `programs` | `int` |  |
| `rank_by_worst_roi` | `int` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `str` |  |
| `url` | `str` | The human-readable page for this major. |

#### Example: List

```python
majors = client.Major().list()
```


### Openapi

Create an instance: `openapi = client.Openapi()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
openapi = client.Openapi().load()
```


### OutOfStatePenalty

Create an instance: `out_of_state_penalty = client.OutOfStatePenalty()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `institution` | `str` |  |
| `npv_nonresident_usd` | `int` |  |
| `npv_resident_usd` | `int` |  |
| `oos_penalty_30yr_npv_usd` | `int` |  |
| `rank` | `int` |  |
| `state` | `str` |  |
| `tuition_in_state_usd` | `int` |  |
| `tuition_out_of_state_usd` | `int` |  |

#### Example: List

```python
out_of_state_penaltys = client.OutOfStatePenalty().list()
```


### Slug

Create an instance: `slug = client.Slug()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `dict | None` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` | `int | None` |  |
| `cip_program_name` | `str | None` | CIP program-family name — subfields only. |
| `city` | `str` |  |
| `completion_adjusted_roi_usd` | `float | None` |  |
| `control` | `str` |  |
| `dropout_roi_usd` | `float | None` |  |
| `freopp_program_coverage` | `int` | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` | `int` |  |
| `kind` | `str` |  |
| `mean_lifetime_roi_usd` | `float` |  |
| `median_breakeven_age` | `int | None` |  |
| `median_earnings_10yr_usd` | `int` | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` | `float` |  |
| `meta` | `dict` | Provenance block carried by every payload. |
| `name` | `str` |  |
| `npv_30yr_nonresident_usd` | `int | None` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | 30-year projected net value at resident pricing. |
| `p25_roi_usd` | `float` |  |
| `p75_roi_usd` | `float` |  |
| `parent` | `dict | None` | Parent category — subfields only. |
| `pct_never_breakeven` | `float` | Share of graduates who never break even, percent. |
| `programs` | `int` |  |
| `rank_by_worst_roi` | `int` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `str` |  |
| `state` | `str` | USPS 2-letter state code. |
| `state_name` | `str` |  |
| `total_cost_of_attendance_nonresident_usd` | `int | None` |  |
| `total_cost_of_attendance_usd` | `int` |  |
| `unitid` | `int` | IPEDS UnitID — the universal join key. |
| `url` | `str` | The human-readable page for this school. |

#### Example: Load

```python
slug = client.Slug().load({"slug": "slug"})
```


### State

Create an instance: `state = client.State()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `str` |  |
| `control` | `str` |  |
| `institution` | `str` |  |
| `npv_30yr_resident_usd` | `int` |  |
| `rank_in_state` | `int` |  |

#### Example: List

```python
states = client.State().list({"state": "example"})
```


### Top50

Create an instance: `top_50 = client.Top50()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `institution` | `str` |  |
| `npv_nonresident_usd` | `int` |  |
| `npv_resident_usd` | `int` |  |
| `oos_penalty_30yr_npv_usd` | `int` |  |
| `rank` | `int` |  |
| `state` | `str` |  |
| `tuition_in_state_usd` | `int` |  |
| `tuition_out_of_state_usd` | `int` |  |

#### Example: List

```python
top_50s = client.Top50().list()
```


### WorstRoiMajor

Create an instance: `worst_roi_major = client.WorstRoiMajor()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `graduates` | `int` |  |
| `mean_lifetime_roi_usd` | `float` |  |
| `median_breakeven_age` | `int | None` |  |
| `median_lifetime_roi_usd` | `float` |  |
| `name` | `str` |  |
| `pct_never_breakeven` | `float` |  |
| `rank` | `int` |  |
| `slug` | `str` |  |
| `url` | `str` |  |

#### Example: List

```python
worst_roi_majors = client.WorstRoiMajor().list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── collegeroi_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`collegeroi_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
top50 = client.Top50()
top50.list()

# top50.data_get() now returns the top50 data from the last list
# top50.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
