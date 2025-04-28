import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Địa chỉ email của người dùng',
    example: 'john.doe@example.com', // Cung cấp ví dụ
  })
  @IsEmail({}, { message: 'Email không hợp lệ' }) // Kiểm tra email hợp lệ
  @IsNotEmpty({ message: 'Email không được để trống' }) // Kiểm tra không được trống
  email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'password123', // Cung cấp ví dụ
  })
  @IsString({ message: 'Mật khẩu phải là một chuỗi' }) // Kiểm tra mật khẩu là chuỗi
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' }) // Kiểm tra không được trống
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }) // Kiểm tra độ dài tối thiểu của mật khẩu
  password: string;
}
