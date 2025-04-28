import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/roles.enum';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Lấy thông tin người dùng hiện tại
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin người dùng hiện tại (JWT)' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin người dùng',
    type: UserResponseDto,
  })
  async getUserInfo(
    @Request() req: AuthenticatedRequest,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findById(req.user.userId);

    // Chỉ map ra những field mình cho phép trả ra
    const { _id, email, name, gender, age, height, weight, role } =
      user.toObject();

    return { _id, email, name, gender, age, height, weight, role };
  }

  // Lấy tất cả thông tin người dùng (chỉ admin mới được phép)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN) // Chỉ admin mới có quyền truy cập
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lấy danh sách tất cả người dùng (chỉ cho Admin role)',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách tất cả người dùng',
    type: [UserResponseDto],
  })
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();

    return users.map((user) => {
      // Chỉ map ra những field mình cho phép trả ra
      const { _id, email, name, gender, age, height, weight, role } =
        user.toObject();
      return { _id, email, name, gender, age, height, weight, role };
    });
  }

  // Cập nhật thông tin người dùng (chỉ cho phép người dùng cập nhật chính họ)
  @UseGuards(JwtAuthGuard) // Bảo vệ route này
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng (JWT)' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin người dùng đã được cập nhật',
    type: UserResponseDto,
  })
  async updateUser(
    @Body() updateData: UpdateUserDto, // Lấy dữ liệu cập nhật từ body
    @Request() req: AuthenticatedRequest, // Lấy thông tin từ request (JWT)
  ): Promise<UserResponseDto> {
    const userId = req.user.userId; // Lấy id người dùng từ JWT (thông qua middleware)

    // Cập nhật thông tin người dùng
    const user = await this.userService.update(userId, updateData); // Cập nhật cho chính người dùng

    // Chỉ map ra những field mình cho phép trả ra
    const { _id, email, name, gender, age, height, weight, role } =
      user.toObject();

    return { _id, email, name, gender, age, height, weight, role };
  }
}
