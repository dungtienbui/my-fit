import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Delete,
  NotFoundException,
  ForbiddenException,
  Query,
  Put,
} from '@nestjs/common';
import { HealthMetricsService } from './health-metrics.service';
import { CreateHealthMetricRecordDto } from './dto/create-health-metric-record.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/roles.enum';
import { HealthMetricRecord } from './schemas/health-metric-record.schema';
import { UpdateHealthMetricRecordDto } from './dto/update-health-metric-record.dto';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

@Controller('health-metrics')
export class HealthMetricsController {
  constructor(private readonly healthMetricsService: HealthMetricsService) {}

  @UseGuards(JwtAuthGuard) // Dùng guard để xác thực người dùng
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Tạo mới một bản ghi chỉ số sức khỏe cho người dùng hiện tại (JWT)',
    description:
      'Thêm mới một bản ghi chỉ số sức khỏe cho người dùng. Tuỳ vào metricType mà value sẽ có đơn vị khác nhau. Trường mealDetails và exerciseDetails là optional, chỉ sử dụng khi metricType tương ứng là calories và exercise. Người dùng cần phải đăng nhập để thực hiện hành động này.',
  })
  @ApiResponse({
    status: 201,
    description: 'Chỉ số sức khỏe đã được thêm thành công.',
    type: HealthMetricRecord,
    examples: {
      example1: {
        summary: 'Bản ghi bước đi (steps)',
        value: {
          userId: '60d6f9f5f5b0a75b6c3b8e4e',
          metricType: 'steps',
          value: 5000,
          date: '2025-04-27T00:00:00Z',
        },
      },
      example2: {
        summary: 'Bản ghi calo (calories)',
        value: {
          userId: '60d6f9f5f5b0a75b6c3b8e4e',
          metricType: 'calories',
          value: 600,
          date: '2025-04-27T00:00:00Z',
          mealDetails: {
            mealType: 'breakfast',
            foodName: 'Sandwich',
          },
        },
      },
      example3: {
        summary: 'Bản ghi bài tập thể dục (exercise)',
        value: {
          userId: '60d6f9f5f5b0a75b6c3b8e4e',
          metricType: 'exercise',
          value: 45,
          date: '2025-04-27T00:00:00Z',
          exerciseDetails: {
            activityName: 'Running',
            duration: 30,
            notes: 'Morning jogging session',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ hoặc thiếu thông tin.',
  })
  @ApiResponse({
    status: 401,
    description: 'Không có quyền truy cập, vui lòng đăng nhập.',
  })
  @ApiBody({
    description: 'Dữ liệu chỉ số sức khỏe cần tạo',
    type: CreateHealthMetricRecordDto,
    examples: {
      example1: {
        summary: 'Bản ghi bước đi (steps)',
        value: {
          metricType: 'steps',
          value: 5000,
          date: '2025-04-27T00:00:00Z',
        },
      },
      example2: {
        summary: 'Bản ghi calo (calories) có mealDetails',
        value: {
          metricType: 'calories',
          value: 600,
          date: '2025-04-27T00:00:00Z',
          mealDetails: {
            mealType: 'breakfast',
            foodName: 'Sandwich',
          },
        },
      },
      example3: {
        summary: 'Bản ghi bài tập thể dục (exercise) có exerciseDetails',
        value: {
          metricType: 'exercise',
          value: 45,
          date: '2025-04-27T00:00:00Z',
          exerciseDetails: {
            activityName: 'Running',
            duration: 30,
            notes: 'Morning jogging session',
          },
        },
      },
    },
  })
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createDto: CreateHealthMetricRecordDto,
  ) {
    const userId = req.user.userId; // Lấy userId từ JWT
    return this.healthMetricsService.create(createDto, userId);
  }

  @UseGuards(JwtAuthGuard) // Dùng guard để xác thực người dùng
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lấy tất cả chỉ số sức khỏe của người dùng hiện tại (JWT)',
    description:
      'Lấy tất cả các chỉ số sức khỏe của người dùng. Người dùng cần phải đăng nhập để thực hiện hành động này.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Dữ liệu chỉ số sức khỏe của người dùng đã được lấy thành công.',
  })
  @ApiResponse({
    status: 401,
    description: 'Không có quyền truy cập, vui lòng đăng nhập.',
  })
  async findByUserId(@Request() req: AuthenticatedRequest) {
    const userId = req.user.userId; // Lấy userId từ JWT
    return await this.healthMetricsService.findByUserId(userId);
  }

  // Chỉnh sửa một record cụ thể
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cập nhật một bản ghi chỉ số sức khỏe theo record ID',
    description:
      'Chỉnh sửa thông tin của một bản ghi chỉ số sức khỏe dựa trên record ID. Người dùng cần phải đăng nhập.',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bản ghi thành công.',
    type: UpdateHealthMetricRecordDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ hoặc thiếu thông tin.',
  })
  @ApiResponse({
    status: 401,
    description: 'Không có quyền truy cập, vui lòng đăng nhập.',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bản ghi.',
  })
  @ApiBody({
    description: 'Dữ liệu cập nhật cho chỉ số sức khỏe',
    schema: {
      example: {
        value: 5500,
        date: '2025-04-27T00:00:00Z',
      },
    },
  })
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateDto: UpdateHealthMetricRecordDto,
  ): Promise<HealthMetricRecord> {
    const userId = req.user.userId; // Lấy userId từ token

    // Gọi service để thực hiện cập nhật bản ghi
    return this.healthMetricsService.update(id, userId, updateDto);
  }

  // Thêm API xoá record cụ thể
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xoá một record chỉ số sức khoẻ cụ thể' })
  @ApiResponse({ status: 200, description: 'Xoá thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy record' })
  @ApiResponse({
    status: 403,
    description: 'Bạn không có quyền xoá record này',
  })
  async delete(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.userId;

    const record = await this.healthMetricsService.findById(id);
    if (!record) {
      throw new NotFoundException(
        `Health Metric Record with id ${id} not found`,
      );
    }

    if (record.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this record',
      );
    }

    return await this.healthMetricsService.delete(id);
  }

  // API lấy record của user trong một ngày cụ thể
  @UseGuards(JwtAuthGuard)
  @Get('user/day')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lấy record chỉ số sức khoẻ của user trong một ngày cụ thể',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy dữ liệu thành công',
    type: [HealthMetricRecord],
    example: [
      {
        userId: '60d6f9f5f5b0a75b6c3b8e4e',
        metricType: 'steps',
        value: 5000,
        date: '2025-04-27T00:00:00Z',
      },
      {
        userId: '60d6f9f5f5b0a75b6c3b8e4e',
        metricType: 'calories',
        value: 600,
        date: '2025-04-27T00:00:00Z',
        mealDetails: {
          mealType: 'breakfast',
          foodName: 'Sandwich',
        },
      },
      {
        userId: '60d6f9f5f5b0a75b6c3b8e4e',
        metricType: 'exercise',
        value: 45,
        date: '2025-04-27T00:00:00Z',
        exerciseDetails: {
          activityName: 'Running',
          duration: 30,
          notes: 'Morning jogging session',
        },
      },
    ],
  })
  @ApiResponse({
    status: 200,
    description: 'Không tìm thấy record, trả về mảng rỗng',
    type: [Object],
  })
  async findByUserIdAndDate(
    @Request() req: any, // Lấy userId từ JWT
    @Query('date') date: string, // Ngày cần lọc, theo định dạng 'YYYY-MM-DD'
  ) {
    const userId = req.user.userId; // Lấy userId từ JWT

    // Kiểm tra và parse ngày
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new NotFoundException('Invalid date format. Use YYYY-MM-DD.');
    }

    // Lọc các record của user trong ngày đó
    return this.healthMetricsService.findByUserIdAndDate(userId, dateObj);
  }

  // API lấy tất cả các record của một loại chỉ số sức khoẻ trong một ngày cụ thể
  @UseGuards(JwtAuthGuard)
  @Get('user/metric-type/day')
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Lấy tất cả các record của một loại chỉ số sức khoẻ trong một ngày cụ thể của user',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy dữ liệu thành công',
    type: [HealthMetricRecord],
    example: [
      {
        userId: '60d6f9f5f5b0a75b6c3b8e4e',
        metricType: 'steps',
        value: 5000,
        date: '2025-04-27T00:00:00Z',
      },
      {
        userId: '60d6f9f5f5b0a75b6c3b8e4e',
        metricType: 'steps',
        value: 5000,
        date: '2025-04-27T00:00:00Z',
      },
      {
        userId: '60d6f9f5f5b0a75b6c3b8e4e',
        metricType: 'steps',
        value: 5000,
        date: '2025-04-27T00:00:00Z',
      },
    ],
  })
  @ApiResponse({
    status: 200,
    description: 'Không tìm thấy record, trả về mảng rỗng',
    type: [Object],
  })
  async findByUserIdAndMetricTypeAndDate(
    @Request() req: any, // Lấy userId từ JWT
    @Query('metricType') metricType: string, // Loại chỉ số sức khoẻ (ví dụ: 'weight', 'height', ...)
    @Query('date') date: string, // Ngày cần lọc, theo định dạng 'YYYY-MM-DD'
  ) {
    const userId = req.user.userId; // Lấy userId từ JWT

    // Kiểm tra và parse ngày
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new NotFoundException('Invalid date format. Use YYYY-MM-DD.');
    }

    // Lọc các record của user trong ngày đó và loại chỉ số sức khoẻ
    return this.healthMetricsService.findByUserIdAndMetricTypeAndDate(
      userId,
      metricType,
      dateObj,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // Kết hợp JwtAuthGuard và RolesGuard
  @Roles(Role.ADMIN) // Chỉ admin mới có quyền truy cập
  @Get('admin')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lấy tất cả chỉ số sức khỏe của người dùng (Admin only)',
    description: 'Chỉ admin mới có thể truy cập vào API này.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Dữ liệu chỉ số sức khỏe của tất cả người dùng đã được lấy thành công.',
    example: [
      {
        userId: '60d6f9f5f5b0a75b6c3b8e4e',
        metricType: 'steps',
        value: 5000,
        date: '2025-04-27T00:00:00Z',
      },
      {
        userId: '60d6f9f5f5b0a75b6c3b8e4e',
        metricType: 'calories',
        value: 600,
        date: '2025-04-27T00:00:00Z',
        mealDetails: {
          mealType: 'breakfast',
          foodName: 'Sandwich',
        },
      },
      {
        userId: '60d6f9f5f5b0a75b6c3b8e4e',
        metricType: 'exercise',
        value: 45,
        date: '2025-04-27T00:00:00Z',
        exerciseDetails: {
          activityName: 'Running',
          duration: 30,
          notes: 'Morning jogging session',
        },
      },
    ],
  })
  async findAll() {
    return await this.healthMetricsService.findAll();
  }
}
