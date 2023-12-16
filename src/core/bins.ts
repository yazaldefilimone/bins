import { ErrorEnvNotSupported } from "shared/error-handler";
import { isEnv } from "shared/is-env";
import { isSuporte } from "shared/suporte";
import { FileSystem, System } from "lib/system";

const env = isEnv();
const suporte = isSuporte(env);
console.log(env, suporte);
if (!suporte) {
  throw new Error("Bins v1: unknown environment");
}
if (suporte.isSupported === false) {
  throw ErrorEnvNotSupported(suporte.name);
}

async function boostrap() {
  const fs = new FileSystem(env);
  const system = new System(env);
  const absolutePath = await fs.cwd();
  const file = await fs.readFile("package.json");
  console.log(absolutePath);
  console.log(file);

  // await fs.listen(".", (event, filename) => {
  //   console.log(`event is: ${event} filename provided: ${filename}`);
  // });

  const files = await system.loadFiles(`${absolutePath}/src`, "**/*.ts");
  console.log(files);
}

boostrap();
