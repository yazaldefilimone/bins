import { ErrorEnvNotSupported } from "shared/error-handler";
import { isEnv } from "shared/is-env";
import { isSuporte } from "shared/suporte";
import { FileSystem, System } from "lib/system";
import { run } from "core/run";
const env = isEnv();
const suporte = isSuporte(env);
console.log(env, suporte);
if (!suporte) {
  throw new Error("Bins v1: unknown environment");
}
if (suporte.isSupported === false) {
  throw ErrorEnvNotSupported(suporte.name);
}
const fs = new FileSystem(env);
const system = new System(env);

async function load() {
  const absolutePath = await fs.cwd();
  const testsfiles = await system.loadFiles(
    `${absolutePath}/examples`,
    ".test.ts",
  );
  return {
    testsfiles,
    testFolder: `${absolutePath}/examples`,
  };
}

fs.listen(".", (event, filename) => {
  console.log(`event is: ${event} filename provided: ${filename}`);
});

async function bootstrap() {
  const { testsfiles, testFolder } = await load();
  console.log(testsfiles);
  for (const file of testsfiles) {
    const { isSuccessful, error } = await run(file, fs.readFile.bind(fs), env);
    if (isSuccessful) {
      console.log(`Test file ${file} passed`);
    } else {
      console.log(`Test file ${file} failed`);
    }
  }
}

bootstrap();
