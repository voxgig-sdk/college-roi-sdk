package = "voxgig-sdk-college-roi"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/college-roi-sdk.git",
  tag = "lua/v0.0.1",
  dir = "college-roi-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the LE TEEN College ROI public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/college-roi-sdk",
  issues_url = "https://github.com/voxgig-sdk/college-roi-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "college-roi" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["college-roi_sdk"] = "college-roi_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
