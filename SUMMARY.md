# LE TEEN College ROI API

Static, read-only JSON: 30-year NPV for U.S. colleges (positive-NPV envelope), lifetime ROI for every bachelor&#39;s major category and subfield, and the standing rankings. No auth, no rate limit beyond CDN sanity. Free to use with attribution, cite LE TEEN, le-teen.com (and FREOPP/IPEDS/BEA as the upstream sources). Dataset DOI: https://doi.org/10.5281/zenodo.21351602. Methodology: https://le-teen.com/methodology.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 11 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### BestValue

Results: All 50 states + DC. NPV-positive rows only.

SDK operations: `list`.

### College

Results: Every gated college.

SDK operations: `list`.

Key fields to recognise:

- `freopp_program_coverage`: FREOPP-reported programs rolled into the earnings figure.
- `median_earnings_10yr_usd`: FREOPP cohort-weighted earnings ten years after entry.
- `npv_30yr_nonresident_usd`: Non-resident 30-year NPV, public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.
- `npv_30yr_resident_usd`: 30-year projected net value at resident pricing. Positive by gate.
- `state`: USPS 2-letter state code.

### Index

Results: The API root document.

SDK operations: `load`.

### Major

Results: Every major with statistics and page links.

SDK operations: `list`.

Key fields to recognise:

- `ai_exposure`: le-teen-derived AI applicability (exposure), how much of the field’s occupations AI is already used for. NOT displacement. Category rows only; null for subfields and dropped categories.
- `cip_program_name`: CIP program-family name, subfields only.
- `parent`: Parent category, subfields only.
- `pct_never_breakeven`: Share of graduates who never break even, percent.
- `rank_by_worst_roi`: Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).

### Openapi

Results: The OpenAPI 3.1 spec.

SDK operations: `load`.

### OutOfStatePenalty

Results: The full ranking. Every row NPV-positive both ways.

SDK operations: `list`.

### Slug

Results: The college with its meta block.; The major with its meta block.

SDK operations: `load`.

Key fields to recognise:

- `ai_exposure`: le-teen-derived AI applicability (exposure), how much of the field’s occupations AI is already used for. NOT displacement. Category rows only; null for subfields and dropped categories.
- `cip_program_name`: CIP program-family name, subfields only.
- `freopp_program_coverage`: FREOPP-reported programs rolled into the earnings figure.
- `median_earnings_10yr_usd`: FREOPP cohort-weighted earnings ten years after entry.
- `meta`: Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.

### State

Results: Top 15 for the state, NPV-positive rows only.

SDK operations: `list`.

### Top50

Results: Top 50, worst-first. Same rows and order as the full ranking.

SDK operations: `list`.

### WorstRoiMajor

Results: All 19 categories with median/mean ROI, never-break-even share, break-even age. Per-major detail at /api/v1/majors/&#123;slug&#125;.json.

SDK operations: `list`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| BestValue | `list` | `GET /api/v1/rankings/best-value.json` | See reference |
| College | `list` | `GET /api/v1/colleges.json` | See reference |
| Index | `load` | `GET /api/v1/index.json` | See reference |
| Major | `list` | `GET /api/v1/majors.json` | See reference |
| Openapi | `load` | `GET /api/v1/openapi.json` | See reference |
| OutOfStatePenalty | `list` | `GET /api/v1/rankings/out-of-state-penalty.json` | See reference |
| Slug | `load` | `GET /api/v1/colleges/{slug}.json` | See reference |
| Slug | `load` | `GET /api/v1/majors/{slug}.json` | See reference |
| State | `list` | `GET /api/v1/rankings/best-value/{state}.json` | See reference |
| Top50 | `list` | `GET /api/v1/rankings/out-of-state-penalty/top-50.json` | See reference |
| WorstRoiMajor | `list` | `GET /api/v1/rankings/worst-roi-majors.json` | See reference |

## Connect to the API

- API server: `https://le-teen.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `college-roi_list`: List records for an entity. Supported entities: `best_value`, `college`, `major`, `out_of_state_penalty`, `state`, `top_50`, `worst_roi_major`.
- `college-roi_load`: Load one record for an entity. Supported entities: `index`, `openapi`, `slug`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

