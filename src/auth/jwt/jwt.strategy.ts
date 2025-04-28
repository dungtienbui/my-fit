import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY || 'your_default_secret_key', // Thay bằng một key bảo mật mạnh mẽ hơn
    });
  }

  // Xác minh JWT Token
  async validate(payload: any) {
    return {
      userId: payload.userId, // map lại đúng tên
      email: payload.email,
      role: payload.role,
    };
  }
}
