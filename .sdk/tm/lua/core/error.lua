-- CollegeRoi SDK error

local CollegeRoiError = {}
CollegeRoiError.__index = CollegeRoiError


function CollegeRoiError.new(code, msg, ctx)
  local self = setmetatable({}, CollegeRoiError)
  self.is_sdk_error = true
  self.sdk = "CollegeRoi"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CollegeRoiError:error()
  return self.msg
end


function CollegeRoiError:__tostring()
  return self.msg
end


return CollegeRoiError
