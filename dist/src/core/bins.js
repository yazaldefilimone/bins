"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_1 = require("shared/error-handler");
const is_env_1 = require("shared/is-env");
const suporte_1 = require("shared/suporte");
const system_1 = require("lib/system");
const env = (0, is_env_1.isEnv)();
const suporte = (0, suporte_1.isSuporte)(env);
if (!suporte) {
    throw new Error("Bins v1: unknown environment");
}
if (suporte.isSupported === false) {
    throw (0, error_handler_1.ErrorEnvNotSupported)(suporte.name);
}
const absolutePath = await new system_1.FileSystem(env).cwd();
console.log(absolutePath);
const file = await new system_1.FileSystem(env).readFile("examples/test.text");
console.log(file);
//# sourceMappingURL=bins.js.map