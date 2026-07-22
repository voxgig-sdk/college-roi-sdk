<?php
declare(strict_types=1);

// CollegeRoi SDK utility: prepare_body

class CollegeRoiPrepareBody
{
    public static function call(CollegeRoiContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
