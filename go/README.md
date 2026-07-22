# CollegeRoi Golang SDK



The Golang SDK for the CollegeRoi API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.BestValue(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/college-roi-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/college-roi-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/college-roi-sdk/go=../college-roi-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/college-roi-sdk/go"
)

func main() {
    client := sdk.New()

    // List bestValue records — the value is the array of records itself.
    bestValues, err := client.BestValue(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range bestValues.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
bestvalues, err := client.BestValue(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = bestvalues
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

bestValue, err := client.BestValue(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(bestValue) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewCollegeRoiSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewCollegeRoiSDK

```go
func NewCollegeRoiSDK(options map[string]any) *CollegeRoiSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *CollegeRoiSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CollegeRoiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `BestValue` | `(data map[string]any) CollegeRoiEntity` | Create a BestValue entity instance. |
| `College` | `(data map[string]any) CollegeRoiEntity` | Create a College entity instance. |
| `Index` | `(data map[string]any) CollegeRoiEntity` | Create an Index entity instance. |
| `Major` | `(data map[string]any) CollegeRoiEntity` | Create a Major entity instance. |
| `Openapi` | `(data map[string]any) CollegeRoiEntity` | Create an Openapi entity instance. |
| `OutOfStatePenalty` | `(data map[string]any) CollegeRoiEntity` | Create an OutOfStatePenalty entity instance. |
| `Slug` | `(data map[string]any) CollegeRoiEntity` | Create a Slug entity instance. |
| `State` | `(data map[string]any) CollegeRoiEntity` | Create a State entity instance. |
| `Top50` | `(data map[string]any) CollegeRoiEntity` | Create a Top50 entity instance. |
| `WorstRoiMajor` | `(data map[string]any) CollegeRoiEntity` | Create a WorstRoiMajor entity instance. |

### Entity interface (CollegeRoiEntity)

All entities implement the `CollegeRoiEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    bestValue, err := client.BestValue(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // bestValue is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### BestValue

| Field | Description |
| --- | --- |
| `"college"` |  |
| `"page_url"` |  |
| `"state"` |  |
| `"state_name"` |  |

Operations: List.

API path: `/api/v1/rankings/best-value.json`

#### College

| Field | Description |
| --- | --- |
| `"breakeven_age"` |  |
| `"city"` |  |
| `"control"` |  |
| `"freopp_program_coverage"` |  |
| `"median_earnings_10yr_usd"` |  |
| `"name"` |  |
| `"npv_30yr_nonresident_usd"` |  |
| `"npv_30yr_resident_usd"` |  |
| `"slug"` |  |
| `"state"` |  |
| `"state_name"` |  |
| `"total_cost_of_attendance_nonresident_usd"` |  |
| `"total_cost_of_attendance_usd"` |  |
| `"unitid"` |  |
| `"url"` |  |

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
| `"ai_exposure"` |  |
| `"cip_program_name"` |  |
| `"completion_adjusted_roi_usd"` |  |
| `"dropout_roi_usd"` |  |
| `"graduate"` |  |
| `"kind"` |  |
| `"mean_lifetime_roi_usd"` |  |
| `"median_breakeven_age"` |  |
| `"median_lifetime_roi_usd"` |  |
| `"name"` |  |
| `"p25_roi_usd"` |  |
| `"p75_roi_usd"` |  |
| `"parent"` |  |
| `"pct_never_breakeven"` |  |
| `"program"` |  |
| `"rank_by_worst_roi"` |  |
| `"slug"` |  |
| `"url"` |  |

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
| `"institution"` |  |
| `"npv_nonresident_usd"` |  |
| `"npv_resident_usd"` |  |
| `"oos_penalty_30yr_npv_usd"` |  |
| `"rank"` |  |
| `"state"` |  |
| `"tuition_in_state_usd"` |  |
| `"tuition_out_of_state_usd"` |  |

Operations: List.

API path: `/api/v1/rankings/out-of-state-penalty.json`

#### Slug

| Field | Description |
| --- | --- |
| `"ai_exposure"` |  |
| `"breakeven_age"` |  |
| `"cip_program_name"` |  |
| `"city"` |  |
| `"completion_adjusted_roi_usd"` |  |
| `"control"` |  |
| `"dropout_roi_usd"` |  |
| `"freopp_program_coverage"` |  |
| `"graduate"` |  |
| `"kind"` |  |
| `"mean_lifetime_roi_usd"` |  |
| `"median_breakeven_age"` |  |
| `"median_earnings_10yr_usd"` |  |
| `"median_lifetime_roi_usd"` |  |
| `"meta"` |  |
| `"name"` |  |
| `"npv_30yr_nonresident_usd"` |  |
| `"npv_30yr_resident_usd"` |  |
| `"p25_roi_usd"` |  |
| `"p75_roi_usd"` |  |
| `"parent"` |  |
| `"pct_never_breakeven"` |  |
| `"program"` |  |
| `"rank_by_worst_roi"` |  |
| `"slug"` |  |
| `"state"` |  |
| `"state_name"` |  |
| `"total_cost_of_attendance_nonresident_usd"` |  |
| `"total_cost_of_attendance_usd"` |  |
| `"unitid"` |  |
| `"url"` |  |

Operations: Load.

API path: `/api/v1/colleges/{slug}.json`

#### State

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"control"` |  |
| `"institution"` |  |
| `"npv_30yr_resident_usd"` |  |
| `"rank_in_state"` |  |

Operations: List.

API path: `/api/v1/rankings/best-value/{state}.json`

#### Top50

| Field | Description |
| --- | --- |
| `"institution"` |  |
| `"npv_nonresident_usd"` |  |
| `"npv_resident_usd"` |  |
| `"oos_penalty_30yr_npv_usd"` |  |
| `"rank"` |  |
| `"state"` |  |
| `"tuition_in_state_usd"` |  |
| `"tuition_out_of_state_usd"` |  |

Operations: List.

API path: `/api/v1/rankings/out-of-state-penalty/top-50.json`

#### WorstRoiMajor

| Field | Description |
| --- | --- |
| `"graduate"` |  |
| `"mean_lifetime_roi_usd"` |  |
| `"median_breakeven_age"` |  |
| `"median_lifetime_roi_usd"` |  |
| `"name"` |  |
| `"pct_never_breakeven"` |  |
| `"rank"` |  |
| `"slug"` |  |
| `"url"` |  |

Operations: List.

API path: `/api/v1/rankings/worst-roi-majors.json`



## Entities


### BestValue

Create an instance: `bestValue := client.BestValue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `college` | `[]any` |  |
| `page_url` | `string` |  |
| `state` | `string` |  |
| `state_name` | `string` |  |

#### Example: List

```go
bestValues, err := client.BestValue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(bestValues) // the array of records
```


### College

Create an instance: `college := client.College(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakeven_age` | `any` |  |
| `city` | `string` |  |
| `control` | `string` |  |
| `freopp_program_coverage` | `int` |  |
| `median_earnings_10yr_usd` | `int` |  |
| `name` | `string` |  |
| `npv_30yr_nonresident_usd` | `any` |  |
| `npv_30yr_resident_usd` | `int` |  |
| `slug` | `string` |  |
| `state` | `string` |  |
| `state_name` | `string` |  |
| `total_cost_of_attendance_nonresident_usd` | `any` |  |
| `total_cost_of_attendance_usd` | `int` |  |
| `unitid` | `int` |  |
| `url` | `string` |  |

#### Example: List

```go
colleges, err := client.College(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(colleges) // the array of records
```


### Index

Create an instance: `index := client.Index(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
index, err := client.Index(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(index) // the loaded record
```


### Major

Create an instance: `major := client.Major(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `any` |  |
| `cip_program_name` | `any` |  |
| `completion_adjusted_roi_usd` | `any` |  |
| `dropout_roi_usd` | `any` |  |
| `graduate` | `int` |  |
| `kind` | `string` |  |
| `mean_lifetime_roi_usd` | `float64` |  |
| `median_breakeven_age` | `any` |  |
| `median_lifetime_roi_usd` | `float64` |  |
| `name` | `string` |  |
| `p25_roi_usd` | `float64` |  |
| `p75_roi_usd` | `float64` |  |
| `parent` | `any` |  |
| `pct_never_breakeven` | `float64` |  |
| `program` | `int` |  |
| `rank_by_worst_roi` | `int` |  |
| `slug` | `string` |  |
| `url` | `string` |  |

#### Example: List

```go
majors, err := client.Major(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(majors) // the array of records
```


### Openapi

Create an instance: `openapi := client.Openapi(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
openapi, err := client.Openapi(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(openapi) // the loaded record
```


### OutOfStatePenalty

Create an instance: `outOfStatePenalty := client.OutOfStatePenalty(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `institution` | `string` |  |
| `npv_nonresident_usd` | `int` |  |
| `npv_resident_usd` | `int` |  |
| `oos_penalty_30yr_npv_usd` | `int` |  |
| `rank` | `int` |  |
| `state` | `string` |  |
| `tuition_in_state_usd` | `int` |  |
| `tuition_out_of_state_usd` | `int` |  |

#### Example: List

```go
outOfStatePenaltys, err := client.OutOfStatePenalty(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(outOfStatePenaltys) // the array of records
```


### Slug

Create an instance: `slug := client.Slug(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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
| `freopp_program_coverage` | `int` |  |
| `graduate` | `int` |  |
| `kind` | `string` |  |
| `mean_lifetime_roi_usd` | `float64` |  |
| `median_breakeven_age` | `any` |  |
| `median_earnings_10yr_usd` | `int` |  |
| `median_lifetime_roi_usd` | `float64` |  |
| `meta` | `map[string]any` |  |
| `name` | `string` |  |
| `npv_30yr_nonresident_usd` | `any` |  |
| `npv_30yr_resident_usd` | `int` |  |
| `p25_roi_usd` | `float64` |  |
| `p75_roi_usd` | `float64` |  |
| `parent` | `any` |  |
| `pct_never_breakeven` | `float64` |  |
| `program` | `int` |  |
| `rank_by_worst_roi` | `int` |  |
| `slug` | `string` |  |
| `state` | `string` |  |
| `state_name` | `string` |  |
| `total_cost_of_attendance_nonresident_usd` | `any` |  |
| `total_cost_of_attendance_usd` | `int` |  |
| `unitid` | `int` |  |
| `url` | `string` |  |

#### Example: Load

```go
slug, err := client.Slug(nil).Load(map[string]any{"slug": "slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(slug) // the loaded record
```


### State

Create an instance: `state := client.State(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `control` | `string` |  |
| `institution` | `string` |  |
| `npv_30yr_resident_usd` | `int` |  |
| `rank_in_state` | `int` |  |

#### Example: List

```go
states, err := client.State(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(states) // the array of records
```


### Top50

Create an instance: `top50 := client.Top50(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `institution` | `string` |  |
| `npv_nonresident_usd` | `int` |  |
| `npv_resident_usd` | `int` |  |
| `oos_penalty_30yr_npv_usd` | `int` |  |
| `rank` | `int` |  |
| `state` | `string` |  |
| `tuition_in_state_usd` | `int` |  |
| `tuition_out_of_state_usd` | `int` |  |

#### Example: List

```go
top50s, err := client.Top50(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(top50s) // the array of records
```


### WorstRoiMajor

Create an instance: `worstRoiMajor := client.WorstRoiMajor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `graduate` | `int` |  |
| `mean_lifetime_roi_usd` | `float64` |  |
| `median_breakeven_age` | `any` |  |
| `median_lifetime_roi_usd` | `float64` |  |
| `name` | `string` |  |
| `pct_never_breakeven` | `float64` |  |
| `rank` | `int` |  |
| `slug` | `string` |  |
| `url` | `string` |  |

#### Example: List

```go
worstRoiMajors, err := client.WorstRoiMajor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(worstRoiMajors) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/college-roi-sdk/go/
├── college-roi.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/college-roi-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
bestvalue := client.BestValue(nil)
bestvalue.List(nil, nil)

// bestvalue.Data() now returns the bestvalue data from the last list
// bestvalue.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
