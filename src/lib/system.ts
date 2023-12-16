import { ErrorEnvNotSupported } from "shared/error-handler";
import { EnvironmentType } from "shared/is-env";

class FileSystem {
  private env: EnvironmentType = EnvironmentType.node;
  constructor(env: EnvironmentType) {
    this.env = env;
  }

  public async readFile(path: string): Promise<string> {
    if (this.env === EnvironmentType.node) {
      const fs = await import("fs");
      return fs.readFileSync(path, "utf-8");
    }

    if (this.env === EnvironmentType.bun) {
      return Bun.file(path).text();
    }

    switch (this.env) {
      case EnvironmentType.browser:
      case EnvironmentType.deno: {
        throw ErrorEnvNotSupported(this.env);
      }
      default: {
        throw ErrorEnvNotSupported(this.env);
      }
    }
  }

  public async cwd(): Promise<string> {
    if (this.env === EnvironmentType.node) {
      const process = await import("process");
      return process.cwd();
    }

    if (this.env === EnvironmentType.bun) {
      return import.meta.dir;
    }

    switch (this.env) {
      case EnvironmentType.browser:
      case EnvironmentType.deno: {
        throw ErrorEnvNotSupported(this.env);
      }
      default: {
        throw ErrorEnvNotSupported(this.env);
      }
    }
  }
}

class System {}

export { FileSystem, System };
