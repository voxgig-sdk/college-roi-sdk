

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CollegeRoiSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('worst_roi_major hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CollegeRoiSDK.test(offline).WorstRoiMajor().stream('list')) { }
    }, /offline/)

    for await (const _item of CollegeRoiSDK.test(offline).WorstRoiMajor()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CollegeRoiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.WorstRoiMajor().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CollegeRoiSDK.test().WorstRoiMajor().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CollegeRoiSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.WorstRoiMajor().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.WorstRoiMajor().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CollegeRoiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.WorstRoiMajor().list({"graduates":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'worst_roi_major.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"graduates":{"a":true,"h":"Graduates","n":"graduates","r":false,"t":"`$INTEGER`","key$":"graduates","index$":0},"mean_lifetime_roi_usd":{"a":true,"h":"Mean Lifetime Roi Usd","n":"mean_lifetime_roi_usd","r":false,"t":"`$NUMBER`","key$":"mean_lifetime_roi_usd","index$":1},"median_breakeven_age":{"a":true,"h":"Median Breakeven Age","n":"median_breakeven_age","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"median_breakeven_age","index$":2},"median_lifetime_roi_usd":{"a":true,"h":"Median Lifetime Roi Usd","n":"median_lifetime_roi_usd","r":false,"t":"`$NUMBER`","key$":"median_lifetime_roi_usd","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":4},"pct_never_breakeven":{"a":true,"h":"Pct Never Breakeven","n":"pct_never_breakeven","r":false,"t":"`$NUMBER`","key$":"pct_never_breakeven","index$":5},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"t":"`$INTEGER`","key$":"rank","index$":6},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"t":"`$STRING`","key$":"slug","index$":7},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":8}},"name":"worst_roi_major","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/rankings/worst-roi-majors.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/rankings/worst-roi-majors.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"rankings"},{"lit":"worst-roi-majors.json"}],"t":{"req":"`reqdata`","res":"`body.rankings`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"worst_roi_major","name__orig":"worst_roi_major","Name":"WorstRoiMajor","name_":"worst_roi_major","name-":"worst-roi-major","NAME":"WORST_ROI_MAJOR","index$":9}, {"active":true,"entity":"worst_roi_major","key$":"BasicWorstRoiMajorFlow","kind":"basic","name":"BasicWorstRoiMajorFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"worst_roi_major_ref01"}}],"index$":0}]}, 'WorstRoiMajor', {"GET /api/v1/rankings/worst-roi-majors.json":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
