import { ErrorEnvNotSupported } from "shared/error-handler";
import { EnvironmentType } from "shared/is-env";

import fast_glob from "fast-glob";

export type readFileType = (
  path: string,
  type?: "utf-8",
) => Promise<string | Buffer | ArrayBuffer>;
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

  public async readFile(
    path: string,
    type?: "utf-8",
  ): Promise<string | Buffer | ArrayBuffer> {
    switch (this.env) {
      case EnvironmentType.node: {
        const fs = await import("fs");
        if (type) {
          return fs.readFileSync(path, type);
        }
        return fs.readFileSync(path);
      }
      case EnvironmentType.bun: {
        if (type === "utf-8") {
          return Bun.file(path).text();
        }
        return Bun.file(path).arrayBuffer();
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
    switch (this.env) {
      case EnvironmentType.node: {
        const files = await fast_glob.async(`${pathname}/**/*${extension}`, {
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
