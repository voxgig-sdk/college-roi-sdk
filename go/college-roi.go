package voxgigcollegeroisdk

import (
	"github.com/voxgig-sdk/college-roi-sdk/go/core"
	"github.com/voxgig-sdk/college-roi-sdk/go/entity"
	"github.com/voxgig-sdk/college-roi-sdk/go/feature"
	_ "github.com/voxgig-sdk/college-roi-sdk/go/utility"
)

// Type aliases preserve external API.
type CollegeRoiSDK = core.CollegeRoiSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CollegeRoiEntity = core.CollegeRoiEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CollegeRoiError = core.CollegeRoiError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBestValueEntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewBestValueEntity(client, entopts)
	}
	core.NewCollegeEntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewCollegeEntity(client, entopts)
	}
	core.NewIndexEntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewIndexEntity(client, entopts)
	}
	core.NewMajorEntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewMajorEntity(client, entopts)
	}
	core.NewOpenapiEntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewOpenapiEntity(client, entopts)
	}
	core.NewOutOfStatePenaltyEntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewOutOfStatePenaltyEntity(client, entopts)
	}
	core.NewSlugEntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewSlugEntity(client, entopts)
	}
	core.NewStateEntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewStateEntity(client, entopts)
	}
	core.NewTop50EntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewTop50Entity(client, entopts)
	}
	core.NewWorstRoiMajorEntityFunc = func(client *core.CollegeRoiSDK, entopts map[string]any) core.CollegeRoiEntity {
		return entity.NewWorstRoiMajorEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCollegeRoiSDK = core.NewCollegeRoiSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCollegeRoiSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CollegeRoiSDK  { return NewCollegeRoiSDK(nil) }
func Test() *CollegeRoiSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
