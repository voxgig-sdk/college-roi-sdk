
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CollegeRoiSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CollegeRoiSDK.test()
    equal(null !== testsdk, true)
  })

})
