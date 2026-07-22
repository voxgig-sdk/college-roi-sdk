# CollegeRoi SDK utility: make_context
require_relative '../core/context'
module CollegeRoiUtilities
  MakeContext = ->(ctxmap, basectx) {
    CollegeRoiContext.new(ctxmap, basectx)
  }
end
