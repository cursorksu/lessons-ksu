import { customAlphabet } from 'nanoid';

export function generateId(idLength) {
  const nanoid = customAlphabet('1234567890', 10);
  return nanoid(idLength);
}
