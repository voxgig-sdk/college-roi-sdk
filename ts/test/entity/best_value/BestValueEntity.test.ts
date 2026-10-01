

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BestValueEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLLEGE_ROI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CollegeRoiSDK.test()
    const ent = testsdk.BestValue()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'best_value.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"colleges":{"a":true,"h":"Colleges","n":"colleges","r":false,"t":"`$ARRAY`","key$":"colleges","index$":0},"page_url":{"a":true,"fo":"uri","h":"Page Url","n":"page_url","r":false,"t":"`$STRING`","key$":"page_url","index$":1},"state":{"a":true,"h":"State","n":"state","r":false,"t":"`$STRING`","key$":"state","index$":2},"state_name":{"a":true,"h":"State Name","n":"state_name","r":false,"t":"`$STRING`","key$":"state_name","index$":3}},"name":"best_value","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/rankings/best-value.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/rankings/best-value.json","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"rankings"},{"lit":"best-value.json"}],"t":{"req":"`reqdata`","res":"`body.states`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"best_value","name__orig":"best_value","Name":"BestValue","name_":"best_value","name-":"best-value","NAME":"BEST_VALUE","index$":0}, {"active":true,"entity":"best_value","key$":"BasicBestValueFlow","kind":"basic","name":"BasicBestValueFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"best_value_ref01"}}],"index$":0}]}, 'BestValue', {"GET /api/v1/rankings/best-value.json":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let best_value_ref01_data = Object.values(setup.data.existing.best_value)[0] as any

    // LIST
    const best_value_ref01_ent = client.BestValue()
    const best_value_ref01_match: any = {}

    const best_value_ref01_list = (await best_value_ref01_ent.list(best_value_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/best_value/BestValueTestData.json')

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
    ['best_value01','best_value02','best_value03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLLEGE_ROI_TEST_BEST_VALUE_ENTID': idmap,
    'COLLEGE_ROI_TEST_LIVE': 'FALSE',
    'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLLEGE_ROI_TEST_BEST_VALUE_ENTID']

  const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLLEGE_ROI_TEST_BEST_VALUE_ENTID']
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
  
