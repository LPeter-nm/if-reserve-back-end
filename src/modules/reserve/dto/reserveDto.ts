import { IsNotEmpty } from 'class-validator';

export enum Type_Reserve {
  OFICIO = 'OFICIO',
  EVENTO = 'EVENTO',
  AULA = 'AULA',
}

export enum Ocurrence {
  EVENTO_UNICO = 'EVENTO_UNICO',
  SEMANALMENTE = 'SEMANALMENTE',
}

export enum Type_Practice {
  TREINO = 'TREINO',
  RECREACAO = 'RECREACAO',
  AMISTOSO = 'AMISTOSO',
}

export class CreateReserveDto {
  type_Reserve: Type_Reserve;

  @IsNotEmpty()
  userId: string;
}
