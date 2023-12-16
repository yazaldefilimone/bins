import { ErrorEnvNotSupported } from "shared/error-handler";
import { isEnv } from "shared/is-env";
import { isSuporte } from "shared/suporte";
import { FileSystem } from "lib/system";

const env = isEnv();
const suporte = isSuporte(env);
if (!suporte) {
  throw new Error("Bins v1: unknown environment");
}
if (suporte.isSupported === false) {
  throw ErrorEnvNotSupported(suporte.name);
}

async function boostrap() {
  const absolutePath = await new FileSystem(env).cwd();
  console.log(absolutePath);

  const file = await new FileSystem(env).readFile("examples/test.text");
  console.log("file", file);
  // export class Bins {}
}

boostrap();
