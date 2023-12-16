"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEnvNotSupported = exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(message) {
        super(message);
        this.name = "ErrorHandler";
    }
}
exports.ErrorHandler = ErrorHandler;
function ErrorEnvNotSupported(name) {
    return `"Bins v1" not supported "${name}"`;
}
exports.ErrorEnvNotSupported = ErrorEnvNotSupported;
//# sourceMappingURL=error-handler.js.map