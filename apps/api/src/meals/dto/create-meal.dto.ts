import { Measure } from '@prisma/client';

export class CreateMealDto {
  date!: string;
  name!: string;
  isPlanned!: boolean;
  mealItems!: CreateMealItemDto[];
}

export class CreateMealItemDto {
  productId?: string;
  dish?: CreateDishDto;
  quantity!: number;
  measure!: Measure;
}

export class CreateDishDto {
  name!: string;
  items!: CreateDishItemDto[];
}

export class CreateDishItemDto {
  productId!: string;
  quantity!: number;
  measure!: Measure;
}
