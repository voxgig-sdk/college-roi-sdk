# CollegeRoi Lua SDK



The Lua SDK for the CollegeRoi API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:BestValue()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/college-roi-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("college-roi_sdk")

local client = sdk.new()
```

### 2. List bestvalue records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local bestvalues, err = client:BestValue():list()
if err then error(err) end

for _, item in ipairs(bestvalues) do
  print(item["page_url"])
end
```

### 3. Load a slug

Slug is nested under slug, so provide the `slug`.

```lua
local slug, err = client:Slug():load({ slug = "example_slug" })
if err then error(err) end
print(slug)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local bestvalues, err = client:BestValue():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:BestValue():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### CollegeRoiSDK

```lua
local sdk = require("college-roi_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CollegeRoiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local best_value, err = client:BestValue():load()
    if err then error(err) end
    -- best_value is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### BestValue

| Field | Description |
| --- | --- |
| `college` |  |
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
| `freopp_program_coverage` |  |
| `median_earnings_10yr_usd` |  |
| `name` |  |
| `npv_30yr_nonresident_usd` |  |
| `npv_30yr_resident_usd` |  |
| `slug` |  |
| `state` |  |
| `state_name` |  |
| `total_cost_of_attendance_nonresident_usd` |  |
| `total_cost_of_attendance_usd` |  |
| `unitid` |  |
| `url` |  |

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
| `ai_exposure` |  |
| `cip_program_name` |  |
| `completion_adjusted_roi_usd` |  |
| `dropout_roi_usd` |  |
| `graduate` |  |
| `kind` |  |
| `mean_lifetime_roi_usd` |  |
| `median_breakeven_age` |  |
| `median_lifetime_roi_usd` |  |
| `name` |  |
| `p25_roi_usd` |  |
| `p75_roi_usd` |  |
| `parent` |  |
| `pct_never_breakeven` |  |
| `program` |  |
| `rank_by_worst_roi` |  |
| `slug` |  |
| `url` |  |

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
| `ai_exposure` |  |
| `breakeven_age` |  |
| `cip_program_name` |  |
| `city` |  |
| `completion_adjusted_roi_usd` |  |
| `control` |  |
| `dropout_roi_usd` |  |
| `freopp_program_coverage` |  |
| `graduate` |  |
| `kind` |  |
| `mean_lifetime_roi_usd` |  |
| `median_breakeven_age` |  |
| `median_earnings_10yr_usd` |  |
| `median_lifetime_roi_usd` |  |
| `meta` |  |
| `name` |  |
| `npv_30yr_nonresident_usd` |  |
| `npv_30yr_resident_usd` |  |
| `p25_roi_usd` |  |
| `p75_roi_usd` |  |
| `parent` |  |
| `pct_never_breakeven` |  |
| `program` |  |
| `rank_by_worst_roi` |  |
| `slug` |  |
| `state` |  |
| `state_name` |  |
| `total_cost_of_attendance_nonresident_usd` |  |
| `total_cost_of_attendance_usd` |  |
| `unitid` |  |
| `url` |  |

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
| `graduate` |  |
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

Create an instance: `local best_value = client:BestValue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `college` | `table` |  |
| `page_url` | `string` |  |
| `state` | `string` |  |
| `state_name` | `string` |  |

#### Example: List

```lua
local best_values, err = client:BestValue():list()
```


### College

Create an instance: `local college = client:College(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakeven_age` | `any` |  |
| `city` | `string` |  |
| `control` | `string` |  |
| `freopp_program_coverage` | `number` |  |
| `median_earnings_10yr_usd` | `number` |  |
| `name` | `string` |  |
| `npv_30yr_nonresident_usd` | `any` |  |
| `npv_30yr_resident_usd` | `number` |  |
| `slug` | `string` |  |
| `state` | `string` |  |
| `state_name` | `string` |  |
| `total_cost_of_attendance_nonresident_usd` | `any` |  |
| `total_cost_of_attendance_usd` | `number` |  |
| `unitid` | `number` |  |
| `url` | `string` |  |

#### Example: List

```lua
local colleges, err = client:College():list()
```


### Index

Create an instance: `local index = client:Index(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local index, err = client:Index():load()
```


### Major

Create an instance: `local major = client:Major(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `any` |  |
| `cip_program_name` | `any` |  |
| `completion_adjusted_roi_usd` | `any` |  |
| `dropout_roi_usd` | `any` |  |
| `graduate` | `number` |  |
| `kind` | `string` |  |
| `mean_lifetime_roi_usd` | `number` |  |
| `median_breakeven_age` | `any` |  |
| `median_lifetime_roi_usd` | `number` |  |
| `name` | `string` |  |
| `p25_roi_usd` | `number` |  |
| `p75_roi_usd` | `number` |  |
| `parent` | `any` |  |
| `pct_never_breakeven` | `number` |  |
| `program` | `number` |  |
| `rank_by_worst_roi` | `number` |  |
| `slug` | `string` |  |
| `url` | `string` |  |

#### Example: List

```lua
local majors, err = client:Major():list()
```


### Openapi

Create an instance: `local openapi = client:Openapi(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local openapi, err = client:Openapi():load()
```


### OutOfStatePenalty

Create an instance: `local out_of_state_penalty = client:OutOfStatePenalty(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `institution` | `string` |  |
| `npv_nonresident_usd` | `number` |  |
| `npv_resident_usd` | `number` |  |
| `oos_penalty_30yr_npv_usd` | `number` |  |
| `rank` | `number` |  |
| `state` | `string` |  |
| `tuition_in_state_usd` | `number` |  |
| `tuition_out_of_state_usd` | `number` |  |

#### Example: List

```lua
local out_of_state_penaltys, err = client:OutOfStatePenalty():list()
```


### Slug

Create an instance: `local slug = client:Slug(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `any` |  |
| `breakeven_age` | `any` |  |
| `cip_program_name` | `any` |  |
| `city` | `string` |  |
| `completion_adjusted_roi_usd` | `any` |  |
| `control` | `string` |  |
| `dropout_roi_usd` | `any` |  |
| `freopp_program_coverage` | `number` |  |
| `graduate` | `number` |  |
| `kind` | `string` |  |
| `mean_lifetime_roi_usd` | `number` |  |
| `median_breakeven_age` | `any` |  |
| `median_earnings_10yr_usd` | `number` |  |
| `median_lifetime_roi_usd` | `number` |  |
| `meta` | `table` |  |
| `name` | `string` |  |
| `npv_30yr_nonresident_usd` | `any` |  |
| `npv_30yr_resident_usd` | `number` |  |
| `p25_roi_usd` | `number` |  |
| `p75_roi_usd` | `number` |  |
| `parent` | `any` |  |
| `pct_never_breakeven` | `number` |  |
| `program` | `number` |  |
| `rank_by_worst_roi` | `number` |  |
| `slug` | `string` |  |
| `state` | `string` |  |
| `state_name` | `string` |  |
| `total_cost_of_attendance_nonresident_usd` | `any` |  |
| `total_cost_of_attendance_usd` | `number` |  |
| `unitid` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local slug, err = client:Slug():load({ slug = "slug" })
```


### State

Create an instance: `local state = client:State(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `control` | `string` |  |
| `institution` | `string` |  |
| `npv_30yr_resident_usd` | `number` |  |
| `rank_in_state` | `number` |  |

#### Example: List

```lua
local states, err = client:State():list()
```


### Top50

Create an instance: `local top_50 = client:Top50(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `institution` | `string` |  |
| `npv_nonresident_usd` | `number` |  |
| `npv_resident_usd` | `number` |  |
| `oos_penalty_30yr_npv_usd` | `number` |  |
| `rank` | `number` |  |
| `state` | `string` |  |
| `tuition_in_state_usd` | `number` |  |
| `tuition_out_of_state_usd` | `number` |  |

#### Example: List

```lua
local top_50s, err = client:Top50():list()
```


### WorstRoiMajor

Create an instance: `local worst_roi_major = client:WorstRoiMajor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `graduate` | `number` |  |
| `mean_lifetime_roi_usd` | `number` |  |
| `median_breakeven_age` | `any` |  |
| `median_lifetime_roi_usd` | `number` |  |
| `name` | `string` |  |
| `pct_never_breakeven` | `number` |  |
| `rank` | `number` |  |
| `slug` | `string` |  |
| `url` | `string` |  |

#### Example: List

```lua
local worst_roi_majors, err = client:WorstRoiMajor():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── college-roi_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`college-roi_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local bestvalue = client:BestValue()
bestvalue:list()

-- bestvalue:data_get() now returns the bestvalue data from the last list
-- bestvalue:match_get() returns the last match criteria
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
