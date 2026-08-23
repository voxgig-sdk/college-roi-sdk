# CollegeRoi TypeScript SDK



The TypeScript SDK for the CollegeRoi API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.BestValue()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/college-roi-sdk/releases](https://github.com/voxgig-sdk/college-roi-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CollegeRoiSDK } from '@voxgig-sdk/college-roi'

const client = new CollegeRoiSDK()
```

### 2. List bestvalue records

`list()` resolves to an array of BestValue ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const bestvalues = await client.BestValue().list()

for (const bestvalue of bestvalues) {
  console.log(bestvalue)
}
```

### 3. Load a slug

Slug is nested under slug, so provide the `slug`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const slug = await client.Slug().load({
    slug: 'example_slug',
  })
  console.log(slug)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const top50s = await client.Top50().list()
  console.log(top50s)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CollegeRoiSDK.test()

const top50 = await client.Top50().list()
// top50 is the entity, populated with mock response data
// — call top50.data() for the record itself
console.log(top50)
```

You can also use the instance method:

```ts
const client = new CollegeRoiSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Top50()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CollegeRoiSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
COLLEGE_ROI_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### CollegeRoiSDK

#### Constructor

```ts
new CollegeRoiSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `BestValue(data?)` | `BestValueEntity` | Create a BestValue entity instance. |
| `College(data?)` | `CollegeEntity` | Create a College entity instance. |
| `Index(data?)` | `IndexEntity` | Create an Index entity instance. |
| `Major(data?)` | `MajorEntity` | Create a Major entity instance. |
| `Openapi(data?)` | `OpenapiEntity` | Create an Openapi entity instance. |
| `OutOfStatePenalty(data?)` | `OutOfStatePenaltyEntity` | Create an OutOfStatePenalty entity instance. |
| `Slug(data?)` | `SlugEntity` | Create a Slug entity instance. |
| `State(data?)` | `StateEntity` | Create a State entity instance. |
| `Top50(data?)` | `Top50Entity` | Create a Top50 entity instance. |
| `WorstRoiMajor(data?)` | `WorstRoiMajorEntity` | Create a WorstRoiMajor entity instance. |
| `tester(testopts?, sdkopts?)` | `CollegeRoiSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CollegeRoiSDK.test(testopts?, sdkopts?)` | `CollegeRoiSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CollegeRoiSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### BestValue

| Field | Description |
| --- | --- |
| `colleges` |  |
| `page_url` |  |
| `state` |  |
| `state_name` |  |

Operations: list.

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

Operations: list.

API path: `/api/v1/colleges.json`

#### Index

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list.

API path: `/api/v1/majors.json`

#### Openapi

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list.

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

Operations: load.

API path: `/api/v1/colleges/{slug}.json`

#### State

| Field | Description |
| --- | --- |
| `city` |  |
| `control` |  |
| `institution` |  |
| `npv_30yr_resident_usd` |  |
| `rank_in_state` |  |

Operations: list.

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

Operations: list.

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

Operations: list.

API path: `/api/v1/rankings/worst-roi-majors.json`



## Entities


### BestValue

Create an instance: `const best_value = client.BestValue()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `colleges` | `any[]` |  |
| `page_url` | `string` |  |
| `state` | `string` |  |
| `state_name` | `string` |  |

#### Example: List

```ts
const best_values = await client.BestValue().list()
```


### College

Create an instance: `const college = client.College()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `breakeven_age` | `number | null` |  |
| `city` | `string` |  |
| `control` | `string` |  |
| `freopp_program_coverage` | `number` | FREOPP-reported programs rolled into the earnings figure. |
| `median_earnings_10yr_usd` | `number` | FREOPP cohort-weighted earnings ten years after entry. |
| `name` | `string` |  |
| `npv_30yr_nonresident_usd` | `number | null` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `number` | 30-year projected net value at resident pricing. |
| `slug` | `string` |  |
| `state` | `string` | USPS 2-letter state code. |
| `state_name` | `string` |  |
| `total_cost_of_attendance_nonresident_usd` | `number | null` |  |
| `total_cost_of_attendance_usd` | `number` |  |
| `unitid` | `number` | IPEDS UnitID — the universal join key. |
| `url` | `string` | The human-readable page for this school. |

#### Example: List

```ts
const colleges = await client.College().list()
```


### Index

Create an instance: `const index = client.Index()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const index = await client.Index().load()
```


### Major

Create an instance: `const major = client.Major()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `Record<string, any> | null` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `cip_program_name` | `string | null` | CIP program-family name — subfields only. |
| `completion_adjusted_roi_usd` | `number | null` |  |
| `dropout_roi_usd` | `number | null` |  |
| `graduates` | `number` |  |
| `kind` | `string` |  |
| `mean_lifetime_roi_usd` | `number` |  |
| `median_breakeven_age` | `number | null` |  |
| `median_lifetime_roi_usd` | `number` |  |
| `name` | `string` |  |
| `p25_roi_usd` | `number` |  |
| `p75_roi_usd` | `number` |  |
| `parent` | `Record<string, any> | null` | Parent category — subfields only. |
| `pct_never_breakeven` | `number` | Share of graduates who never break even, percent. |
| `programs` | `number` |  |
| `rank_by_worst_roi` | `number` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` |  |
| `url` | `string` | The human-readable page for this major. |

#### Example: List

```ts
const majors = await client.Major().list()
```


### Openapi

Create an instance: `const openapi = client.Openapi()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const openapi = await client.Openapi().load()
```


### OutOfStatePenalty

Create an instance: `const out_of_state_penalty = client.OutOfStatePenalty()`

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

```ts
const out_of_state_penaltys = await client.OutOfStatePenalty().list()
```


### Slug

Create an instance: `const slug = client.Slug()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_exposure` | `Record<string, any> | null` | le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. |
| `breakeven_age` | `number | null` |  |
| `cip_program_name` | `string | null` | CIP program-family name — subfields only. |
| `city` | `string` |  |
| `completion_adjusted_roi_usd` | `number | null` |  |
| `control` | `string` |  |
| `dropout_roi_usd` | `number | null` |  |
| `freopp_program_coverage` | `number` | FREOPP-reported programs rolled into the earnings figure. |
| `graduates` | `number` |  |
| `kind` | `string` |  |
| `mean_lifetime_roi_usd` | `number` |  |
| `median_breakeven_age` | `number | null` |  |
| `median_earnings_10yr_usd` | `number` | FREOPP cohort-weighted earnings ten years after entry. |
| `median_lifetime_roi_usd` | `number` |  |
| `meta` | `Record<string, any>` | Provenance block carried by every payload. |
| `name` | `string` |  |
| `npv_30yr_nonresident_usd` | `number | null` | Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design. |
| `npv_30yr_resident_usd` | `number` | 30-year projected net value at resident pricing. |
| `p25_roi_usd` | `number` |  |
| `p75_roi_usd` | `number` |  |
| `parent` | `Record<string, any> | null` | Parent category — subfields only. |
| `pct_never_breakeven` | `number` | Share of graduates who never break even, percent. |
| `programs` | `number` |  |
| `rank_by_worst_roi` | `number` | Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields). |
| `slug` | `string` |  |
| `state` | `string` | USPS 2-letter state code. |
| `state_name` | `string` |  |
| `total_cost_of_attendance_nonresident_usd` | `number | null` |  |
| `total_cost_of_attendance_usd` | `number` |  |
| `unitid` | `number` | IPEDS UnitID — the universal join key. |
| `url` | `string` | The human-readable page for this school. |

#### Example: Load

```ts
const slug = await client.Slug().load({ slug: 'slug' })
```


### State

Create an instance: `const state = client.State()`

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

```ts
const states = await client.State().list({ state: "example" })
```


### Top50

Create an instance: `const top_50 = client.Top50()`

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

```ts
const top_50s = await client.Top50().list()
```


### WorstRoiMajor

Create an instance: `const worst_roi_major = client.WorstRoiMajor()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `graduates` | `number` |  |
| `mean_lifetime_roi_usd` | `number` |  |
| `median_breakeven_age` | `number | null` |  |
| `median_lifetime_roi_usd` | `number` |  |
| `name` | `string` |  |
| `pct_never_breakeven` | `number` |  |
| `rank` | `number` |  |
| `slug` | `string` |  |
| `url` | `string` |  |

#### Example: List

```ts
const worst_roi_majors = await client.WorstRoiMajor().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
college-roi/
├── src/
│   ├── CollegeRoiSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CollegeRoiSDK } from '@voxgig-sdk/college-roi'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const top50 = client.Top50()
await top50.list()

// top50.data() now returns the top50 data from the last `list`
// top50.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
