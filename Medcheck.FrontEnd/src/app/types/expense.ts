import { CategoryResponse } from './category';
import { BaseEntity } from './entity';
export interface ExpenseResponse extends BaseEntity {
  id: number;
  title: string;
  date: Date;
  value: number;
  userId: number;
  categoryId: number;
  category?: CategoryResponse;
}

export interface ExpenseRequest {
  title: string;
  value: number;
  categoryId: number;
}
