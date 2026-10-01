-- CollegeRoi SDK error

local json = require("dkjson")

local CollegeRoiError = {}
CollegeRoiError.__index = CollegeRoiError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function CollegeRoiError.new(code, msg, ctx)
  local self = setmetatable({}, CollegeRoiError)
  self.is_sdk_error = true
  self.sdk = "CollegeRoi"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function CollegeRoiError:context()
  return CONTEXT[self]
end


function CollegeRoiError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function CollegeRoiError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function CollegeRoiError:to_json()
  return json.encode(self:to_table())
end


function CollegeRoiError:__tostring()
  return self.msg
end


function CollegeRoiError.__tojson(self)
  return self:to_json()
end


return CollegeRoiError
