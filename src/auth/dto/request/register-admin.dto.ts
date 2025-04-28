import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class RegisterAdminDto {
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
}
