import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: 'Email của người dùng',
    example: 'john.doe@example.com', // Cung cấp ví dụ
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'password123', // Cung cấp ví dụ
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Tên của người dùng',
    example: 'John Doe', // Cung cấp ví dụ
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Giới tính của người dùng',
    example: 'Nam', // Cung cấp ví dụ
    required: false, // Đảm bảo là optional
  })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({
    description: 'Tuổi của người dùng',
    example: 25, // Cung cấp ví dụ
    required: false, // Đảm bảo là optional
  })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Chiều cao của người dùng (cm)',
    example: 170, // Cung cấp ví dụ
    required: false, // Đảm bảo là optional
  })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty({
    description: 'Cân nặng của người dùng (kg)',
    example: 70, // Cung cấp ví dụ
    required: false, // Đảm bảo là optional
  })
  @IsNumber()
  @IsOptional()
  weight?: number;
}
