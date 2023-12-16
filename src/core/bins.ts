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
  const fs = new FileSystem(env);
  const absolutePath = await fs.cwd();
  const file = await fs.readFile("package.json");
  console.log(absolutePath);
  console.log(file);
}

boostrap();
