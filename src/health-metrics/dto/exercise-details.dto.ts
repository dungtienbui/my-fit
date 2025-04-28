import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ExerciseDetailsDto {
  @ApiProperty({ description: 'Tên hoạt động thể dục', example: 'Running' })
  @IsString()
  @IsNotEmpty()
  activityName: string;

  @ApiProperty({ description: 'Thời gian tập luyện (phút)', example: 30 })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    description: 'Ghi chú về hoạt động',
    example: 'Morning session',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
