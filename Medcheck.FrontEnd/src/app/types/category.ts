import { BaseEntity } from './entity';
export interface CategoryResponse extends BaseEntity {
  id: number;
  title: string;
  description: string;
}

export interface CategoryRequest {
  title: string;
  description: string;
}
