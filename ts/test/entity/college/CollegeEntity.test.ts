

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


describe('CollegeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLLEGE_ROI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CollegeRoiSDK.test()
    const ent = testsdk.College()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'college.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"breakeven_age","req":false,"type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":0},{"active":true,"name":"city","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"control","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"freopp_program_coverage","req":false,"short":"FREOPP-reported programs rolled into the earnings figure.","type":"`$INTEGER`","index$":3},{"active":true,"name":"median_earnings_10yr_usd","req":false,"short":"FREOPP cohort-weighted earnings ten years after entry.","type":"`$INTEGER`","index$":4},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"npv_30yr_nonresident_usd","req":false,"short":"Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.","type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":6},{"active":true,"name":"npv_30yr_resident_usd","req":true,"short":"30-year projected net value at resident pricing.","type":"`$INTEGER`","index$":7},{"active":true,"name":"slug","req":true,"type":"`$STRING`","index$":8},{"active":true,"name":"state","req":true,"short":"USPS 2-letter state code.","type":"`$STRING`","index$":9},{"active":true,"name":"state_name","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"total_cost_of_attendance_nonresident_usd","req":false,"type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":11},{"active":true,"name":"total_cost_of_attendance_usd","req":false,"type":"`$INTEGER`","index$":12},{"active":true,"name":"unitid","req":true,"short":"IPEDS UnitID — the universal join key.","type":"`$INTEGER`","index$":13},{"active":true,"format":"uri","name":"url","req":true,"short":"The human-readable page for this school.","type":"`$STRING`","index$":14}],"name":"college","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/v1/colleges.json","json":"{\"operationId\":\"listColleges\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"colleges\":{\"items\":{\"description\":\"One gated four-year institution (IPEDS 2023 · FREOPP 2021 · BEA 2023). Gates: real FREOPP earnings, >= 3 reported programs, hand-verified exclusions, positive 30-year NPV at resident pricing — no school outside the gate appears, and no named school carries a negative number.\",\"properties\":{\"breakeven_age\":{\"type\":[\"integer\",\"null\"]},\"city\":{\"type\":\"string\"},\"control\":{\"enum\":[\"public\",\"private-nonprofit\",\"private-forprofit\"],\"type\":\"string\"},\"freopp_program_coverage\":{\"description\":\"FREOPP-reported programs rolled into the earnings figure.\",\"type\":\"integer\"},\"median_earnings_10yr_usd\":{\"description\":\"FREOPP cohort-weighted earnings ten years after entry.\",\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"npv_30yr_nonresident_usd\":{\"description\":\"Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.\",\"type\":[\"integer\",\"null\"]},\"npv_30yr_resident_usd\":{\"description\":\"30-year projected net value at resident pricing. Positive by gate.\",\"type\":\"integer\"},\"slug\":{\"type\":\"string\"},\"state\":{\"description\":\"USPS 2-letter state code.\",\"type\":\"string\"},\"state_name\":{\"type\":\"string\"},\"total_cost_of_attendance_nonresident_usd\":{\"type\":[\"integer\",\"null\"]},\"total_cost_of_attendance_usd\":{\"type\":\"integer\"},\"unitid\":{\"description\":\"IPEDS UnitID — the universal join key.\",\"type\":\"integer\"},\"url\":{\"description\":\"The human-readable page for this school.\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"slug\",\"unitid\",\"name\",\"city\",\"state\",\"control\",\"npv_30yr_resident_usd\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"count\":{\"type\":\"integer\"},\"meta\":{\"description\":\"Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.\",\"properties\":{\"data_vintage\":{\"type\":\"string\"},\"doi\":{\"format\":\"uri\",\"type\":\"string\"},\"generated\":{\"format\":\"date\",\"type\":\"string\"},\"license\":{\"const\":\"CC-BY-4.0\",\"type\":\"string\"},\"source\":{\"const\":\"LE TEEN\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"source\",\"url\",\"license\",\"doi\",\"data_vintage\",\"generated\"],\"type\":\"object\"},\"notes\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Every gated college.\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/colleges.json","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"colleges.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"college","name__orig":"college","Name":"College","name_":"college","name-":"college","NAME":"COLLEGE","index$":1}, {"active":true,"entity":"college","key$":"BasicCollegeFlow","kind":"basic","name":"BasicCollegeFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"college_ref01"}}],"index$":0}]}, 'College')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let college_ref01_data = Object.values(setup.data.existing.college)[0] as any

    // LIST
    const college_ref01_ent = client.College()
    const college_ref01_match: any = {}

    const college_ref01_list = (await college_ref01_ent.list(college_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/college/CollegeTestData.json')

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
    ['college01','college02','college03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLLEGE_ROI_TEST_COLLEGE_ENTID': idmap,
    'COLLEGE_ROI_TEST_LIVE': 'FALSE',
    'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLLEGE_ROI_TEST_COLLEGE_ENTID']

  const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLLEGE_ROI_TEST_COLLEGE_ENTID']
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
  
