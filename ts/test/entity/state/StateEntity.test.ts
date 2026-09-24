

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


describe('StateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COLLEGE_ROI_TEST_LIVE=TRUE.
  afterEach(liveDelay('COLLEGE_ROI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CollegeRoiSDK.test()
    const ent = testsdk.State()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COLLEGE_ROI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'state.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"city":{"a":true,"h":"City","n":"city","r":false,"t":"`$STRING`","key$":"city","index$":0},"control":{"a":true,"h":"Control","n":"control","r":false,"t":"`$STRING`","key$":"control","index$":1},"institution":{"a":true,"h":"Institution","n":"institution","r":false,"t":"`$STRING`","key$":"institution","index$":2},"npv_30yr_resident_usd":{"a":true,"h":"Npv 30yr Resident Usd","n":"npv_30yr_resident_usd","r":false,"t":"`$INTEGER`","key$":"npv_30yr_resident_usd","index$":3},"rank_in_state":{"a":true,"h":"Rank In State","n":"rank_in_state","r":false,"t":"`$INTEGER`","key$":"rank_in_state","index$":4}},"name":"state","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/rankings/best-value/{state}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"state","or":"state","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/rankings/best-value/{state}.json","q":{"exist":["state"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"rankings"},{"lit":"best-value"},{"lit":"{state}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"state","name__orig":"state","Name":"State","name_":"state","name-":"state","NAME":"STATE","index$":7}, {"active":true,"entity":"state","key$":"BasicStateFlow","kind":"basic","name":"BasicStateFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"state":"state01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"state_ref01"}}],"index$":0}]}, 'State', {"GET /api/v1/rankings/best-value/{state}.json":{"protocol":"http","operationId":"getBestValueByState","responses":{"200":{"description":"Top 15 for the state, NPV-positive rows only.","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"description":"Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.","key$":"meta","properties":{"data_vintage":{"type":"string"},"doi":{"format":"uri","type":"string"},"generated":{"format":"date","type":"string"},"license":{"const":"CC-BY-4.0","type":"string"},"source":{"const":"LE TEEN","type":"string"},"url":{"format":"uri","type":"string"}},"required":["source","url","license","doi","data_vintage","generated"],"type":"object","x-ref":"#/components/schemas/Meta"},"title":{"key$":"title","type":"string"},"description":{"key$":"description","type":"string"},"page_url":{"format":"uri","key$":"page_url","type":"string"},"state":{"key$":"state","type":"string"},"state_name":{"key$":"state_name","type":"string"},"count":{"key$":"count","type":"integer"},"colleges":{"items":{"properties":{"city":{"type":"string","key$":"city"},"control":{"type":"string","key$":"control"},"institution":{"type":"string","key$":"institution"},"npv_30yr_resident_usd":{"type":"integer","key$":"npv_30yr_resident_usd"},"rank_in_state":{"type":"integer","key$":"rank_in_state"}},"type":"object","index$":0},"key$":"colleges","type":"array"}}}}}},"404":{"description":"Not a USPS state code."}},"parameters":[{"name":"state","in":"path","required":true,"description":"Lowercase USPS 2-letter state code (50 states + DC).","schema":{"type":"string","enum":["al","ak","az","ar","ca","co","ct","de","dc","fl","ga","hi","id","il","in","ia","ks","ky","la","me","md","ma","mi","mn","ms","mo","mt","ne","nv","nh","nj","nm","ny","nc","nd","oh","ok","or","pa","ri","sc","sd","tn","tx","ut","vt","va","wa","wv","wi","wy"]},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let state_ref01_data = Object.values(setup.data.existing.state)[0] as any

    // LIST
    const state_ref01_ent = client.State()
    const state_ref01_match: any = {}
    state_ref01_match['state'] = setup.idmap['state01']

    const state_ref01_list = (await state_ref01_ent.list(state_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/state/StateTestData.json')

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
    ['state01','state02','state03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COLLEGE_ROI_TEST_STATE_ENTID': idmap,
    'COLLEGE_ROI_TEST_LIVE': 'FALSE',
    'COLLEGE_ROI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COLLEGE_ROI_TEST_STATE_ENTID']

  const live = 'TRUE' === env.COLLEGE_ROI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COLLEGE_ROI_TEST_STATE_ENTID']
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
  
