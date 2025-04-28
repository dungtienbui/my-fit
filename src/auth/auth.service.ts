// auth.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/request/register-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { AuthResponseDto } from './dto/response/auth-response.dto';
import { Role } from './role/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Đăng ký tài khoản mới
  async register(
    createUserDto: RegisterUserDto,
    isAdminRole: boolean = false,
  ): Promise<AuthResponseDto> {
    // Kiểm tra nếu người dùng đã tồn tại
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Tạo user mới
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
      role: isAdminRole ? Role.ADMIN : Role.USER,
    });

    // Tạo và trả về JWT token
    return this.jwtService.generateToken(user);
  }

  // Đăng nhập
  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password incorrect');
    }

    return this.jwtService.generateToken(user);
  }
}
