import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { MealType } from '../enums/meal-type.enum';

export class MealDetailsDto {
  @ApiProperty({ description: 'Loại bữa ăn', example: 'breakfast' })
  @IsEnum(MealType)
  @IsNotEmpty()
  mealType: MealType;

  @ApiProperty({ description: 'Tên món ăn', example: 'Sandwich' })
  @IsString()
  @IsNotEmpty()
  foodName: string;
}
