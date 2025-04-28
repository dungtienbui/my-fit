import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional() // Trường này là tùy chọn
  @IsString()  // Kiểm tra là chuỗi
  @ApiProperty({
    description: 'Tên của người dùng. Trường này là tùy chọn và có thể bỏ qua nếu không muốn thay đổi.',
    example: 'John Doe', // Ví dụ giá trị
    required: false, // Đánh dấu rằng trường này không phải là bắt buộc
  })
  name?: string;

  @IsOptional() // Trường này là tùy chọn
  @IsString()  // Kiểm tra là chuỗi
  @ApiProperty({
    description: 'Giới tính của người dùng. Trường này là tùy chọn và có thể bỏ qua nếu không muốn thay đổi.',
    example: 'Nam', // Ví dụ giá trị
    required: false, // Đánh dấu rằng trường này không phải là bắt buộc
  })
  gender?: string;

  @IsOptional() // Trường này là tùy chọn
  @IsNumber()  // Kiểm tra là số
  @ApiProperty({
    description: 'Tuổi của người dùng. Trường này là tùy chọn và có thể bỏ qua nếu không muốn thay đổi.',
    example: 25, // Ví dụ giá trị
    required: false, // Đánh dấu rằng trường này không phải là bắt buộc
  })
  age?: number;

  @IsOptional() // Trường này là tùy chọn
  @IsNumber()  // Kiểm tra là số
  @ApiProperty({
    description: 'Chiều cao của người dùng tính bằng cm. Trường này là tùy chọn và có thể bỏ qua nếu không muốn thay đổi.',
    example: 175, // Ví dụ giá trị
    required: false, // Đánh dấu rằng trường này không phải là bắt buộc
  })
  height?: number;

  @IsOptional() // Trường này là tùy chọn
  @IsNumber()  // Kiểm tra là số
  @ApiProperty({
    description: 'Cân nặng của người dùng tính bằng kg. Trường này là tùy chọn và có thể bỏ qua nếu không muốn thay đổi.',
    example: 70, // Ví dụ giá trị
    required: false, // Đánh dấu rằng trường này không phải là bắt buộc
  })
  weight?: number;
}
