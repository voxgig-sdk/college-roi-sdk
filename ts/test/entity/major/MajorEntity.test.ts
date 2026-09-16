

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


describe('MajorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLLEGE_ROI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CollegeRoiSDK.test()
    const ent = testsdk.Major()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'major.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ai_exposure","req":false,"short":"le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.","type":["`$ONE`",["`$OBJECT`","`$NULL`"]],"index$":0},{"active":true,"name":"cip_program_name","req":false,"short":"CIP program-family name — subfields only.","type":["`$ONE`",["`$STRING`","`$NULL`"]],"index$":1},{"active":true,"name":"completion_adjusted_roi_usd","req":false,"type":["`$ONE`",["`$NUMBER`","`$NULL`"]],"index$":2},{"active":true,"name":"dropout_roi_usd","req":false,"type":["`$ONE`",["`$NUMBER`","`$NULL`"]],"index$":3},{"active":true,"name":"graduates","req":false,"type":"`$INTEGER`","index$":4},{"active":true,"name":"kind","req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"mean_lifetime_roi_usd","req":false,"type":"`$NUMBER`","index$":6},{"active":true,"name":"median_breakeven_age","req":false,"type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":7},{"active":true,"name":"median_lifetime_roi_usd","req":false,"type":"`$NUMBER`","index$":8},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":9},{"active":true,"name":"p25_roi_usd","req":false,"type":"`$NUMBER`","index$":10},{"active":true,"name":"p75_roi_usd","req":false,"type":"`$NUMBER`","index$":11},{"active":true,"name":"parent","req":false,"short":"Parent category — subfields only.","type":["`$ONE`",["`$OBJECT`","`$NULL`"]],"index$":12},{"active":true,"name":"pct_never_breakeven","req":false,"short":"Share of graduates who never break even, percent.","type":"`$NUMBER`","index$":13},{"active":true,"name":"programs","req":false,"type":"`$INTEGER`","index$":14},{"active":true,"name":"rank_by_worst_roi","req":true,"short":"Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).","type":"`$INTEGER`","index$":15},{"active":true,"name":"slug","req":true,"type":"`$STRING`","index$":16},{"active":true,"format":"uri","name":"url","req":true,"short":"The human-readable page for this major.","type":"`$STRING`","index$":17}],"name":"major","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/v1/majors.json","json":"{\"operationId\":\"listMajors\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"categories\":{\"type\":\"integer\"},\"count\":{\"type\":\"integer\"},\"majors\":{\"items\":{\"description\":\"One major category or CIP subfield with its full lifetime-ROI stat set (FREOPP 2021, cohort-weighted). Field averages may be negative — no institution is named.\",\"properties\":{\"ai_exposure\":{\"description\":\"le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. NOT displacement. Category rows only; null for subfields and dropped categories.\",\"properties\":{\"acs_coverage\":{\"type\":\"number\"},\"band\":{\"enum\":[\"High\",\"Elevated\",\"Lower\"],\"type\":\"string\"},\"score_0_to_1\":{\"type\":\"number\"},\"top_occupations\":{\"items\":{\"properties\":{\"score\":{\"description\":\"AI applicability, 0–1.\",\"type\":\"number\"},\"share\":{\"description\":\"Share of the field’s graduates working here, 0–1.\",\"type\":\"number\"},\"soc\":{\"description\":\"SOC occupation code.\",\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":[\"object\",\"null\"]},\"cip_program_name\":{\"description\":\"CIP program-family name — subfields only.\",\"type\":[\"string\",\"null\"]},\"completion_adjusted_roi_usd\":{\"type\":[\"number\",\"null\"]},\"dropout_roi_usd\":{\"type\":[\"number\",\"null\"]},\"graduates\":{\"type\":\"integer\"},\"kind\":{\"enum\":[\"category\",\"subfield\"],\"type\":\"string\"},\"mean_lifetime_roi_usd\":{\"type\":\"number\"},\"median_breakeven_age\":{\"type\":[\"integer\",\"null\"]},\"median_lifetime_roi_usd\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"p25_roi_usd\":{\"type\":\"number\"},\"p75_roi_usd\":{\"type\":\"number\"},\"parent\":{\"description\":\"Parent category — subfields only.\",\"properties\":{\"name\":{\"type\":\"string\"},\"slug\":{\"type\":\"string\"}},\"type\":[\"object\",\"null\"]},\"pct_never_breakeven\":{\"description\":\"Share of graduates who never break even, percent.\",\"type\":\"number\"},\"programs\":{\"type\":\"integer\"},\"rank_by_worst_roi\":{\"description\":\"Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).\",\"type\":\"integer\"},\"slug\":{\"type\":\"string\"},\"url\":{\"description\":\"The human-readable page for this major.\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"slug\",\"kind\",\"name\",\"rank_by_worst_roi\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"meta\":{\"description\":\"Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.\",\"properties\":{\"data_vintage\":{\"type\":\"string\"},\"doi\":{\"format\":\"uri\",\"type\":\"string\"},\"generated\":{\"format\":\"date\",\"type\":\"string\"},\"license\":{\"const\":\"CC-BY-4.0\",\"type\":\"string\"},\"source\":{\"const\":\"LE TEEN\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"source\",\"url\",\"license\",\"doi\",\"data_vintage\",\"generated\"],\"type\":\"object\"},\"notes\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"subfields\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Every major with statistics and page links.\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/majors.json","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"majors.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"major","name__orig":"major","Name":"Major","name_":"major","name-":"major","NAME":"MAJOR","index$":3}, {"active":true,"entity":"major","key$":"BasicMajorFlow","kind":"basic","name":"BasicMajorFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"major_ref01"}}],"index$":0}]}, 'Major')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let major_ref01_data = Object.values(setup.data.existing.major)[0] as any

    // LIST
    const major_ref01_ent = client.Major()
    const major_ref01_match: any = {}

    const major_ref01_list = (await major_ref01_ent.list(major_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/major/MajorTestData.json')

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
    ['major01','major02','major03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLLEGE_ROI_TEST_MAJOR_ENTID': idmap,
    'COLLEGE_ROI_TEST_LIVE': 'FALSE',
    'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLLEGE_ROI_TEST_MAJOR_ENTID']

  const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLLEGE_ROI_TEST_MAJOR_ENTID']
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
  
