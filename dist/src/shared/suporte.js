"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuporte = void 0;
const is_env_1 = require("./is-env");
const env = {
    node: {
        name: is_env_1.EnvironmentType.node,
        isSupported: true,
    },
    bun: {
        name: is_env_1.EnvironmentType.bun,
        isSupported: false,
    },
    deno: {
        name: is_env_1.EnvironmentType.deno,
        isSupported: false,
    },
    browser: {
        name: is_env_1.EnvironmentType.browser,
        isSupported: false,
    },
};
function isSuporte(name) {
    return env[name];
}
exports.isSuporte = isSuporte;
//# sourceMappingURL=suporte.js.map