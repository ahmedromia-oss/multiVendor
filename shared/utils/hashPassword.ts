import { randomBytes, scrypt as _scrypt, verify } from 'crypto';
import { promisify } from 'util';

/**
 * Hash password with random salt using scrypt
 * @param password Plain text password to hash
 * @returns Salted hash in format "salt.hash"
 */
export async function hashSaltPassword(password: string): Promise<string> {
  const scrypt = promisify(_scrypt);
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  const result = salt + '.' + hash.toString('hex');
  return result;
}
