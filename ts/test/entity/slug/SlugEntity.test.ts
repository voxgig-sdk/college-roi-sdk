

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ai_exposure":{"a":true,"h":"Ai Exposure","n":"ai_exposure","r":false,"sh":"le-teen-derived AI applicability (exposure) — how much of the field’s occupations AI is already used for.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"ai_exposure","index$":0},"breakeven_age":{"a":true,"h":"Breakeven Age","n":"breakeven_age","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"breakeven_age","index$":1},"cip_program_name":{"a":true,"h":"Cip Program Name","n":"cip_program_name","r":false,"sh":"CIP program-family name — subfields only.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cip_program_name","index$":2},"city":{"a":true,"h":"City","n":"city","r":true,"t":"`$STRING`","key$":"city","index$":3},"completion_adjusted_roi_usd":{"a":true,"h":"Completion Adjusted Roi Usd","n":"completion_adjusted_roi_usd","r":false,"t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"completion_adjusted_roi_usd","index$":4},"control":{"a":true,"h":"Control","n":"control","r":true,"t":"`$STRING`","key$":"control","index$":5},"dropout_roi_usd":{"a":true,"h":"Dropout Roi Usd","n":"dropout_roi_usd","r":false,"t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"dropout_roi_usd","index$":6},"freopp_program_coverage":{"a":true,"h":"Freopp Program Coverage","n":"freopp_program_coverage","r":false,"sh":"FREOPP-reported programs rolled into the earnings figure.","t":"`$INTEGER`","key$":"freopp_program_coverage","index$":7},"graduates":{"a":true,"h":"Graduates","n":"graduates","r":false,"t":"`$INTEGER`","key$":"graduates","index$":8},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":9},"mean_lifetime_roi_usd":{"a":true,"h":"Mean Lifetime Roi Usd","n":"mean_lifetime_roi_usd","r":false,"t":"`$NUMBER`","key$":"mean_lifetime_roi_usd","index$":10},"median_breakeven_age":{"a":true,"h":"Median Breakeven Age","n":"median_breakeven_age","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"median_breakeven_age","index$":11},"median_earnings_10yr_usd":{"a":true,"h":"Median Earnings 10yr Usd","n":"median_earnings_10yr_usd","r":false,"sh":"FREOPP cohort-weighted earnings ten years after entry.","t":"`$INTEGER`","key$":"median_earnings_10yr_usd","index$":12},"median_lifetime_roi_usd":{"a":true,"h":"Median Lifetime Roi Usd","n":"median_lifetime_roi_usd","r":false,"t":"`$NUMBER`","key$":"median_lifetime_roi_usd","index$":13},"meta":{"a":true,"h":"Meta","n":"meta","r":true,"sh":"Provenance block carried by every payload.","t":"`$OBJECT`","key$":"meta","index$":14},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":15},"npv_30yr_nonresident_usd":{"a":true,"h":"Npv 30yr Nonresident Usd","n":"npv_30yr_nonresident_usd","r":false,"sh":"Non-resident 30-year NPV — public schools with a real out-of-state premium only, and only when ALSO positive; null otherwise by design.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"npv_30yr_nonresident_usd","index$":16},"npv_30yr_resident_usd":{"a":true,"h":"Npv 30yr Resident Usd","n":"npv_30yr_resident_usd","r":true,"sh":"30-year projected net value at resident pricing.","t":"`$INTEGER`","key$":"npv_30yr_resident_usd","index$":17},"p25_roi_usd":{"a":true,"h":"P25 Roi Usd","n":"p25_roi_usd","r":false,"t":"`$NUMBER`","key$":"p25_roi_usd","index$":18},"p75_roi_usd":{"a":true,"h":"P75 Roi Usd","n":"p75_roi_usd","r":false,"t":"`$NUMBER`","key$":"p75_roi_usd","index$":19},"parent":{"a":true,"h":"Parent","n":"parent","r":false,"sh":"Parent category — subfields only.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"parent","index$":20},"pct_never_breakeven":{"a":true,"h":"Pct Never Breakeven","n":"pct_never_breakeven","r":false,"sh":"Share of graduates who never break even, percent.","t":"`$NUMBER`","key$":"pct_never_breakeven","index$":21},"programs":{"a":true,"h":"Programs","n":"programs","r":false,"t":"`$INTEGER`","key$":"programs","index$":22},"rank_by_worst_roi":{"a":true,"h":"Rank By Worst Roi","n":"rank_by_worst_roi","r":true,"sh":"Rank within its own ring (1 = worst ROI of the 19 categories, or of the 115 subfields).","t":"`$INTEGER`","key$":"rank_by_worst_roi","index$":23},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":24},"state":{"a":true,"h":"State","n":"state","r":true,"sh":"USPS 2-letter state code.","t":"`$STRING`","key$":"state","index$":25},"state_name":{"a":true,"h":"State Name","n":"state_name","r":false,"t":"`$STRING`","key$":"state_name","index$":26},"total_cost_of_attendance_nonresident_usd":{"a":true,"h":"Total Cost Of Attendance Nonresident Usd","n":"total_cost_of_attendance_nonresident_usd","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"total_cost_of_attendance_nonresident_usd","index$":27},"total_cost_of_attendance_usd":{"a":true,"h":"Total Cost Of Attendance Usd","n":"total_cost_of_attendance_usd","r":false,"t":"`$INTEGER`","key$":"total_cost_of_attendance_usd","index$":28},"unitid":{"a":true,"h":"Unitid","n":"unitid","r":true,"sh":"IPEDS UnitID — the universal join key.","t":"`$INTEGER`","key$":"unitid","index$":29},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The human-readable page for this school.","t":"`$STRING`","key$":"url","index$":30}},"name":"slug","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/colleges/{slug}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/colleges/{slug}.json","q":{"exist":["slug"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"colleges"},{"lit":"{slug}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/majors/{slug}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/majors/{slug}.json","q":{"exist":["slug"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"majors"},{"lit":"{slug}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"slug","name__orig":"slug","Name":"Slug","name_":"slug","name-":"slug","NAME":"SLUG","index$":6}, {"active":true,"entity":"slug","key$":"BasicSlugFlow","kind":"basic","name":"BasicSlugFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"slug_ref01","srcdatavar":"slug_ref01_data","suffix":"_dt0"},"m":{"slug":"slug01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-slug_ref01"}}],"index$":0}]}, 'Slug', {"GET /api/v1/colleges/{slug}.json":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"description":"College slug, e.g. university-of-michigan-ann-arbor.","schema":{"type":"string"},"index$":0}]},"GET /api/v1/majors/{slug}.json":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"description":"Major slug, e.g. philosophy-and-religious-studies or registered-nursing.","schema":{"type":"string"},"index$":0}]}})
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
  
