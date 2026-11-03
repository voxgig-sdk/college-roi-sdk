# CollegeRoi SDK utility: prepare_body
require_relative 'media'
module CollegeRoiUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return CollegeRoiUtilities.raw_body(ctx.reqdata) if CollegeRoiUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
