<?php
declare(strict_types=1);

// CollegeRoi SDK exists test

require_once __DIR__ . '/../collegeroi_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CollegeRoiSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
