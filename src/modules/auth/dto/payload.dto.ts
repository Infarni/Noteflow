import { TokenEnum } from '../enums/token.enum';

export class PayloadDto {
  sub: string;
  type: TokenEnum;
  name: string;
}
