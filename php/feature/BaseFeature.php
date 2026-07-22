<?php
declare(strict_types=1);

// CollegeRoi SDK base feature

class CollegeRoiBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CollegeRoiContext $ctx, array $options): void {}
    public function PostConstruct(CollegeRoiContext $ctx): void {}
    public function PostConstructEntity(CollegeRoiContext $ctx): void {}
    public function SetData(CollegeRoiContext $ctx): void {}
    public function GetData(CollegeRoiContext $ctx): void {}
    public function GetMatch(CollegeRoiContext $ctx): void {}
    public function SetMatch(CollegeRoiContext $ctx): void {}
    public function PrePoint(CollegeRoiContext $ctx): void {}
    public function PreSpec(CollegeRoiContext $ctx): void {}
    public function PreRequest(CollegeRoiContext $ctx): void {}
    public function PreResponse(CollegeRoiContext $ctx): void {}
    public function PreResult(CollegeRoiContext $ctx): void {}
    public function PreDone(CollegeRoiContext $ctx): void {}
    public function PreUnexpected(CollegeRoiContext $ctx): void {}
}
