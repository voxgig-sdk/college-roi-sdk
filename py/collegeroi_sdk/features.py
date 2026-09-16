# CollegeRoi SDK feature factory

from collegeroi_sdk.feature.base_feature import CollegeRoiBaseFeature
from collegeroi_sdk.feature.ratelimit_feature import CollegeRoiRatelimitFeature
from collegeroi_sdk.feature.retry_feature import CollegeRoiRetryFeature
from collegeroi_sdk.feature.test_feature import CollegeRoiTestFeature
from collegeroi_sdk.feature.timeout_feature import CollegeRoiTimeoutFeature


_FEATURES = {
    "base": lambda: CollegeRoiBaseFeature(),
    "ratelimit": lambda: CollegeRoiRatelimitFeature(),
    "retry": lambda: CollegeRoiRetryFeature(),
    "test": lambda: CollegeRoiTestFeature(),
    "timeout": lambda: CollegeRoiTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
