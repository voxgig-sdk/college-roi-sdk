# CollegeRoi SDK exists test

require "minitest/autorun"
require_relative "../CollegeRoi_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CollegeRoiSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
