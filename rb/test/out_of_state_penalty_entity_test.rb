# OutOfStatePenalty entity test

require "minitest/autorun"
require "json"
require_relative "../CollegeRoi_sdk"
require_relative "runner"

class OutOfStatePenaltyEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CollegeRoiSDK.test(nil, nil)
    ent = testsdk.OutOfStatePenalty(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "out_of_state_penalty" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = CollegeRoiSDK.test(seed, nil)
    seen = base.OutOfStatePenalty(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = CollegeRoiConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = CollegeRoiSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.OutOfStatePenalty(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = out_of_state_penalty_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "out_of_state_penalty." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    out_of_state_penalty_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.out_of_state_penalty")))
    out_of_state_penalty_ref01_data = nil
    if out_of_state_penalty_ref01_data_raw.length > 0
      out_of_state_penalty_ref01_data = Helpers.to_map(out_of_state_penalty_ref01_data_raw[0][1])
    end

    # LIST
    out_of_state_penalty_ref01_ent = client.OutOfStatePenalty(nil)
    out_of_state_penalty_ref01_match = {}

    out_of_state_penalty_ref01_list_result = out_of_state_penalty_ref01_ent.list(out_of_state_penalty_ref01_match, nil)
    assert out_of_state_penalty_ref01_list_result.is_a?(Array)

  end
end

def out_of_state_penalty_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "out_of_state_penalty", "OutOfStatePenaltyTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CollegeRoiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["out_of_state_penalty01", "out_of_state_penalty02", "out_of_state_penalty03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID" => idmap,
    "COLLEGE_ROI_TEST_LIVE" => "FALSE",
    "COLLEGE_ROI_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["COLLEGE_ROI_TEST_OUT_OF_STATE_PENALTY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["COLLEGE_ROI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
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
