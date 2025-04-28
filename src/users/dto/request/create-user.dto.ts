import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/auth/role/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email của người dùng',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Vai trò của người dùng',
    example: 'user', // Ví dụ về vai trò người dùng
    enum: Role, // Enum cho phép lựa chọn các giá trị hợp lệ
  })
  @IsEnum(Role) // Kiểm tra rằng giá trị thuộc Role enum
  @IsNotEmpty()
  role: Role;

  @ApiProperty({
    description: 'Tên của người dùng',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Giới tính của người dùng',
    example: 'Nam',
    required: false,
  })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({
    description: 'Tuổi của người dùng',
    example: 25,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Chiều cao của người dùng (cm)',
    example: 170,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty({
    description: 'Cân nặng của người dùng (kg)',
    example: 70,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  weight?: number;
}
