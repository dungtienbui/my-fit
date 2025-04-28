import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDateString,
  Validate,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MetricType } from '../enums/metric-type.enum';
import { MetricDetailsValidator } from '../validators/MetricDetailsValidator'; // Import lớp validator của bạn
import { MealDetailsDto } from './meal-details.dto';
import { ExerciseDetailsDto } from './exercise-details.dto';

export class CreateHealthMetricRecordDto {
  @ApiProperty({
    description:
      'Loại chỉ số sức khỏe (steps, calories, water, exercise, weight, height, sleep)',
    enum: MetricType,
    example: 'steps',
  })
  @IsEnum(MetricType)
  @IsNotEmpty()
  @Validate(MetricDetailsValidator)
  metricType: string;

  @ApiProperty({
    description:
      'Giá trị của chỉ số sức khỏe, có thể là số bước, calo, lượng nước, thời gian ngủ, khoảng cách di chuyển, v.v.',
    example: 5000,
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    description: 'Ngày ghi nhận chỉ số (ISO 8601 format)',
    example: '2023-04-25T10:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Thông tin về bữa ăn, chỉ áp dụng cho "calories"',
    required: false,
    type: MealDetailsDto, // Dùng DTO thay vì schema của Mongoose
  })
  @ValidateNested()
  @Type(() => MealDetailsDto)
  mealDetails?: MealDetailsDto;

  @ApiProperty({
    description: 'Thông tin về hoạt động thể dục, chỉ áp dụng cho "exercise"',
    required: false,
    type: ExerciseDetailsDto, // Dùng DTO thay vì schema của Mongoose
  })
  @ValidateNested()
  @Type(() => ExerciseDetailsDto)
  exerciseDetails?: ExerciseDetailsDto;
}
