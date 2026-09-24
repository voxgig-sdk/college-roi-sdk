

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ai_exposure":{"a":true,"h":"Ai Exposure","n":"ai_exposure","r":false,"sh":"le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"ai_exposure","index$":0},"cip_program_name":{"a":true,"h":"Cip Program Name","n":"cip_program_name","r":false,"sh":"CIP program-family name — subfields only.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cip_program_name","index$":1},"completion_adjusted_roi_usd":{"a":true,"h":"Completion Adjusted Roi Usd","n":"completion_adjusted_roi_usd","r":false,"t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"completion_adjusted_roi_usd","index$":2},"dropout_roi_usd":{"a":true,"h":"Dropout Roi Usd","n":"dropout_roi_usd","r":false,"t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"dropout_roi_usd","index$":3},"graduates":{"a":true,"h":"Graduates","n":"graduates","r":false,"t":"`$INTEGER`","key$":"graduates","index$":4},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":5},"mean_lifetime_roi_usd":{"a":true,"h":"Mean Lifetime Roi Usd","n":"mean_lifetime_roi_usd","r":false,"t":"`$NUMBER`","key$":"mean_lifetime_roi_usd","index$":6},"median_breakeven_age":{"a":true,"h":"Median Breakeven Age","n":"median_breakeven_age","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"median_breakeven_age","index$":7},"median_lifetime_roi_usd":{"a":true,"h":"Median Lifetime Roi Usd","n":"median_lifetime_roi_usd","r":false,"t":"`$NUMBER`","key$":"median_lifetime_roi_usd","index$":8},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":9},"p25_roi_usd":{"a":true,"h":"P25 Roi Usd","n":"p25_roi_usd","r":false,"t":"`$NUMBER`","key$":"p25_roi_usd","index$":10},"p75_roi_usd":{"a":true,"h":"P75 Roi Usd","n":"p75_roi_usd","r":false,"t":"`$NUMBER`","key$":"p75_roi_usd","index$":11},"parent":{"a":true,"h":"Parent","n":"parent","r":false,"sh":"Parent category — subfields only.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"parent","index$":12},"pct_never_breakeven":{"a":true,"h":"Pct Never Breakeven","n":"pct_never_breakeven","r":false,"sh":"Share of graduates who never break even, percent.","t":"`$NUMBER`","key$":"pct_never_breakeven","index$":13},"programs":{"a":true,"h":"Programs","n":"programs","r":false,"t":"`$INTEGER`","key$":"programs","index$":14},"rank_by_worst_roi":{"a":true,"h":"Rank By Worst Roi","n":"rank_by_worst_roi","r":true,"sh":"Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).","t":"`$INTEGER`","key$":"rank_by_worst_roi","index$":15},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":16},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The human-readable page for this major.","t":"`$STRING`","key$":"url","index$":17}},"name":"major","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/majors.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/majors.json","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"majors.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"major","name__orig":"major","Name":"Major","name_":"major","name-":"major","NAME":"MAJOR","index$":3}, {"active":true,"entity":"major","key$":"BasicMajorFlow","kind":"basic","name":"BasicMajorFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"major_ref01"}}],"index$":0}]}, 'Major', {"GET /api/v1/majors.json":{"protocol":"http","operationId":"listMajors","responses":{"200":{"description":"Every major with statistics and page links.","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"description":"Provenance block carried by every payload. `generated` is the build-time page-review stamp (static files); `data_vintage` names the upstream survey years.","key$":"meta","properties":{"data_vintage":{"type":"string"},"doi":{"format":"uri","type":"string"},"generated":{"format":"date","type":"string"},"license":{"const":"CC-BY-4.0","type":"string"},"source":{"const":"LE TEEN","type":"string"},"url":{"format":"uri","type":"string"}},"required":["source","url","license","doi","data_vintage","generated"],"type":"object","x-ref":"#/components/schemas/Meta"},"count":{"key$":"count","type":"integer"},"categories":{"key$":"categories","type":"integer"},"subfields":{"key$":"subfields","type":"integer"},"notes":{"items":{"type":"string"},"key$":"notes","type":"array"},"majors":{"items":{"description":"One major category or CIP subfield with its full lifetime-ROI stat set (FREOPP 2021, cohort-weighted). Field averages may be negative — no institution is named.","properties":{"ai_exposure":{"description":"le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for. NOT displacement. Category rows only; null for subfields and dropped categories.","properties":{"acs_coverage":{"type":"number"},"band":{"enum":["High","Elevated","Lower"],"type":"string"},"score_0_to_1":{"type":"number"},"top_occupations":{"items":{"properties":{"score":{"description":"AI applicability, 0–1.","type":"number"},"share":{"description":"Share of the field’s graduates working here, 0–1.","type":"number"},"soc":{"description":"SOC occupation code.","type":"string"},"title":{"type":"string"}},"type":"object"},"type":"array"}},"type":["object","null"],"x-ref":"#/components/schemas/AiExposure","key$":"ai_exposure"},"cip_program_name":{"description":"CIP program-family name — subfields only.","type":["string","null"],"key$":"cip_program_name"},"completion_adjusted_roi_usd":{"type":["number","null"],"key$":"completion_adjusted_roi_usd"},"dropout_roi_usd":{"type":["number","null"],"key$":"dropout_roi_usd"},"graduates":{"type":"integer","key$":"graduates"},"kind":{"enum":["category","subfield"],"type":"string","key$":"kind"},"mean_lifetime_roi_usd":{"type":"number","key$":"mean_lifetime_roi_usd"},"median_breakeven_age":{"type":["integer","null"],"key$":"median_breakeven_age"},"median_lifetime_roi_usd":{"type":"number","key$":"median_lifetime_roi_usd"},"name":{"type":"string","key$":"name"},"p25_roi_usd":{"type":"number","key$":"p25_roi_usd"},"p75_roi_usd":{"type":"number","key$":"p75_roi_usd"},"parent":{"description":"Parent category — subfields only.","properties":{"name":{"type":"string"},"slug":{"type":"string"}},"type":["object","null"],"key$":"parent"},"pct_never_breakeven":{"description":"Share of graduates who never break even, percent.","type":"number","key$":"pct_never_breakeven"},"programs":{"type":"integer","key$":"programs"},"rank_by_worst_roi":{"description":"Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).","type":"integer","key$":"rank_by_worst_roi"},"slug":{"type":"string","key$":"slug"},"url":{"description":"The human-readable page for this major.","format":"uri","type":"string","key$":"url"}},"required":["slug","kind","name","rank_by_worst_roi","url"],"type":"object","x-ref":"#/components/schemas/Major","index$":0},"key$":"majors","type":"array"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
