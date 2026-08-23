# CollegeRoi PHP SDK



The PHP SDK for the CollegeRoi API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->BestValue()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/college-roi-sdk/releases](https://github.com/voxgig-sdk/college-roi-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'collegeroi_sdk.php';

$client = new CollegeRoiSDK();
```

### 2. List bestvalue records

```php
try {
    // list() returns an array of BestValue records — iterate directly.
    $bestvalues = $client->BestValue()->list();
    foreach ($bestvalues as $item) {
        echo $item["colleges"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a slug

Slug is nested under slug, so provide the `slug`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Slug record (throws on error).
    $slug = $client->Slug()->load(["slug" => "example_slug"]);
    print_r($slug);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $top50s = $client->Top50()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = CollegeRoiSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$top50 = $client->Top50()->list();
print_r($top50);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CollegeRoiSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
COLLEGE_ROI_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CollegeRoiSDK

```php
require_once 'collegeroi_sdk.php';
$client = new CollegeRoiSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CollegeRoiSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CollegeRoiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `BestValue` | `($data): BestValueEntity` | Create a BestValue entity instance. |
| `College` | `($data): CollegeEntity` | Create a College entity instance. |
| `Index` | `($data): IndexEntity` | Create an Index entity instance. |
| `Major` | `($data): MajorEntity` | Create a Major entity instance. |
| `Openapi` | `($data): OpenapiEntity` | Create an Openapi entity instance. |
| `OutOfStatePenalty` | `($data): OutOfStatePenaltyEntity` | Create an OutOfStatePenalty entity instance. |
| `Slug` | `($data): SlugEntity` | Create a Slug entity instance. |
| `State` | `($data): StateEntity` | Create a State entity instance. |
| `Top50` | `($data): Top50Entity` | Create a Top50 entity instance. |
| `WorstRoiMajor` | `($data): WorstRoiMajorEntity` | Create a WorstRoiMajor entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$best_value = $client->BestValue();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `colleges` | `array` |  |
| `page_url` | `string` |  |
| `state` | `string` |  |
| `state_name` | `string` |  |

#### Example: List

```php
// list() returns an array of BestValue records (throws on error).
$best_values = $client->BestValue()->list();
```


### College

Create an instance: `$college = $client->College();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakeven_age` | `mixed` |  |
| `city` | `string` |  |
| `control` | `string` |  |
| `freopp_program_coverage` | `int` | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | `int` | FREOPP cohort-weighted earnings ten years after entry. |
| `name` | `string` |  |
| `npv_30yr_nonresident_usd` | `mixed` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | 30-year projected net value at resident pricing. |
| `slug` | `string` |  |
| `state` | `string` | USPS 2-letter state code. |
| `state_name` | `string` |  |
| `total_cost_of_attendance_nonresident_usd` | `mixed` |  |
| `total_cost_of_attendance_usd` | `int` |  |
| `unitid` | `int` | IPEDS UnitID — the universal join key. |
| `url` | `string` | The human-readable page for this school. |

#### Example: List

```php
// list() returns an array of College records (throws on error).
$colleges = $client->College()->list();
```


### Index

Create an instance: `$index = $client->Index();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Index record (throws on error).
$index = $client->Index()->load();
```


### Major

Create an instance: `$major = $client->Major();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `mixed` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | `mixed` | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` | `mixed` |  |
| `dropout_roi_usd` | `mixed` |  |
| `graduates` | `int` |  |
| `kind` | `string` |  |
| `mean_lifetime_roi_usd` | `float` |  |
| `median_breakeven_age` | `mixed` |  |
| `median_lifetime_roi_usd` | `float` |  |
| `name` | `string` |  |
| `p25_roi_usd` | `float` |  |
| `p75_roi_usd` | `float` |  |
| `parent` | `mixed` | Parent category — subfields only. |
| `pct_never_breakeven` | `float` | Share of graduates who never break even, percent. |
| `programs` | `int` |  |
| `rank_by_worst_roi` | `int` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` |  |
| `url` | `string` | The human-readable page for this major. |

#### Example: List

```php
// list() returns an array of Major records (throws on error).
$majors = $client->Major()->list();
```


### Openapi

Create an instance: `$openapi = $client->Openapi();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Openapi record (throws on error).
$openapi = $client->Openapi()->load();
```


### OutOfStatePenalty

Create an instance: `$out_of_state_penalty = $client->OutOfStatePenalty();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```php
// list() returns an array of OutOfStatePenalty records (throws on error).
$out_of_state_penaltys = $client->OutOfStatePenalty()->list();
```


### Slug

Create an instance: `$slug = $client->Slug();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `mixed` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` | `mixed` |  |
| `cip_program_name` | `mixed` | CIP program-family name — subfields only. |
| `city` | `string` |  |
| `completion_adjusted_roi_usd` | `mixed` |  |
| `control` | `string` |  |
| `dropout_roi_usd` | `mixed` |  |
| `freopp_program_coverage` | `int` | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` | `int` |  |
| `kind` | `string` |  |
| `mean_lifetime_roi_usd` | `float` |  |
| `median_breakeven_age` | `mixed` |  |
| `median_earnings_10yr_usd` | `int` | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` | `float` |  |
| `meta` | `array` | Provenance block carried by every payload. |
| `name` | `string` |  |
| `npv_30yr_nonresident_usd` | `mixed` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | 30-year projected net value at resident pricing. |
| `p25_roi_usd` | `float` |  |
| `p75_roi_usd` | `float` |  |
| `parent` | `mixed` | Parent category — subfields only. |
| `pct_never_breakeven` | `float` | Share of graduates who never break even, percent. |
| `programs` | `int` |  |
| `rank_by_worst_roi` | `int` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` |  |
| `state` | `string` | USPS 2-letter state code. |
| `state_name` | `string` |  |
| `total_cost_of_attendance_nonresident_usd` | `mixed` |  |
| `total_cost_of_attendance_usd` | `int` |  |
| `unitid` | `int` | IPEDS UnitID — the universal join key. |
| `url` | `string` | The human-readable page for this school. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Slug record (throws on error).
$slug = $client->Slug()->load(["slug" => "slug"]);
```


### State

Create an instance: `$state = $client->State();`

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
| `npv_30yr_resident_usd` | `int` |  |
| `rank_in_state` | `int` |  |

#### Example: List

```php
// list() returns an array of State records (throws on error).
$states = $client->State()->list();
```


### Top50

Create an instance: `$top_50 = $client->Top50();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```php
// list() returns an array of Top50 records (throws on error).
$top_50s = $client->Top50()->list();
```


### WorstRoiMajor

Create an instance: `$worst_roi_major = $client->WorstRoiMajor();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `graduates` | `int` |  |
| `mean_lifetime_roi_usd` | `float` |  |
| `median_breakeven_age` | `mixed` |  |
| `median_lifetime_roi_usd` | `float` |  |
| `name` | `string` |  |
| `pct_never_breakeven` | `float` |  |
| `rank` | `int` |  |
| `slug` | `string` |  |
| `url` | `string` |  |

#### Example: List

```php
// list() returns an array of WorstRoiMajor records (throws on error).
$worst_roi_majors = $client->WorstRoiMajor()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── collegeroi_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`collegeroi_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$top50 = $client->Top50();
$top50->list();

// $top50->data_get() now returns the top50 data from the last list
// $top50->match_get() returns the last match criteria
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
