import { IsNotEmpty } from 'class-validator';
import { Ocurrence } from 'src/modules/reserve/dto/reserveDto';

export class CreateReserveClassroomDto {
  @IsNotEmpty()
  course: string;

  @IsNotEmpty()
  matter: string;

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

export class UpdateReserveClassroomDto {
  course?: string;

  matter?: string;

  date_Start?: string;

  date_End?: string;

  hr_Start?: string;

  hr_End?: string;
}
