enum EnvironmentType {
  node = "node",
  bun = "bun",
  deno = "deno",
  browser = "browser",
}

function isEnv(): EnvironmentType {
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

function isBun(): boolean {
  // @ts-ignore
  const isBun = typeof Bun !== "undefined";
  return isBun;
}

function isNode(): boolean {
  const { bun, deno } = process.versions;
  if (bun || deno) {
    return false;
  }
  return Boolean(process.title.endsWith("node"));
}

function isDeno(): boolean {
  // @ts-ignore
  const isDeno = typeof Deno !== "undefined";
  return isDeno;
}

function isBrowser(): boolean {
  // @ts-ignore
  const isBrowser = typeof window !== "undefined";
  return isBrowser;
}
export { isBun, isNode, isDeno, isEnv, EnvironmentType, isBrowser };
