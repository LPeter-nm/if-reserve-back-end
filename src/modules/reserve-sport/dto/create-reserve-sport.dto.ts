import { IsNotEmpty } from 'class-validator';
import { Ocurrence, Type_Practice } from 'src/modules/reserve/dto/reserveDto';

export class CreateReserveSportDto {
  @IsNotEmpty()
  type_Practice: Type_Practice;

  @IsNotEmpty()
  number_People: string;

  @IsNotEmpty()
  description_People: string;

  request_Equipment?: string;

  @IsNotEmpty()
  ocurrence: Ocurrence;

  @IsNotEmpty()
  date_Start: string;

  @IsNotEmpty()
  date_End: string;

  @IsNotEmpty()
  hr_Start: string;

  @IsNotEmpty()
  hr_End: string;

  @IsNotEmpty()
  reserveId: string;
}

export class UpdateReserveSportDto {
  type_Practice?: Type_Practice;

  number_People?: string;

  description_People?: string;

  request_Equipment?: string;

  ocurrence?: Ocurrence;

  date_Start?: string;

  date_End?: string;

  hr_Start?: string;

  hr_End?: string;
}
