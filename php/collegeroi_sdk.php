<?php
declare(strict_types=1);

// CollegeRoi SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class CollegeRoiSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new CollegeRoiUtility();
        $this->_utility = $utility;

        $config = CollegeRoiConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = CollegeRoiHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = CollegeRoiHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, CollegeRoiFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return CollegeRoiUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = CollegeRoiHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = CollegeRoiHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = CollegeRoiHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new CollegeRoiSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new CollegeRoiError($op . "_allow",
                "CollegeRoiSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = CollegeRoiHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = CollegeRoiHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new CollegeRoiError("graphql_error",
                "CollegeRoiSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_best_value = null;

    // Canonical facade: $client->BestValue()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->best_value()
    // resolves here too.
    public function BestValue($data = null)
    {
        require_once __DIR__ . '/entity/best_value_entity.php';
        if ($data === null) {
            if ($this->_best_value === null) {
                $this->_best_value = new BestValueEntity($this, null);
            }
            return $this->_best_value;
        }
        return new BestValueEntity($this, $data);
    }


    private $_college = null;

    // Canonical facade: $client->College()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->college()
    // resolves here too.
    public function College($data = null)
    {
        require_once __DIR__ . '/entity/college_entity.php';
        if ($data === null) {
            if ($this->_college === null) {
                $this->_college = new CollegeEntity($this, null);
            }
            return $this->_college;
        }
        return new CollegeEntity($this, $data);
    }


    private $_index = null;

    // Canonical facade: $client->Index()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->index()
    // resolves here too.
    public function Index($data = null)
    {
        require_once __DIR__ . '/entity/index_entity.php';
        if ($data === null) {
            if ($this->_index === null) {
                $this->_index = new IndexEntity($this, null);
            }
            return $this->_index;
        }
        return new IndexEntity($this, $data);
    }


    private $_major = null;

    // Canonical facade: $client->Major()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->major()
    // resolves here too.
    public function Major($data = null)
    {
        require_once __DIR__ . '/entity/major_entity.php';
        if ($data === null) {
            if ($this->_major === null) {
                $this->_major = new MajorEntity($this, null);
            }
            return $this->_major;
        }
        return new MajorEntity($this, $data);
    }


    private $_openapi = null;

    // Canonical facade: $client->Openapi()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->openapi()
    // resolves here too.
    public function Openapi($data = null)
    {
        require_once __DIR__ . '/entity/openapi_entity.php';
        if ($data === null) {
            if ($this->_openapi === null) {
                $this->_openapi = new OpenapiEntity($this, null);
            }
            return $this->_openapi;
        }
        return new OpenapiEntity($this, $data);
    }


    private $_out_of_state_penalty = null;

    // Canonical facade: $client->OutOfStatePenalty()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->out_of_state_penalty()
    // resolves here too.
    public function OutOfStatePenalty($data = null)
    {
        require_once __DIR__ . '/entity/out_of_state_penalty_entity.php';
        if ($data === null) {
            if ($this->_out_of_state_penalty === null) {
                $this->_out_of_state_penalty = new OutOfStatePenaltyEntity($this, null);
            }
            return $this->_out_of_state_penalty;
        }
        return new OutOfStatePenaltyEntity($this, $data);
    }


    private $_slug = null;

    // Canonical facade: $client->Slug()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->slug()
    // resolves here too.
    public function Slug($data = null)
    {
        require_once __DIR__ . '/entity/slug_entity.php';
        if ($data === null) {
            if ($this->_slug === null) {
                $this->_slug = new SlugEntity($this, null);
            }
            return $this->_slug;
        }
        return new SlugEntity($this, $data);
    }


    private $_state = null;

    // Canonical facade: $client->State()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->state()
    // resolves here too.
    public function State($data = null)
    {
        require_once __DIR__ . '/entity/state_entity.php';
        if ($data === null) {
            if ($this->_state === null) {
                $this->_state = new StateEntity($this, null);
            }
            return $this->_state;
        }
        return new StateEntity($this, $data);
    }


    private $_top_50 = null;

    // Canonical facade: $client->Top50()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->top_50()
    // resolves here too.
    public function Top50($data = null)
    {
        require_once __DIR__ . '/entity/top_50_entity.php';
        if ($data === null) {
            if ($this->_top_50 === null) {
                $this->_top_50 = new Top50Entity($this, null);
            }
            return $this->_top_50;
        }
        return new Top50Entity($this, $data);
    }


    private $_worst_roi_major = null;

    // Canonical facade: $client->WorstRoiMajor()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->worst_roi_major()
    // resolves here too.
    public function WorstRoiMajor($data = null)
    {
        require_once __DIR__ . '/entity/worst_roi_major_entity.php';
        if ($data === null) {
            if ($this->_worst_roi_major === null) {
                $this->_worst_roi_major = new WorstRoiMajorEntity($this, null);
            }
            return $this->_worst_roi_major;
        }
        return new WorstRoiMajorEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new CollegeRoiSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
