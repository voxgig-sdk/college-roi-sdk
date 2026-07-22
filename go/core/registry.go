package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBestValueEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

var NewCollegeEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

var NewIndexEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

var NewMajorEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

var NewOpenapiEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

var NewOutOfStatePenaltyEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

var NewSlugEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

var NewStateEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

var NewTop50EntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

var NewWorstRoiMajorEntityFunc func(client *CollegeRoiSDK, entopts map[string]any) CollegeRoiEntity

