# Slug entity test

require "minitest/autorun"
require "json"
require_relative "../CollegeRoi_sdk"
require_relative "runner"

class SlugEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = CollegeRoiSDK.test(nil, nil)
    ent = testsdk.Slug(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = CollegeRoiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = CollegeRoiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Slug(nil).load({ "slug" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = slug_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "slug." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["slug01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COLLEGE_ROI_TEST_SLUG_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    slug_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.slug")))
    slug_ref01_data = nil
    if slug_ref01_data_raw.length > 0
      slug_ref01_data = Helpers.to_map(slug_ref01_data_raw[0][1])
    end

    # LOAD
    slug_ref01_ent = client.Slug(nil)
    slug_ref01_match_dt0 = {}
    slug_ref01_match_dt0["slug"] = setup[:idmap]["slug"] || setup[:idmap]["slug01"]
    unless setup[:live]
      own = slug_ref01_data["slug"]
      slug_ref01_match_dt0["slug"] = own if [String, Numeric, TrueClass, FalseClass].any? { |c| own.is_a?(c) }
    end
    slug_ref01_data_dt0_loaded = slug_ref01_ent.load(slug_ref01_match_dt0, nil)
    assert !slug_ref01_data_dt0_loaded.nil?

  end
end

def slug_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "slug", "SlugTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CollegeRoiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["slug01", "slug02", "slug03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COLLEGE_ROI_TEST_SLUG_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COLLEGE_ROI_TEST_SLUG_ENTID" => idmap,
    "COLLEGE_ROI_TEST_LIVE" => "FALSE",
    "COLLEGE_ROI_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["COLLEGE_ROI_TEST_SLUG_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["COLLEGE_ROI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = CollegeRoiSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["COLLEGE_ROI_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["COLLEGE_ROI_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
