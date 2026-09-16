

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CollegeRoiSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('SlugEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLLEGE_ROI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CollegeRoiSDK.test()
    const ent = testsdk.Slug()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'slug.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ai_exposure","req":false,"short":"le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.","type":["`$ONE`",["`$OBJECT`","`$NULL`"]],"index$":0},{"active":true,"name":"breakeven_age","req":false,"type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":1},{"active":true,"name":"cip_program_name","req":false,"short":"CIP program-family name — subfields only.","type":["`$ONE`",["`$STRING`","`$NULL`"]],"index$":2},{"active":true,"name":"city","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"completion_adjusted_roi_usd","req":false,"type":["`$ONE`",["`$NUMBER`","`$NULL`"]],"index$":4},{"active":true,"name":"control","req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"dropout_roi_usd","req":false,"type":["`$ONE`",["`$NUMBER`","`$NULL`"]],"index$":6},{"active":true,"name":"freopp_program_coverage","req":false,"short":"FREOPP-reported programs rolled into the earnings figure.","type":"`$INTEGER`","index$":7},{"active":true,"name":"graduates","req":false,"type":"`$INTEGER`","index$":8},{"active":true,"name":"kind","req":true,"type":"`$STRING`","index$":9},{"active":true,"name":"mean_lifetime_roi_usd","req":false,"type":"`$NUMBER`","index$":10},{"active":true,"name":"median_breakeven_age","req":false,"type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":11},{"active":true,"name":"median_earnings_10yr_usd","req":false,"short":"FREOPP cohort-weighted earnings ten years after entry.","type":"`$INTEGER`","index$":12},{"active":true,"name":"median_lifetime_roi_usd","req":false,"type":"`$NUMBER`","index$":13},{"active":true,"name":"meta","req":true,"short":"Provenance block carried by every payload.","type":"`$OBJECT`","index$":14},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":15},{"active":true,"name":"npv_30yr_nonresident_usd","req":false,"short":"Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.","type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":16},{"active":true,"name":"npv_30yr_resident_usd","req":true,"short":"30-year projected net value at resident pricing.","type":"`$INTEGER`","index$":17},{"active":true,"name":"p25_roi_usd","req":false,"type":"`$NUMBER`","index$":18},{"active":true,"name":"p75_roi_usd","req":false,"type":"`$NUMBER`","index$":19},{"active":true,"name":"parent","req":false,"short":"Parent category — subfields only.","type":["`$ONE`",["`$OBJECT`","`$NULL`"]],"index$":20},{"active":true,"name":"pct_never_breakeven","req":false,"short":"Share of graduates who never break even, percent.","type":"`$NUMBER`","index$":21},{"active":true,"name":"programs","req":false,"type":"`$INTEGER`","index$":22},{"active":true,"name":"rank_by_worst_roi","req":true,"short":"Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).","type":"`$INTEGER`","index$":23},{"active":true,"name":"slug","req":true,"type":"`$STRING`","index$":24},{"active":true,"name":"state","req":true,"short":"USPS 2-letter state code.","type":"`$STRING`","index$":25},{"active":true,"name":"state_name","req":false,"type":"`$STRING`","index$":26},{"active":true,"name":"total_cost_of_attendance_nonresident_usd","req":false,"type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":27},{"active":true,"name":"total_cost_of_attendance_usd","req":false,"type":"`$INTEGER`","index$":28},{"active":true,"name":"unitid","req":true,"short":"IPEDS UnitID — the universal join key.","type":"`$INTEGER`","index$":29},{"active":true,"format":"uri","name":"url","req":true,"short":"The human-readable page for this school.","type":"`$STRING`","index$":30}],"name":"slug","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"slug","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/colleges/{slug}.json","json":"{\"operationId\":\"getCollege\",\"parameters\":[{\"description\":\"College slug, e.g. university-of-michigan-ann-arbor.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"meta\":{\"description\":\"Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.\",\"properties\":{\"data_vintage\":{\"type\":\"string\"},\"doi\":{\"format\":\"uri\",\"type\":\"string\"},\"generated\":{\"format\":\"date\",\"type\":\"string\"},\"license\":{\"const\":\"CC-BY-4.0\",\"type\":\"string\"},\"source\":{\"const\":\"LE TEEN\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"source\",\"url\",\"license\",\"doi\",\"data_vintage\",\"generated\"],\"type\":\"object\"}},\"type\":\"object\"},{\"description\":\"One gated four-year institution (IPEDS 2023 · FREOPP 2021 · BEA 2023). Gates: real FREOPP earnings, >= 3 reported programs, hand-verified exclusions, positive 30-year NPV at resident pricing — no school outside the gate appears, and no named school carries a negative number.\",\"properties\":{\"breakeven_age\":{\"type\":[\"integer\",\"null\"]},\"city\":{\"type\":\"string\"},\"control\":{\"enum\":[\"public\",\"private-nonprofit\",\"private-forprofit\"],\"type\":\"string\"},\"freopp_program_coverage\":{\"description\":\"FREOPP-reported programs rolled into the earnings figure.\",\"type\":\"integer\"},\"median_earnings_10yr_usd\":{\"description\":\"FREOPP cohort-weighted earnings ten years after entry.\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"npv_30yr_nonresident_usd\":{\"description\":\"Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.\",\"type\":[\"integer\",\"null\"]},\"npv_30yr_resident_usd\":{\"description\":\"30-year projected net value at resident pricing. Positive by gate.\",\"type\":\"integer\"},\"slug\":{\"type\":\"string\"},\"state\":{\"description\":\"USPS 2-letter state code.\",\"type\":\"string\"},\"state_name\":{\"type\":\"string\"},\"total_cost_of_attendance_nonresident_usd\":{\"type\":[\"integer\",\"null\"]},\"total_cost_of_attendance_usd\":{\"type\":\"integer\"},\"unitid\":{\"description\":\"IPEDS UnitID — the universal join key.\",\"type\":\"integer\"},\"url\":{\"description\":\"The human-readable page for this school.\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"slug\",\"unitid\",\"name\",\"city\",\"state\",\"control\",\"npv_30yr_resident_usd\",\"url\"],\"type\":\"object\"}]}}},\"description\":\"The college with its meta block.\"},\"404\":{\"description\":\"Unknown slug — the school is outside the gate or not covered.\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/colleges/{slug}.json","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"colleges"},{"lit":"{slug}.json"}],"select":{"exist":["slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"slug","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/majors/{slug}.json","json":"{\"operationId\":\"getMajor\",\"parameters\":[{\"description\":\"Major slug, e.g. philosophy-and-religious-studies or registered-nursing.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"allOf\":[{\"properties\":{\"meta\":{\"description\":\"Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.\",\"properties\":{\"data_vintage\":{\"type\":\"string\"},\"doi\":{\"format\":\"uri\",\"type\":\"string\"},\"generated\":{\"format\":\"date\",\"type\":\"string\"},\"license\":{\"const\":\"CC-BY-4.0\",\"type\":\"string\"},\"source\":{\"const\":\"LE TEEN\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"source\",\"url\",\"license\",\"doi\",\"data_vintage\",\"generated\"],\"type\":\"object\"}},\"type\":\"object\"},{\"description\":\"One major category or CIP subfield with its full lifetime-ROI stat set (FREOPP 2021, cohort-weighted). Field averages may be negative — no institution is named.\",\"properties\":{\"ai_exposure\":{\"description\":\"le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. NOT displacement. Category rows only; null for subfields and dropped categories.\",\"properties\":{\"acs_coverage\":{\"type\":\"number\"},\"band\":{\"enum\":[\"High\",\"Elevated\",\"Lower\"],\"type\":\"string\"},\"score_0_to_1\":{\"type\":\"number\"},\"top_occupations\":{\"items\":{\"properties\":{\"score\":{\"description\":\"AI applicability, 0–1.\",\"type\":\"number\"},\"share\":{\"description\":\"Share of the field’s graduates working here, 0–1.\",\"type\":\"number\"},\"soc\":{\"description\":\"SOC occupation code.\",\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":[\"object\",\"null\"]},\"cip_program_name\":{\"description\":\"CIP program-family name — subfields only.\",\"type\":[\"string\",\"null\"]},\"completion_adjusted_roi_usd\":{\"type\":[\"number\",\"null\"]},\"dropout_roi_usd\":{\"type\":[\"number\",\"null\"]},\"graduates\":{\"type\":\"integer\"},\"kind\":{\"enum\":[\"category\",\"subfield\"],\"type\":\"string\"},\"mean_lifetime_roi_usd\":{\"type\":\"number\"},\"median_breakeven_age\":{\"type\":[\"integer\",\"null\"]},\"median_lifetime_roi_usd\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"p25_roi_usd\":{\"type\":\"number\"},\"p75_roi_usd\":{\"type\":\"number\"},\"parent\":{\"description\":\"Parent category — subfields only.\",\"properties\":{\"name\":{\"type\":\"string\"},\"slug\":{\"type\":\"string\"}},\"type\":[\"object\",\"null\"]},\"pct_never_breakeven\":{\"description\":\"Share of graduates who never break even, percent.\",\"type\":\"number\"},\"programs\":{\"type\":\"integer\"},\"rank_by_worst_roi\":{\"description\":\"Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).\",\"type\":\"integer\"},\"slug\":{\"type\":\"string\"},\"url\":{\"description\":\"The human-readable page for this major.\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"slug\",\"kind\",\"name\",\"rank_by_worst_roi\",\"url\"],\"type\":\"object\"}]}}},\"description\":\"The major with its meta block.\"},\"404\":{\"description\":\"Unknown slug (static file does not exist).\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/majors/{slug}.json","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"majors"},{"lit":"{slug}.json"}],"select":{"exist":["slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"slug","name__orig":"slug","Name":"Slug","name_":"slug","name-":"slug","NAME":"SLUG","index$":6}, {"active":true,"entity":"slug","key$":"BasicSlugFlow","kind":"basic","name":"BasicSlugFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"slug_ref01","srcdatavar":"slug_ref01_data","suffix":"_dt0"},"match":{"slug":"slug01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-slug_ref01"}}],"index$":0}]}, 'Slug')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let slug_ref01_data = Object.values(setup.data.existing.slug)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const slug_ref01_ent = client.Slug()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/slug/SlugTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CollegeRoiSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['slug01','slug02','slug03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLLEGE_ROI_TEST_SLUG_ENTID': idmap,
    'COLLEGE_ROI_TEST_LIVE': 'FALSE',
    'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLLEGE_ROI_TEST_SLUG_ENTID']

  const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLLEGE_ROI_TEST_SLUG_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CollegeRoiSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.COLLEGE_ROI_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
