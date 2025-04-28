import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ExerciseDetails extends Document {
  @Prop({ required: true })
  activityName: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: false })
  notes?: string;
}

export const ExerciseDetailsSchema =
  SchemaFactory.createForClass(ExerciseDetails);
