import { ClassConstructor, plainToInstance } from 'class-transformer';

export function mapInstance<C, P>(cls: ClassConstructor<C>, plain: P): C;
export function mapInstance<C, P>(cls: ClassConstructor<C>, plain: P[]): C[];

export function mapInstance<C, P>(
  cls: ClassConstructor<C>,
  plain: P | P[],
): C | C[] {
  return plainToInstance(cls, plain, { excludeExtraneousValues: true });
}
