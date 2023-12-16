"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = exports.EnvironmentType = exports.isEnv = exports.isDeno = exports.isNode = exports.isBun = void 0;
var EnvironmentType;
(function (EnvironmentType) {
    EnvironmentType["node"] = "node";
    EnvironmentType["bun"] = "bun";
    EnvironmentType["deno"] = "deno";
    EnvironmentType["browser"] = "browser";
})(EnvironmentType || (exports.EnvironmentType = EnvironmentType = {}));
function isEnv() {
    if (isNode()) {
        return EnvironmentType.node;
    }
    if (isBun()) {
        return EnvironmentType.bun;
    }
    if (isDeno()) {
        return EnvironmentType.deno;
    }
    return EnvironmentType.browser;
}
exports.isEnv = isEnv;
function isBun() {
    const isBun = typeof Bun !== "undefined";
    return isBun;
}
exports.isBun = isBun;
function isNode() {
    const isNode = typeof process !== "undefined" && process.versions.node;
    return Boolean(isNode);
}
exports.isNode = isNode;
function isDeno() {
    const isDeno = typeof Deno !== "undefined";
    return isDeno;
}
exports.isDeno = isDeno;
function isBrowser() {
    const isBrowser = typeof window !== "undefined";
    return isBrowser;
}
exports.isBrowser = isBrowser;
//# sourceMappingURL=is-env.js.map