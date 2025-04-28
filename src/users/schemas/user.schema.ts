// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/role/roles.enum';

@Schema({ timestamps: true }) // Tự động thêm createdAt và updatedAt
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false }) // Giới tính là trường tùy chọn
  gender?: string;

  @Prop({ required: false }) // Tuổi là trường tùy chọn
  age?: number;

  @Prop({ required: false }) // Chiều cao là trường tùy chọn
  height?: number;

  @Prop({ required: false }) // Cân nặng là trường tùy chọn
  weight?: number;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  role: Role; // Trường role dùng để phân quyền
}

export const UserSchema = SchemaFactory.createForClass(User);
