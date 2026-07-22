<?php
declare(strict_types=1);

// CollegeRoi SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CollegeRoiFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CollegeRoiBaseFeature();
            case "test":
                return new CollegeRoiTestFeature();
            default:
                return new CollegeRoiBaseFeature();
        }
    }
}
