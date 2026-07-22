<?php
declare(strict_types=1);

// CollegeRoi SDK utility: result_headers

class CollegeRoiResultHeaders
{
    public static function call(CollegeRoiContext $ctx): ?CollegeRoiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
