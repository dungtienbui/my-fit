import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/request/login.dto';
import { RegisterUserDto } from './dto/request/register-user.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';
import { RegisterAdminDto } from './dto/request/register-admin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Đăng ký tài khoản
  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới và nhận JWT token' })
  @ApiResponse({
    status: 201,
    description: 'Đăng ký thành công',
    type: String,
  })
  @ApiResponse({
    status: 409,
    description: 'Email đã tồn tại',
  })
  async register(
    @Body() registerDto: RegisterUserDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  // Đăng nhập và lấy token
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập và lấy JWT token' })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'Thông tin đăng nhập không chính xác',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  // API tạo người dùng với vai trò admin
  @Post('register-admin')
  @ApiOperation({ summary: 'Tạo tài khoản người dùng với vai trò admin' })
  @ApiResponse({
    status: 201,
    description: 'Tạo người dùng admin thành công',
    type: RegisterAdminDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Email đã tồn tại',
  })
  async registerAdmin(
    @Body() registerDto: RegisterAdminDto,
  ): Promise<AuthResponseDto> {
    // Gọi service để tạo user và gán role admin
    return this.authService.register(registerDto, true);
  }
}
