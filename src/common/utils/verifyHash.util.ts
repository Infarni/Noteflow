import * as bcrypt from 'bcrypt';

export async function verifyHash(
  value: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(value, hash);
}
