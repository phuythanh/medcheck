import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
// import uuid from 'uuid';

import { CategoryEntity } from '../entities/CategoryEntity';
import { UserEntity } from '../entities/UserEntity';
import { CategoryRepository } from '../repositories/CategoryRepository';

@Service()
export class CategoryService {

    constructor(
        @InjectRepository() 
        private CategoryRepository: CategoryRepository,
    ) { }

    public find(): Promise<CategoryEntity[]> {
        return this.CategoryRepository.find();
    }

    public findByUser(user: UserEntity): Promise<CategoryEntity[]> {
        return this.CategoryRepository.find({
            where: {
                userId: user.id,
            },
        });
    }

    public findOne(id: number): Promise<CategoryEntity | undefined> {
        return this.CategoryRepository.findOne({ id });
    }

    public async create(category: CategoryEntity): Promise<CategoryEntity> {
        // category.id = uuid.v1();
        const newCategory = await this.CategoryRepository.save(category);
        return newCategory;
    }

    public update(id: number, category: CategoryEntity): Promise<CategoryEntity> {
        category.id = id;
        return this.CategoryRepository.save(category);
    }

    public async delete(id: number): Promise<void> {
        await this.CategoryRepository.delete(id);
        return;
    }

}
