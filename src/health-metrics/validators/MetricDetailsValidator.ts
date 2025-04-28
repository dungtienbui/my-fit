import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { CreateHealthMetricRecordDto } from '../dto/create-health-metric-record.dto'; // Đảm bảo import DTO đúng

@ValidatorConstraint({ async: false })
export class MetricDetailsValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    console.log('Validator is running...');
    console.log('Value:', value);
    console.log('Arguments:', args);

    // Truy cập vào đối tượng gốc từ args.object và khai báo kiểu là CreateHealthMetricRecordDto
    const object = args.object as CreateHealthMetricRecordDto; // Chỉ rõ kiểu của object

    const metricType = object.metricType; // Bây giờ TypeScript biết object có metricType

    // Kiểm tra loại chỉ số sức khỏe và yêu cầu chi tiết tương ứng
    if (metricType === 'calories') {
      console.log('Calories validation triggered');
      // Nếu metricType là 'calories', phải có mealDetails
      if (!object.mealDetails) {
        console.log('Meal details missing');
        return false; // Nếu không có mealDetails thì trả về false
      }
    } else if (metricType === 'exercise') {
      console.log('Exercise validation triggered');
      // Nếu metricType là 'exercise', phải có exerciseDetails
      if (!object.exerciseDetails) {
        console.log('Exercise details missing');
        return false; // Nếu không có exerciseDetails thì trả về false
      }
    } else {
      console.log('Other metricType validation triggered');
      if (object.exerciseDetails || object.mealDetails) {
        console.log('must not have detail');
        return false;
      }
    }

    // Nếu không phải 'calories' hoặc 'exercise', không cần kiểm tra chi tiết khác
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Thông tin chi tiết không hợp lệ với loại chỉ số metricType được chọn';
  }
}
