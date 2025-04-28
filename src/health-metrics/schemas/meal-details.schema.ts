import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MealType } from '../enums/meal-type.enum'; // Ensure this is correctly imported
import { Document } from 'mongoose';

@Schema()
export class MealDetails extends Document {
  @Prop({ type: String, enum: MealType, required: true })
  mealType: MealType;

  @Prop({ required: true })
  foodName: string;
}

export const MealDetailsSchema = SchemaFactory.createForClass(MealDetails);
