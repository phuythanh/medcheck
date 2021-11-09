import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
// import uuid from 'uuid';

import { Category } from '../entity/Category';
import { User } from '../entity/User';
import { CategoryRepository } from '../repositories/CategoryRepository';

@Service()
export class CategoryService {

    constructor(
        @InjectRepository() 
        private CategoryRepository: CategoryRepository,
    ) { }

    public find(): Promise<Category[]> {
        return this.CategoryRepository.find();
    }

    public findByUser(user: User): Promise<Category[]> {
        return this.CategoryRepository.find({
            where: {
                userId: user.id,
            },
        });
    }

    public findOne(id: number): Promise<Category | undefined> {
        return this.CategoryRepository.findOne({ id });
    }

    public async create(category: Category): Promise<Category> {
        // category.id = uuid.v1();
        const newCategory = await this.CategoryRepository.save(category);
        return newCategory;
    }

    public update(id: number, category: Category): Promise<Category> {
        category.id = id;
        return this.CategoryRepository.save(category);
    }

    public async delete(id: number): Promise<void> {
        await this.CategoryRepository.delete(id);
        return;
    }

}
