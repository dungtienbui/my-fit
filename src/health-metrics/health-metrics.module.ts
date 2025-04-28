import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthMetricsController } from './health-metrics.controller';
import { HealthMetricsService } from './health-metrics.service';
import {
  HealthMetricRecord,
  HealthMetricRecordSchema,
} from './schemas/health-metric-record.schema';
import { MealDetails, MealDetailsSchema } from './schemas/meal-details.schema';
import {
  ExerciseDetails,
  ExerciseDetailsSchema,
} from './schemas/exercise-details.schema';
import { MetricDetailsValidator } from './validators/MetricDetailsValidator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HealthMetricRecord.name, schema: HealthMetricRecordSchema },
      { name: MealDetails.name, schema: MealDetailsSchema },
      { name: ExerciseDetails.name, schema: ExerciseDetailsSchema },
    ]),
  ],
  controllers: [HealthMetricsController],
  providers: [HealthMetricsService, MetricDetailsValidator],
  exports: [HealthMetricsService],
})
export class HealthMetricsModule {}
