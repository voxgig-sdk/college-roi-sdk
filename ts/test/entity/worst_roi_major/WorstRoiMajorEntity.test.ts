

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


describe('WorstRoiMajorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLLEGE_ROI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CollegeRoiSDK.test()
    const ent = testsdk.WorstRoiMajor()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'worst_roi_major.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"graduates","req":false,"type":"`$INTEGER`","index$":0},{"active":true,"name":"mean_lifetime_roi_usd","req":false,"type":"`$NUMBER`","index$":1},{"active":true,"name":"median_breakeven_age","req":false,"type":["`$ONE`",["`$INTEGER`","`$NULL`"]],"index$":2},{"active":true,"name":"median_lifetime_roi_usd","req":false,"type":"`$NUMBER`","index$":3},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"pct_never_breakeven","req":false,"type":"`$NUMBER`","index$":5},{"active":true,"name":"rank","req":false,"type":"`$INTEGER`","index$":6},{"active":true,"name":"slug","req":false,"type":"`$STRING`","index$":7},{"active":true,"format":"uri","name":"url","req":false,"type":"`$STRING`","index$":8}],"name":"worst_roi_major","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/v1/rankings/worst-roi-majors.json","json":"{\"operationId\":\"getWorstRoiMajorsRanking\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"description\":{\"type\":\"string\"},\"meta\":{\"description\":\"Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.\",\"properties\":{\"data_vintage\":{\"type\":\"string\"},\"doi\":{\"format\":\"uri\",\"type\":\"string\"},\"generated\":{\"format\":\"date\",\"type\":\"string\"},\"license\":{\"const\":\"CC-BY-4.0\",\"type\":\"string\"},\"source\":{\"const\":\"LE TEEN\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"source\",\"url\",\"license\",\"doi\",\"data_vintage\",\"generated\"],\"type\":\"object\"},\"page_url\":{\"format\":\"uri\",\"type\":\"string\"},\"rankings\":{\"items\":{\"properties\":{\"graduates\":{\"type\":\"integer\"},\"mean_lifetime_roi_usd\":{\"type\":\"number\"},\"median_breakeven_age\":{\"type\":[\"integer\",\"null\"]},\"median_lifetime_roi_usd\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"pct_never_breakeven\":{\"type\":\"number\"},\"rank\":{\"type\":\"integer\"},\"slug\":{\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"All 19 categories with median/mean ROI, never-break-even share, break-even age. Per-major detail at /api/v1/majors/{slug}.json.\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/rankings/worst-roi-majors.json","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"rankings"},{"lit":"worst-roi-majors.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"worst_roi_major","name__orig":"worst_roi_major","Name":"WorstRoiMajor","name_":"worst_roi_major","name-":"worst-roi-major","NAME":"WORST_ROI_MAJOR","index$":9}, {"active":true,"entity":"worst_roi_major","key$":"BasicWorstRoiMajorFlow","kind":"basic","name":"BasicWorstRoiMajorFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"worst_roi_major_ref01"}}],"index$":0}]}, 'WorstRoiMajor')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let worst_roi_major_ref01_data = Object.values(setup.data.existing.worst_roi_major)[0] as any

    // LIST
    const worst_roi_major_ref01_ent = client.WorstRoiMajor()
    const worst_roi_major_ref01_match: any = {}

    const worst_roi_major_ref01_list = (await worst_roi_major_ref01_ent.list(worst_roi_major_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/worst_roi_major/WorstRoiMajorTestData.json')

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
    ['worst_roi_major01','worst_roi_major02','worst_roi_major03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLLEGE_ROI_TEST_WORST_ROI_MAJOR_ENTID': idmap,
    'COLLEGE_ROI_TEST_LIVE': 'FALSE',
    'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLLEGE_ROI_TEST_WORST_ROI_MAJOR_ENTID']

  const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLLEGE_ROI_TEST_WORST_ROI_MAJOR_ENTID']
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
  
