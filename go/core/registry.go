package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBestValueEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

var NewCollegeEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

var NewIndexEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

var NewMajorEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

var NewOpenapiEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

var NewOutOfStatePenaltyEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

var NewSlugEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

var NewStateEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

var NewTop50EntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

var NewWorstRoiMajorEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntityBase

