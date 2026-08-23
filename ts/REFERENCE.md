# CollegeRoi TypeScript SDK Reference

Complete API reference for the CollegeRoi TypeScript SDK.


## CollegeRoiSDK

### Constructor

```ts
new CollegeRoiSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CollegeRoiSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CollegeRoiSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CollegeRoiSDK` instance in test mode.


### Instance Methods

#### `BestValue(data?: object)`

Create a new `BestValue` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BestValueEntity` instance.

#### `College(data?: object)`

Create a new `College` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CollegeEntity` instance.

#### `Index(data?: object)`

Create a new `Index` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IndexEntity` instance.

#### `Major(data?: object)`

Create a new `Major` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MajorEntity` instance.

#### `Openapi(data?: object)`

Create a new `Openapi` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OpenapiEntity` instance.

#### `OutOfStatePenalty(data?: object)`

Create a new `OutOfStatePenalty` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OutOfStatePenaltyEntity` instance.

#### `Slug(data?: object)`

Create a new `Slug` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SlugEntity` instance.

#### `State(data?: object)`

Create a new `State` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StateEntity` instance.

#### `Top50(data?: object)`

Create a new `Top50` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `Top50Entity` instance.

#### `WorstRoiMajor(data?: object)`

Create a new `WorstRoiMajor` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorstRoiMajorEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CollegeRoiSDK.test()`.

**Returns:** `CollegeRoiSDK` instance in test mode.


---

## BestValueEntity

```ts
const best_value = client.BestValue()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `colleges` | `any[]` | No |  |
| `page_url` | `string` | No |  |
| `state` | `string` | No |  |
| `state_name` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BestValue().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BestValueEntity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CollegeEntity

```ts
const college = client.College()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `breakeven_age` | `number | null` | No |  |
| `city` | `string` | Yes |  |
| `control` | `string` | Yes |  |
| `freopp_program_coverage` | `number` | No | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | `number` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `name` | `string` | Yes |  |
| `npv_30yr_nonresident_usd` | `number | null` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `number` | Yes | 30-year projected net value at resident pricing. |
| `slug` | `string` | Yes |  |
| `state` | `string` | Yes | USPS 2-letter state code. |
| `state_name` | `string` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `number | null` | No |  |
| `total_cost_of_attendance_usd` | `number` | No |  |
| `unitid` | `number` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `string` | Yes | The human-readable page for this school. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.College().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CollegeEntity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IndexEntity

```ts
const index = client.Index()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Index().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IndexEntity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MajorEntity

```ts
const major = client.Major()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `Record<string, any> | null` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | `string | null` | No | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` | `number | null` | No |  |
| `dropout_roi_usd` | `number | null` | No |  |
| `graduates` | `number` | No |  |
| `kind` | `string` | Yes |  |
| `mean_lifetime_roi_usd` | `number` | No |  |
| `median_breakeven_age` | `number | null` | No |  |
| `median_lifetime_roi_usd` | `number` | No |  |
| `name` | `string` | Yes |  |
| `p25_roi_usd` | `number` | No |  |
| `p75_roi_usd` | `number` | No |  |
| `parent` | `Record<string, any> | null` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `number` | No | Share of graduates who never break even, percent. |
| `programs` | `number` | No |  |
| `rank_by_worst_roi` | `number` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` | Yes |  |
| `url` | `string` | Yes | The human-readable page for this major. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Major().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MajorEntity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OpenapiEntity

```ts
const openapi = client.Openapi()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Openapi().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OpenapiEntity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OutOfStatePenaltyEntity

```ts
const out_of_state_penalty = client.OutOfStatePenalty()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.OutOfStatePenalty().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OutOfStatePenaltyEntity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SlugEntity

```ts
const slug = client.Slug()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_exposure` | `Record<string, any> | null` | No | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` | `number | null` | No |  |
| `cip_program_name` | `string | null` | No | CIP program-family name — subfields only. |
| `city` | `string` | Yes |  |
| `completion_adjusted_roi_usd` | `number | null` | No |  |
| `control` | `string` | Yes |  |
| `dropout_roi_usd` | `number | null` | No |  |
| `freopp_program_coverage` | `number` | No | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` | `number` | No |  |
| `kind` | `string` | Yes |  |
| `mean_lifetime_roi_usd` | `number` | No |  |
| `median_breakeven_age` | `number | null` | No |  |
| `median_earnings_10yr_usd` | `number` | No | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` | `number` | No |  |
| `meta` | `Record<string, any>` | Yes | Provenance block carried by every payload. |
| `name` | `string` | Yes |  |
| `npv_30yr_nonresident_usd` | `number | null` | No | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `number` | Yes | 30-year projected net value at resident pricing. |
| `p25_roi_usd` | `number` | No |  |
| `p75_roi_usd` | `number` | No |  |
| `parent` | `Record<string, any> | null` | No | Parent category — subfields only. |
| `pct_never_breakeven` | `number` | No | Share of graduates who never break even, percent. |
| `programs` | `number` | No |  |
| `rank_by_worst_roi` | `number` | Yes | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` | Yes |  |
| `state` | `string` | Yes | USPS 2-letter state code. |
| `state_name` | `string` | No |  |
| `total_cost_of_attendance_nonresident_usd` | `number | null` | No |  |
| `total_cost_of_attendance_usd` | `number` | No |  |
| `unitid` | `number` | Yes | IPEDS UnitID — the universal join key. |
| `url` | `string` | Yes | The human-readable page for this school. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Slug().load({ slug: 'slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SlugEntity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StateEntity

```ts
const state = client.State()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.State().list({ state: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StateEntity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Top50Entity

```ts
const top_50 = client.Top50()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Top50().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `Top50Entity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorstRoiMajorEntity

```ts
const worst_roi_major = client.WorstRoiMajor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `graduates` | `number` | No |  |
| `mean_lifetime_roi_usd` | `number` | No |  |
| `median_breakeven_age` | `number | null` | No |  |
| `median_lifetime_roi_usd` | `number` | No |  |
| `name` | `string` | No |  |
| `pct_never_breakeven` | `number` | No |  |
| `rank` | `number` | No |  |
| `slug` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.WorstRoiMajor().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorstRoiMajorEntity` instance with the same client and
options.

#### `client()`

Return the parent `CollegeRoiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CollegeRoiSDK({
  feature: {
    test: { active: true },
  }
})
```

