import { readFileSync } from 'fs';

export function load<T>(path: string): T {
  const contents = readFileSync(path);
  return JSON.parse(contents.toString());
}
