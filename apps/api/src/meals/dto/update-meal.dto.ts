import { CreateMealItemDto } from './create-meal.dto.js';

export class UpdateMealDto {
  date?: string;
  name?: string;
  isPlanned?: boolean;
  mealItems?: CreateMealItemDto[];
}
