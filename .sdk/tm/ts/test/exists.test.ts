
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CollegeRoiSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CollegeRoiSDK.test()
    equal(testsdk instanceof CollegeRoiSDK, true,
      'CollegeRoiSDK.test() must return a client synchronously')
  })

})
