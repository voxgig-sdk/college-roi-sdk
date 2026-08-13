# CollegeRoi SDK feature factory

from collegeroi_sdk.feature.base_feature import CollegeRoiBaseFeature
from collegeroi_sdk.feature.test_feature import CollegeRoiTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CollegeRoiBaseFeature(),
        "test": lambda: CollegeRoiTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
