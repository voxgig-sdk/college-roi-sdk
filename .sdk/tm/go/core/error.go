package core

type CollegeRoiError struct {
	IsCollegeRoiError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCollegeRoiError(code string, msg string, ctx *Context) *CollegeRoiError {
	return &CollegeRoiError{
		IsCollegeRoiError: true,
		Sdk:              "CollegeRoi",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CollegeRoiError) Error() string {
	return e.Msg
}
