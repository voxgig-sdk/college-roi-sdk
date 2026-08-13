# CollegeRoi SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CollegeRoiUtility.registrar = ->(u) {
  u.clean = CollegeRoiUtilities::Clean
  u.done = CollegeRoiUtilities::Done
  u.make_error = CollegeRoiUtilities::MakeError
  u.feature_add = CollegeRoiUtilities::FeatureAdd
  u.feature_hook = CollegeRoiUtilities::FeatureHook
  u.feature_init = CollegeRoiUtilities::FeatureInit
  u.fetcher = CollegeRoiUtilities::Fetcher
  u.make_fetch_def = CollegeRoiUtilities::MakeFetchDef
  u.make_context = CollegeRoiUtilities::MakeContext
  u.make_options = CollegeRoiUtilities::MakeOptions
  u.make_request = CollegeRoiUtilities::MakeRequest
  u.make_response = CollegeRoiUtilities::MakeResponse
  u.make_result = CollegeRoiUtilities::MakeResult
  u.make_point = CollegeRoiUtilities::MakePoint
  u.make_spec = CollegeRoiUtilities::MakeSpec
  u.make_url = CollegeRoiUtilities::MakeUrl
  u.param = CollegeRoiUtilities::Param
  u.prepare_auth = CollegeRoiUtilities::PrepareAuth
  u.prepare_body = CollegeRoiUtilities::PrepareBody
  u.prepare_headers = CollegeRoiUtilities::PrepareHeaders
  u.prepare_method = CollegeRoiUtilities::PrepareMethod
  u.prepare_params = CollegeRoiUtilities::PrepareParams
  u.prepare_path = CollegeRoiUtilities::PreparePath
  u.prepare_query = CollegeRoiUtilities::PrepareQuery
  u.graphql_body = CollegeRoiUtilities::GraphqlBody
  u.graphql_errors = CollegeRoiUtilities::GraphqlErrors
  u.result_basic = CollegeRoiUtilities::ResultBasic
  u.result_body = CollegeRoiUtilities::ResultBody
  u.result_headers = CollegeRoiUtilities::ResultHeaders
  u.transform_request = CollegeRoiUtilities::TransformRequest
  u.transform_response = CollegeRoiUtilities::TransformResponse
}
