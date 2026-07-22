# CollegeRoi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CollegeRoiFeatures
  def self.make_feature(name)
    case name
    when "base"
      CollegeRoiBaseFeature.new
    when "test"
      CollegeRoiTestFeature.new
    else
      CollegeRoiBaseFeature.new
    end
  end
end
