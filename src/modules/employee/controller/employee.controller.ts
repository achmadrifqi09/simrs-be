import { Controller } from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
}
