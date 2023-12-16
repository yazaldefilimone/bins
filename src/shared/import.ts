export async function importModule<T>(name: string): Promise<T> {
  return await import(name);
}
