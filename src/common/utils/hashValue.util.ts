import * as bcrypt from 'bcrypt';

const SALT_ROUNDS: number = 10;

export async function hashValue(value: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
  const hash: string = await bcrypt.hash(value, salt);

  return hash;
}
