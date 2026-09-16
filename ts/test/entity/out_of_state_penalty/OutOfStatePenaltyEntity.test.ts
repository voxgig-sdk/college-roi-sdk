

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


describe('OutOfStatePenaltyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLLEGE_ROI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CollegeRoiSDK.test()
    const ent = testsdk.OutOfStatePenalty()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'out_of_state_penalty.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"institution","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"npv_nonresident_usd","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"npv_resident_usd","req":false,"type":"`$INTEGER`","index$":2},{"active":true,"name":"oos_penalty_30yr_npv_usd","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"rank","req":false,"type":"`$INTEGER`","index$":4},{"active":true,"name":"state","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"tuition_in_state_usd","req":false,"type":"`$INTEGER`","index$":6},{"active":true,"name":"tuition_out_of_state_usd","req":false,"type":"`$INTEGER`","index$":7}],"name":"out_of_state_penalty","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/v1/rankings/out-of-state-penalty.json","json":"{\"operationId\":\"getOutOfStatePenaltyRanking\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"description\":{\"type\":\"string\"},\"meta\":{\"description\":\"Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.\",\"properties\":{\"data_vintage\":{\"type\":\"string\"},\"doi\":{\"format\":\"uri\",\"type\":\"string\"},\"generated\":{\"format\":\"date\",\"type\":\"string\"},\"license\":{\"const\":\"CC-BY-4.0\",\"type\":\"string\"},\"source\":{\"const\":\"LE TEEN\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"source\",\"url\",\"license\",\"doi\",\"data_vintage\",\"generated\"],\"type\":\"object\"},\"page_url\":{\"format\":\"uri\",\"type\":\"string\"},\"rankings\":{\"items\":{\"properties\":{\"institution\":{\"type\":\"string\"},\"npv_nonresident_usd\":{\"type\":\"integer\"},\"npv_resident_usd\":{\"type\":\"integer\"},\"oos_penalty_30yr_npv_usd\":{\"type\":\"integer\"},\"rank\":{\"type\":\"integer\"},\"state\":{\"type\":\"string\"},\"tuition_in_state_usd\":{\"type\":\"integer\"},\"tuition_out_of_state_usd\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The full ranking. Every row NPV-positive both ways.\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/rankings/out-of-state-penalty.json","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"rankings"},{"lit":"out-of-state-penalty.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"out_of_state_penalty","name__orig":"out_of_state_penalty","Name":"OutOfStatePenalty","name_":"out_of_state_penalty","name-":"out-of-state-penalty","NAME":"OUT_OF_STATE_PENALTY","index$":5}, {"active":true,"entity":"out_of_state_penalty","key$":"BasicOutOfStatePenaltyFlow","kind":"basic","name":"BasicOutOfStatePenaltyFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"out_of_state_penalty_ref01"}}],"index$":0}]}, 'OutOfStatePenalty')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let out_of_state_penalty_ref01_data = Object.values(setup.data.existing.out_of_state_penalty)[0] as any

    // LIST
    const out_of_state_penalty_ref01_ent = client.OutOfStatePenalty()
    const out_of_state_penalty_ref01_match: any = {}

    const out_of_state_penalty_ref01_list = (await out_of_state_penalty_ref01_ent.list(out_of_state_penalty_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/out_of_state_penalty/OutOfStatePenaltyTestData.json')

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
    ['out_of_state_penalty01','out_of_state_penalty02','out_of_state_penalty03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID': idmap,
    'COLLEGE_ROI_TEST_LIVE': 'FALSE',
    'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID']

  const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID']
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
  
