<?php
declare(strict_types=1);

// CollegeRoi SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CollegeRoiMakeContext
{
    public static function call(array $ctxmap, ?CollegeRoiContext $basectx): CollegeRoiContext
    {
        return new CollegeRoiContext($ctxmap, $basectx);
    }
}
