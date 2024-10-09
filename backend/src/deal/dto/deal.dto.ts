import { PartialType } from '@nestjs/mapped-types';

export class Deal {
  id: string;
  title: string;
  userId: string;
  status: string;
  description: string;
  date: Date;
}

export class EnrollDto {
  email: string;
  dealId: string;
  dealTitle: string;
  dealDescription: string;
}

export class DealDto extends Deal {}
export class UpdateDto extends PartialType(DealDto) {}
