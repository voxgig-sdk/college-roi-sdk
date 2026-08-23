# CollegeRoi Ruby SDK



The Ruby SDK for the CollegeRoi API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.BestValue` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/college-roi-sdk/releases](https://github.com/voxgig-sdk/college-roi-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "CollegeRoi_sdk"

client = CollegeRoiSDK.new
```

### 2. List bestvalue records

```ruby
begin
  # list returns an Array of BestValue records — iterate directly.
  bestvalues = client.BestValue.list
  bestvalues.each do |item|
    puts "#{item["colleges"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a slug

Slug is nested under slug, so provide the `slug`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Slug record (raises on error).
  slug = client.Slug.load({ "slug" => "example_slug" })
  puts slug
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  top50s = client.Top50.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = CollegeRoiSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
top50 = client.Top50.list()
puts top50
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = CollegeRoiSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### CollegeRoiSDK

```ruby
require_relative "CollegeRoi_sdk"
client = CollegeRoiSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = CollegeRoiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CollegeRoiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `CollegeRoiError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `best_value = client.BestValue`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `colleges` | `Array` |  |
| `page_url` | `String` |  |
| `state` | `String` |  |
| `state_name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of BestValue records (raises on error).
best_values = client.BestValue.list
```


### College

Create an instance: `college = client.College`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakeven_age` | `Object` |  |
| `city` | `String` |  |
| `control` | `String` |  |
| `freopp_program_coverage` | `Integer` | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | `Integer` | FREOPP cohort-weighted earnings ten years after entry. |
| `name` | `String` |  |
| `npv_30yr_nonresident_usd` | `Object` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `Integer` | 30-year projected net value at resident pricing. |
| `slug` | `String` |  |
| `state` | `String` | USPS 2-letter state code. |
| `state_name` | `String` |  |
| `total_cost_of_attendance_nonresident_usd` | `Object` |  |
| `total_cost_of_attendance_usd` | `Integer` |  |
| `unitid` | `Integer` | IPEDS UnitID — the universal join key. |
| `url` | `String` | The human-readable page for this school. |

#### Example: List

```ruby
# list returns an Array of College records (raises on error).
colleges = client.College.list
```


### Index

Create an instance: `index = client.Index`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Index record (raises on error).
index = client.Index.load()
```


### Major

Create an instance: `major = client.Major`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `Object` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | `Object` | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` | `Object` |  |
| `dropout_roi_usd` | `Object` |  |
| `graduates` | `Integer` |  |
| `kind` | `String` |  |
| `mean_lifetime_roi_usd` | `Float` |  |
| `median_breakeven_age` | `Object` |  |
| `median_lifetime_roi_usd` | `Float` |  |
| `name` | `String` |  |
| `p25_roi_usd` | `Float` |  |
| `p75_roi_usd` | `Float` |  |
| `parent` | `Object` | Parent category — subfields only. |
| `pct_never_breakeven` | `Float` | Share of graduates who never break even, percent. |
| `programs` | `Integer` |  |
| `rank_by_worst_roi` | `Integer` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `String` |  |
| `url` | `String` | The human-readable page for this major. |

#### Example: List

```ruby
# list returns an Array of Major records (raises on error).
majors = client.Major.list
```


### Openapi

Create an instance: `openapi = client.Openapi`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Openapi record (raises on error).
openapi = client.Openapi.load()
```


### OutOfStatePenalty

Create an instance: `out_of_state_penalty = client.OutOfStatePenalty`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `institution` | `String` |  |
| `npv_nonresident_usd` | `Integer` |  |
| `npv_resident_usd` | `Integer` |  |
| `oos_penalty_30yr_npv_usd` | `Integer` |  |
| `rank` | `Integer` |  |
| `state` | `String` |  |
| `tuition_in_state_usd` | `Integer` |  |
| `tuition_out_of_state_usd` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of OutOfStatePenalty records (raises on error).
out_of_state_penaltys = client.OutOfStatePenalty.list
```


### Slug

Create an instance: `slug = client.Slug`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `Object` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` | `Object` |  |
| `cip_program_name` | `Object` | CIP program-family name — subfields only. |
| `city` | `String` |  |
| `completion_adjusted_roi_usd` | `Object` |  |
| `control` | `String` |  |
| `dropout_roi_usd` | `Object` |  |
| `freopp_program_coverage` | `Integer` | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` | `Integer` |  |
| `kind` | `String` |  |
| `mean_lifetime_roi_usd` | `Float` |  |
| `median_breakeven_age` | `Object` |  |
| `median_earnings_10yr_usd` | `Integer` | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` | `Float` |  |
| `meta` | `Hash` | Provenance block carried by every payload. |
| `name` | `String` |  |
| `npv_30yr_nonresident_usd` | `Object` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `Integer` | 30-year projected net value at resident pricing. |
| `p25_roi_usd` | `Float` |  |
| `p75_roi_usd` | `Float` |  |
| `parent` | `Object` | Parent category — subfields only. |
| `pct_never_breakeven` | `Float` | Share of graduates who never break even, percent. |
| `programs` | `Integer` |  |
| `rank_by_worst_roi` | `Integer` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `String` |  |
| `state` | `String` | USPS 2-letter state code. |
| `state_name` | `String` |  |
| `total_cost_of_attendance_nonresident_usd` | `Object` |  |
| `total_cost_of_attendance_usd` | `Integer` |  |
| `unitid` | `Integer` | IPEDS UnitID — the universal join key. |
| `url` | `String` | The human-readable page for this school. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Slug record (raises on error).
slug = client.Slug.load({ "slug" => "slug" })
```


### State

Create an instance: `state = client.State`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `String` |  |
| `control` | `String` |  |
| `institution` | `String` |  |
| `npv_30yr_resident_usd` | `Integer` |  |
| `rank_in_state` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of State records (raises on error).
states = client.State.list
```


### Top50

Create an instance: `top_50 = client.Top50`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `institution` | `String` |  |
| `npv_nonresident_usd` | `Integer` |  |
| `npv_resident_usd` | `Integer` |  |
| `oos_penalty_30yr_npv_usd` | `Integer` |  |
| `rank` | `Integer` |  |
| `state` | `String` |  |
| `tuition_in_state_usd` | `Integer` |  |
| `tuition_out_of_state_usd` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Top50 records (raises on error).
top_50s = client.Top50.list
```


### WorstRoiMajor

Create an instance: `worst_roi_major = client.WorstRoiMajor`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `graduates` | `Integer` |  |
| `mean_lifetime_roi_usd` | `Float` |  |
| `median_breakeven_age` | `Object` |  |
| `median_lifetime_roi_usd` | `Float` |  |
| `name` | `String` |  |
| `pct_never_breakeven` | `Float` |  |
| `rank` | `Integer` |  |
| `slug` | `String` |  |
| `url` | `String` |  |

#### Example: List

```ruby
# list returns an Array of WorstRoiMajor records (raises on error).
worst_roi_majors = client.WorstRoiMajor.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── CollegeRoi_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`CollegeRoi_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
top50 = client.Top50
top50.list()

# top50.data_get now returns the top50 data from the last list
# top50.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
