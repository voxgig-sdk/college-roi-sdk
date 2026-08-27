# CollegeRoi PHP SDK Reference

Complete API reference for the CollegeRoi PHP SDK.


## CollegeRoiSDK

### Constructor

```php
require_once __DIR__ . '/collegeroi_sdk.php';

$client = new CollegeRoiSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CollegeRoiSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CollegeRoiSDK::test();
```


### Instance Methods

#### `BestValue($data = null)`

Create a new `BestValueEntity` instance. Pass `null` for no initial data.

#### `College($data = null)`

Create a new `CollegeEntity` instance. Pass `null` for no initial data.

#### `Index($data = null)`

Create a new `IndexEntity` instance. Pass `null` for no initial data.

#### `Major($data = null)`

Create a new `MajorEntity` instance. Pass `null` for no initial data.

#### `Openapi($data = null)`

Create a new `OpenapiEntity` instance. Pass `null` for no initial data.

#### `OutOfStatePenalty($data = null)`

Create a new `OutOfStatePenaltyEntity` instance. Pass `null` for no initial data.

#### `Slug($data = null)`

Create a new `SlugEntity` instance. Pass `null` for no initial data.

#### `State($data = null)`

Create a new `StateEntity` instance. Pass `null` for no initial data.

#### `Top50($data = null)`

Create a new `Top50Entity` instance. Pass `null` for no initial data.

#### `WorstRoiMajor($data = null)`

Create a new `WorstRoiMajorEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CollegeRoiUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BestValueEntity

```php
$best_value = $client->BestValue();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `colleges` | `array` | No |  |
| `page_url` | `string` | No |  |
| `state` | `string` | No |  |
| `state_name` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->BestValue()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BestValueEntity`

Create a new `BestValueEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CollegeEntity

```php
$college = $client->College();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `breakeven_age` | `mixed` | No |  |
| `city` | `string` | Yes |  |
| `control` | `string` | Yes |  |
| `freopp_program_coverage` | `int` | No | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | `int` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `name` | `string` | Yes |  |
| `npv_30yr_nonresident_usd` | `mixed` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | Yes | 30-year projected net value at resident pricing. |
| `slug` | `string` | Yes |  |
| `state` | `string` | Yes | USPS 2-letter state code. |
| `state_name` | `string` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `mixed` | No |  |
| `total_cost_of_attendance_usd` | `int` | No |  |
| `unitid` | `int` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `string` | Yes | The human-readable page for this school. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->College()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CollegeEntity`

Create a new `CollegeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IndexEntity

```php
$index = $client->Index();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Index()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IndexEntity`

Create a new `IndexEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MajorEntity

```php
$major = $client->Major();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `mixed` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | `mixed` | No | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` | `mixed` | No |  |
| `dropout_roi_usd` | `mixed` | No |  |
| `graduates` | `int` | No |  |
| `kind` | `string` | Yes |  |
| `mean_lifetime_roi_usd` | `float` | No |  |
| `median_breakeven_age` | `mixed` | No |  |
| `median_lifetime_roi_usd` | `float` | No |  |
| `name` | `string` | Yes |  |
| `p25_roi_usd` | `float` | No |  |
| `p75_roi_usd` | `float` | No |  |
| `parent` | `mixed` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `float` | No | Share of graduates who never break even, percent. |
| `programs` | `int` | No |  |
| `rank_by_worst_roi` | `int` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` | Yes |  |
| `url` | `string` | Yes | The human-readable page for this major. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Major()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MajorEntity`

Create a new `MajorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OpenapiEntity

```php
$openapi = $client->Openapi();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Openapi()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OpenapiEntity`

Create a new `OpenapiEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OutOfStatePenaltyEntity

```php
$out_of_state_penalty = $client->OutOfStatePenalty();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->OutOfStatePenalty()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OutOfStatePenaltyEntity`

Create a new `OutOfStatePenaltyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SlugEntity

```php
$slug = $client->Slug();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `mixed` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` | `mixed` | No |  |
| `cip_program_name` | `mixed` | No | CIP program-family name — subfields only. |
| `city` | `string` | Yes |  |
| `completion_adjusted_roi_usd` | `mixed` | No |  |
| `control` | `string` | Yes |  |
| `dropout_roi_usd` | `mixed` | No |  |
| `freopp_program_coverage` | `int` | No | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` | `int` | No |  |
| `kind` | `string` | Yes |  |
| `mean_lifetime_roi_usd` | `float` | No |  |
| `median_breakeven_age` | `mixed` | No |  |
| `median_earnings_10yr_usd` | `int` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` | `float` | No |  |
| `meta` | `array` | Yes | Provenance block carried by every payload. |
| `name` | `string` | Yes |  |
| `npv_30yr_nonresident_usd` | `mixed` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `int` | Yes | 30-year projected net value at resident pricing. |
| `p25_roi_usd` | `float` | No |  |
| `p75_roi_usd` | `float` | No |  |
| `parent` | `mixed` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `float` | No | Share of graduates who never break even, percent. |
| `programs` | `int` | No |  |
| `rank_by_worst_roi` | `int` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` | Yes |  |
| `state` | `string` | Yes | USPS 2-letter state code. |
| `state_name` | `string` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `mixed` | No |  |
| `total_cost_of_attendance_usd` | `int` | No |  |
| `unitid` | `int` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `string` | Yes | The human-readable page for this school. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Slug()->load(["slug" => "slug"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SlugEntity`

Create a new `SlugEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StateEntity

```php
$state = $client->State();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->State()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StateEntity`

Create a new `StateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Top50Entity

```php
$top_50 = $client->Top50();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Top50()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): Top50Entity`

Create a new `Top50Entity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WorstRoiMajorEntity

```php
$worst_roi_major = $client->WorstRoiMajor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `graduates` | `int` | No |  |
| `mean_lifetime_roi_usd` | `float` | No |  |
| `median_breakeven_age` | `mixed` | No |  |
| `median_lifetime_roi_usd` | `float` | No |  |
| `name` | `string` | No |  |
| `pct_never_breakeven` | `float` | No |  |
| `rank` | `int` | No |  |
| `slug` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->WorstRoiMajor()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WorstRoiMajorEntity`

Create a new `WorstRoiMajorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CollegeRoiSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
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

