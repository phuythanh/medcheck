import { EntityRepository, Repository } from 'typeorm';

import { CategoryEntity } from '../entities/CategoryEntity';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {

}
