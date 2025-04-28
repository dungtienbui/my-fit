import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
// import { MetricType } from '../enums/metric-type.enum';
import { MealDetailsDto } from './meal-details.dto';
import { ExerciseDetailsDto } from './exercise-details.dto';

export class UpdateHealthMetricRecordDto {
  @ApiPropertyOptional({
    description: 'Giá trị của chỉ số sức khỏe',
    example: 5000,
  })
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiPropertyOptional({
    description: 'Ngày ghi nhận chỉ số (ISO 8601)',
    example: '2023-04-25T10:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional({
    description: 'Thông tin bữa ăn (chỉ cho calories)',
    type: MealDetailsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MealDetailsDto)
  mealDetails?: MealDetailsDto;

  @ApiPropertyOptional({
    description: 'Thông tin tập luyện (chỉ cho exercise)',
    type: ExerciseDetailsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ExerciseDetailsDto)
  exerciseDetails?: ExerciseDetailsDto;
}
