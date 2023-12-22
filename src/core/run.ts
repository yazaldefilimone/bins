import { readFileType } from "lib/system";
import { transform } from "core/repl";
import { EnvironmentType } from "shared/is-env";
type toBeType = (value: unknown) => boolean;
type toBeWithNotParamType = () => boolean;
type expectedType = {
  toBeTruthy: toBeWithNotParamType;
  toBeFalsy: toBeWithNotParamType;
  toEqual?: toBeType;
  toContain?: toBeType;
  toStrictEqual?: toBeType;
  not?: expectedType;
  toThrow?: toBeWithNotParamType;
  toTypeof?: toBeType;
};

type ResponseType = {
  isSuccessful: boolean;
  error: Error | null;
};

type expectType = (expected: unknown) => expectedType;
function expect<T>(expected: T): expectedType {
  function toBeTruthy() {
    if (!isTruthy(expected)) {
      throw new Error("Expected value to be truthy");
    }
    return true;
  }

  function toBeFalsy() {
    if (isTruthy(expected)) {
      throw new Error("Expected value to be falsy");
    }
    return true;
  }

  return {
    toBeTruthy,
    toBeFalsy,
  };
}

function test<T>(name: string, callback: (expect: expectType) => void): void {
  const expectType: <T>(expected: T) => expectedType = expect;
  callback(expectType);
}

const expectCode = `
type toBeType = (value: unknown) => boolean;
type toBeWithNotParamType = () => boolean;
type expectedType = {
  toBeTruthy: toBeWithNotParamType;
  toBeFalsy: toBeWithNotParamType;
  toEqual?: toBeType;
  toContain?: toBeType;
  toStrictEqual?: toBeType;
  not?: expectedType;
  toThrow?: toBeWithNotParamType;
  toTypeof?: toBeType;
};

type ResponseType = {
  isSuccessful: boolean;
  error: Error | null;
};

type expectType = (expected: unknown) => expectedType;
function expect<T>(expected: T): expectedType {
  function toBeTruthy() {
    if (!isTruthy(expected)) {
      throw new Error("Expected value to be truthy");
    }
    return true;
  }

  function toBeFalsy() {
    if (isTruthy(expected)) {
      throw new Error("Expected value to be falsy");
    }
    return true;
  }

  return {
    toBeTruthy,
    toBeFalsy,
  };
}
function test<T>(name: string, callback: (expect: expectType) => void): void {
  const expectType: <T>(expected: T) => expectedType = expect;
  console.log({_tests});
  callback(expectType);
}
`;
function isTruthy<T>(value: T): boolean {
  if (value) {
    return true;
  }
  return false;
}

export async function run(
  path: string,
  readFile: readFileType,
  env: EnvironmentType,
): Promise<ResponseType> {
  const status: ResponseType = {
    isSuccessful: true,
    error: null,
  };
  const code = (await readFile(path, "utf-8")) as string;
  try {
    const transformed = await transform(
      `
      ${expectCode}
      ${code}
    `,
      "ts",
      env,
    );
    const _tests = new Map<string, ResponseType>();
    eval(transformed);
  } catch (error) {
    status.isSuccessful = false;
    status.error = error as Error;
  }
  // @ts-ignore
  // console.log(_tests);
  return status;
}
