import { FileSystem } from "lib/system";
import { EnvironmentType } from "shared/is-env";
export class FileMap {
  private fsCache = new Map<string, string>();
  private fsBufferCache = new Map<string, Buffer | ArrayBuffer>();
  private fs: FileSystem;
  constructor(env: EnvironmentType) {
    this.fs = new FileSystem(env);
  }
  public async readFile(path: string): Promise<string> {
    const cached = this.fsCache.get(path);
    if (cached) return cached;
    const source = (await this.fs.readFile(path, "utf-8")) as string;
    this.fsCache.set(path, source);
    return source;
  }

  public async readBuffer(path: string): Promise<Buffer | ArrayBuffer> {
    const cached = this.fsBufferCache.get(path);
    if (cached) return cached;
    const buffer = (await this.fs.readFile(path)) as Buffer | ArrayBuffer;
    this.fsBufferCache.set(path, buffer);
    return buffer;
  }
}
