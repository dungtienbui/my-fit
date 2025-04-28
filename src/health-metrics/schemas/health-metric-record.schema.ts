import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { MetricType } from '../enums/metric-type.enum';
import { ExerciseDetails } from './exercise-details.schema';
import { MealDetails } from './meal-details.schema';
import { Validate } from 'class-validator';
import { MetricDetailsValidator } from '../validators/MetricDetailsValidator';

@Schema()
export class HealthMetricRecord extends Document {
  @Prop({ required: true })
  userId: string; // ID của người dùng

  @Prop({
    type: String,
    enum: MetricType,
    required: true,
  })
  metricType: MetricType; // Loại chỉ số sức khỏe (steps, calories, water, etc.)

  @Prop({ required: true })
  value: number; // Giá trị của chỉ số

  @Prop({ required: true })
  date: Date; // Ngày ghi nhận chỉ số

  @Prop({ required: false })
  mealDetails?: MealDetails;

  @Prop({ required: false })
  exerciseDetails?: ExerciseDetails;
}

export const HealthMetricRecordSchema =
  SchemaFactory.createForClass(HealthMetricRecord);
