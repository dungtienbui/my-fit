import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'ID của người dùng',
    example: '60d6f9f5f5b0a75b6c3b8e4e', // Ví dụ về một ID người dùng
  })
  _id: string;

  @ApiProperty({
    description: 'Email của người dùng',
    example: 'john.doe@example.com', // Ví dụ về email người dùng
  })
  email: string;

  @ApiProperty({
    description: 'Tên người dùng',
    example: 'John Doe', // Ví dụ về tên người dùng
  })
  name: string;

  @ApiProperty({
    description: 'Giới tính',
    example: 'Nam', // Ví dụ về giới tính người dùng
  })
  gender: string;

  @ApiProperty({
    description: 'Tuổi',
    example: 25, // Ví dụ về tuổi người dùng
  })
  age: number;

  @ApiProperty({
    description: 'Chiều cao (cm)',
    example: 175, // Ví dụ về chiều cao người dùng
  })
  height: number;

  @ApiProperty({
    description: 'Cân nặng (kg)',
    example: 70, // Ví dụ về cân nặng người dùng
  })
  weight: number;

  @ApiProperty({
    description: 'Vai trò của người dùng (ví dụ: admin, user)',
    example: 'user', // Ví dụ về vai trò người dùng
  })
  role: string; // Thêm trường 'role' cho người dùng
}
