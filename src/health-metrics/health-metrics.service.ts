import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthMetricRecord } from './schemas/health-metric-record.schema';
import { CreateHealthMetricRecordDto } from './dto/create-health-metric-record.dto';
import { UpdateHealthMetricRecordDto } from './dto/update-health-metric-record.dto';

@Injectable()
export class HealthMetricsService {
  constructor(
    @InjectModel(HealthMetricRecord.name)
    private readonly healthMetricRecordModel: Model<HealthMetricRecord>,
  ) {}

  async create(
    createDto: CreateHealthMetricRecordDto,
    userId: string,
  ): Promise<HealthMetricRecord> {
    const createdRecord = new this.healthMetricRecordModel({
      ...createDto,
      userId,
    });
    return await createdRecord.save();
  }

  async findById(id: string): Promise<HealthMetricRecord | null> {
    return this.healthMetricRecordModel.findById(id).exec();
  }

  async update(
    id: string,
    userId: string,
    updateDto: UpdateHealthMetricRecordDto,
  ): Promise<HealthMetricRecord> {
    // Tìm bản ghi và đảm bảo người dùng có quyền cập nhật
    const record = await this.healthMetricRecordModel.findOne({
      _id: id,
      userId,
    });

    if (!record) {
      throw new NotFoundException('Không tìm thấy bản ghi.');
    }

    // Kiểm tra xem nếu là loại 'calories', 'exercise' thì cho phép cập nhật các detail
    if (record.metricType !== 'calories') {
      // Nếu là calorie thì kiểm tra và cập nhật mealDetails
      if (updateDto.mealDetails) {
        throw new BadRequestException(
          `Meal details là bắt buộc với loại chỉ số calories, không phải của loại chỉ số ${record.metricType}`,
        );
      }
    }

    if (record.metricType !== 'exercise') {
      // Nếu là exercise thì kiểm tra và cập nhật exerciseDetails
      if (updateDto.exerciseDetails) {
        throw new BadRequestException(
          `Exercise details là bắt buộc với loại chỉ số exercise, không phải của loại chỉ số ${record.metricType}`,
        );
      }
    }

    // Cập nhật bản ghi và trả về bản ghi sau khi đã được cập nhật
    const updatedRecord = await this.healthMetricRecordModel.findOneAndUpdate(
      { _id: id, userId }, // Điều kiện tìm kiếm
      { $set: updateDto }, // Dữ liệu cập nhật
      { new: true }, // Trả về bản ghi sau khi cập nhật
    );

    if (!updatedRecord) {
      throw new NotFoundException('Không tìm thấy bản ghi.');
    }

    return updatedRecord;
  }

  async delete(id: string): Promise<any> {
    // Xoá record theo ID
    const result = await this.healthMetricRecordModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(
        `Health Metric Record with id ${id} not found`,
      );
    }
    return { message: 'Record deleted successfully' };
  }

  async findByUserIdAndDate(
    userId: string,
    date: Date,
  ): Promise<HealthMetricRecord[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0)); // Bắt đầu ngày
    const endOfDay = new Date(date.setHours(23, 59, 59, 999)); // Kết thúc ngày

    const records = await this.healthMetricRecordModel
      .find({
        userId: userId,
        date: { $gte: startOfDay, $lte: endOfDay }, // Lọc theo ngày
      })
      .exec();

    return records; // Trả về kết quả (có thể là mảng rỗng nếu không có record nào)
  }

  async findByUserIdAndMetricTypeAndDate(
    userId: string,
    metricType: string,
    date: Date,
  ): Promise<HealthMetricRecord[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0)); // Bắt đầu ngày
    const endOfDay = new Date(date.setHours(23, 59, 59, 999)); // Kết thúc ngày

    const records = await this.healthMetricRecordModel
      .find({
        userId: userId,
        metricType: metricType, // Lọc theo loại chỉ số sức khoẻ
        date: { $gte: startOfDay, $lte: endOfDay }, // Lọc theo ngày
      })
      .exec();

    return records; // Trả về kết quả (có thể là mảng rỗng nếu không có record nào)
  }

  async findAll(): Promise<HealthMetricRecord[]> {
    return await this.healthMetricRecordModel.find().exec();
  }

  async findByUserId(userId: string): Promise<HealthMetricRecord[]> {
    return await this.healthMetricRecordModel.find({ userId }).exec();
  }
}
