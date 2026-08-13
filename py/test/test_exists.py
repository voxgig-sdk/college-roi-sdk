# CollegeRoi SDK exists test

import pytest
from collegeroi_sdk import CollegeRoiSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CollegeRoiSDK.test(None, None)
        assert testsdk is not None
