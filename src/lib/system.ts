import { ErrorEnvNotSupported } from "shared/error-handler";
import { EnvironmentType } from "shared/is-env";

import fast_glob from "fast-glob";

type ListenerEventType = "rename" | "change" | "error" | "close";
type ListenerEventFileNameType = Error | string | null;

type Listener = (
  event: ListenerEventType,
  filename: ListenerEventFileNameType,
) => void;

class FileSystem {
  private env: EnvironmentType = EnvironmentType.node;
  constructor(env: EnvironmentType) {
    this.env = env;
  }

  public async listen(dirname: string, listener: Listener): Promise<void> {
    switch (this.env) {
      case EnvironmentType.node:
      case EnvironmentType.bun: {
        const fs = await import("fs");
        const watcher = fs.watch(dirname, listener);
        process.on("SIGINT", () => {
          // close watcher when Ctrl-C is pressed
          watcher.close();
          process.exit(0);
        });
        break;
      }
      default: {
        throw ErrorEnvNotSupported(this.env);
      }
    }
  }

  public async readFile(path: string): Promise<string> {
    switch (this.env) {
      case EnvironmentType.node: {
        const fs = await import("fs");
        return fs.readFileSync(path, "utf-8");
      }
      case EnvironmentType.bun: {
        return Bun.file(path).text();
      }
      default:
        throw ErrorEnvNotSupported(this.env);
    }
  }

  public async cwd(): Promise<string> {
    switch (this.env) {
      case EnvironmentType.node:
      case EnvironmentType.bun: {
        const process = await import("process");
        return process.cwd();
      }
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

class System {
  private env: EnvironmentType = EnvironmentType.node;
  constructor(env: EnvironmentType) {
    this.env = env;
  }

  async loadFiles(pathname: string, extension: string): Promise<string[]> {
    const completePath = `${pathname}/**/*${extension}`;
    switch (this.env) {
      case EnvironmentType.node: {
        const files = await fast_glob.async(completePath, {
          ignore: ["**/node_modules/**"],
        });
        return files;
      }
      case EnvironmentType.bun: {
        const glob = new Bun.Glob(extension);
        const files = await Array.fromAsync(
          glob.scan({
            cwd: pathname,
            absolute: true,
          }),
        );
        return files;
      }
      default:
        throw ErrorEnvNotSupported(this.env);
    }
  }
}

export { FileSystem, System };
