import { EnvironmentType } from "shared/is-env";

export async function transform(
  code: string,
  type: "js" | "ts",
  env: EnvironmentType,
) {
  let transformedCode = code;

  try {
    if (type === "ts" && env === EnvironmentType.node) {
      const esbuild = await import("esbuild");
      const transformed = await esbuild.transform(transformedCode, {
        loader: type,
        tsconfigRaw: {
          compilerOptions: {
            preserveValueImports: true,
          },
        },
        define: {
          require: "global.require",
        },
      });
      transformedCode = transformed.code;
    } else if (type === "ts" && env === EnvironmentType.bun) {
      const transpiler = new Bun.Transpiler({
        loader: "ts",
        target: env,
      });
      const transformed = await transpiler.transform(code, "ts");
      transformedCode = transformed;
    }
  } catch (error) {}
  return transformedCode;
}
