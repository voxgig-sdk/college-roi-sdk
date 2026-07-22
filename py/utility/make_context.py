# CollegeRoi SDK utility: make_context

from core.context import CollegeRoiContext


def make_context_util(ctxmap, basectx):
    return CollegeRoiContext(ctxmap, basectx)
