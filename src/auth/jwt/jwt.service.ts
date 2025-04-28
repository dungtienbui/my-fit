import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { AuthResponseDto } from '../dto/response/auth-response.dto';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async generateToken(user: User): Promise<AuthResponseDto> {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY || 'your_default_secret_key',
      }),
    };
  }
}
