export class ErrorHandler extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BinsErrorHandler";
  }
}

export function ErrorEnvNotSupported(name: string): string {
  return `"Bins v1" not supported "${name}"`;
}
