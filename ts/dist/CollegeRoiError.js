"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollegeRoiError = void 0;
class CollegeRoiError extends Error {
    isCollegeRoiError = true;
    sdk = 'CollegeRoi';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CollegeRoiError = CollegeRoiError;
//# sourceMappingURL=CollegeRoiError.js.map