import { EnvironmentType } from "./is-env";
import { Maybe } from "./maybe";

type EnvType = {
  name: EnvironmentType;
  isSupported: boolean;
};
const env = {
  node: {
    name: EnvironmentType.node,
    isSupported: true,
  },
  bun: {
    name: EnvironmentType.bun,
    isSupported: false,
  },
  deno: {
    name: EnvironmentType.deno,
    isSupported: false,
  },
  browser: {
    name: EnvironmentType.browser,
    isSupported: false,
  },
};

export function isSuporte(name: EnvironmentType): Maybe<EnvType> {
  return env[name];
}
