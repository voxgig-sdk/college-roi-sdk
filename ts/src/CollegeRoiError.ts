
import { Context } from './Context'


class CollegeRoiError extends Error {

  isCollegeRoiError = true

  sdk = 'CollegeRoi'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CollegeRoiError
}

