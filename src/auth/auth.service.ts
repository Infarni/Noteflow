import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;

  constructor(private readonly userService: UserService) {}
}
