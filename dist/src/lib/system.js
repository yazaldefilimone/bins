"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = exports.FileSystem = void 0;
const error_handler_1 = require("shared/error-handler");
const is_env_1 = require("shared/is-env");
class FileSystem {
    constructor(env) {
        this.env = is_env_1.EnvironmentType.node;
        this.env = env;
    }
    async readFile(path) {
        if (this.env === is_env_1.EnvironmentType.node) {
            const fs = await Promise.resolve().then(() => __importStar(require("fs")));
            return fs.readFileSync(path, "utf-8");
        }
        if (this.env === is_env_1.EnvironmentType.bun) {
            return Bun.file(path).text();
        }
        switch (this.env) {
            case is_env_1.EnvironmentType.browser:
            case is_env_1.EnvironmentType.deno: {
                throw (0, error_handler_1.ErrorEnvNotSupported)(this.env);
            }
            default: {
                throw (0, error_handler_1.ErrorEnvNotSupported)(this.env);
            }
        }
    }
    async cwd() {
        if (this.env === is_env_1.EnvironmentType.node) {
            const process = await Promise.resolve().then(() => __importStar(require("process")));
            return process.cwd();
        }
        if (this.env === is_env_1.EnvironmentType.bun) {
            return import.meta.dir;
        }
        switch (this.env) {
            case is_env_1.EnvironmentType.browser:
            case is_env_1.EnvironmentType.deno: {
                throw (0, error_handler_1.ErrorEnvNotSupported)(this.env);
            }
            default: {
                throw (0, error_handler_1.ErrorEnvNotSupported)(this.env);
            }
        }
    }
}
exports.FileSystem = FileSystem;
class System {
}
exports.System = System;
//# sourceMappingURL=system.js.map