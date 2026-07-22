# CollegeRoi SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import CollegeRoiUtility
from core.spec import CollegeRoiSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import CollegeRoiBaseFeature
from features import _make_feature


class CollegeRoiSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = CollegeRoiUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return CollegeRoiUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = CollegeRoiSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    def BestValue(self, data=None) -> "BestValueEntity":
        """Entity factory: client.BestValue().list() / client.BestValue().load({"id": ...})."""
        from entity.best_value_entity import BestValueEntity
        return BestValueEntity(self, data)


    def College(self, data=None) -> "CollegeEntity":
        """Entity factory: client.College().list() / client.College().load({"id": ...})."""
        from entity.college_entity import CollegeEntity
        return CollegeEntity(self, data)


    def Index(self, data=None) -> "IndexEntity":
        """Entity factory: client.Index().list() / client.Index().load({"id": ...})."""
        from entity.index_entity import IndexEntity
        return IndexEntity(self, data)


    def Major(self, data=None) -> "MajorEntity":
        """Entity factory: client.Major().list() / client.Major().load({"id": ...})."""
        from entity.major_entity import MajorEntity
        return MajorEntity(self, data)


    def Openapi(self, data=None) -> "OpenapiEntity":
        """Entity factory: client.Openapi().list() / client.Openapi().load({"id": ...})."""
        from entity.openapi_entity import OpenapiEntity
        return OpenapiEntity(self, data)


    def OutOfStatePenalty(self, data=None) -> "OutOfStatePenaltyEntity":
        """Entity factory: client.OutOfStatePenalty().list() / client.OutOfStatePenalty().load({"id": ...})."""
        from entity.out_of_state_penalty_entity import OutOfStatePenaltyEntity
        return OutOfStatePenaltyEntity(self, data)


    def Slug(self, data=None) -> "SlugEntity":
        """Entity factory: client.Slug().list() / client.Slug().load({"id": ...})."""
        from entity.slug_entity import SlugEntity
        return SlugEntity(self, data)


    def State(self, data=None) -> "StateEntity":
        """Entity factory: client.State().list() / client.State().load({"id": ...})."""
        from entity.state_entity import StateEntity
        return StateEntity(self, data)


    def Top50(self, data=None) -> "Top50Entity":
        """Entity factory: client.Top50().list() / client.Top50().load({"id": ...})."""
        from entity.top_50_entity import Top50Entity
        return Top50Entity(self, data)


    def WorstRoiMajor(self, data=None) -> "WorstRoiMajorEntity":
        """Entity factory: client.WorstRoiMajor().list() / client.WorstRoiMajor().load({"id": ...})."""
        from entity.worst_roi_major_entity import WorstRoiMajorEntity
        return WorstRoiMajorEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "CollegeRoiSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.best_value_entity import BestValueEntity
    from entity.college_entity import CollegeEntity
    from entity.index_entity import IndexEntity
    from entity.major_entity import MajorEntity
    from entity.openapi_entity import OpenapiEntity
    from entity.out_of_state_penalty_entity import OutOfStatePenaltyEntity
    from entity.slug_entity import SlugEntity
    from entity.state_entity import StateEntity
    from entity.top_50_entity import Top50Entity
    from entity.worst_roi_major_entity import WorstRoiMajorEntity
