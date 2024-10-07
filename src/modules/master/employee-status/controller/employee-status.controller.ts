import { Controller } from '@nestjs/common';
import { EmployeeStatusService } from '../service/employee-status.service';

@Controller('employee-status')
export class EmployeeStatusController {
  constructor(private readonly employeeStatusService: EmployeeStatusService) {}
}
