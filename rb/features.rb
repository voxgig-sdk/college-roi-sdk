# CollegeRoi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CollegeRoiFeatures
  def self.make_feature(name)
    case name
    when "base"
      CollegeRoiBaseFeature.new
    when "ratelimit"
      CollegeRoiRatelimitFeature.new
    when "retry"
      CollegeRoiRetryFeature.new
    when "test"
      CollegeRoiTestFeature.new
    when "timeout"
      CollegeRoiTimeoutFeature.new
    else
      CollegeRoiBaseFeature.new
    end
  end
end
