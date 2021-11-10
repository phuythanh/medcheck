import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ExpenseEntity } from '../entities/ExpenseEntity';
import { UserEntity } from '../entities/UserEntity';
import { ExpenseRepository } from '../repositories/ExpenseRepository';

@Service()
export class ExpenseService {

    constructor(
        @InjectRepository() 
        private ExpenseRepository: ExpenseRepository,
    ) { }

    public find(): Promise<ExpenseEntity[]> {
        return this.ExpenseRepository.find();
    }

    public findByUser(user: UserEntity): Promise<ExpenseEntity[]> {
        return this.ExpenseRepository.find({
            where: {
                userId: user.id,
            },
            relations: ['category']
        });
    }

    public findOne(id: number): Promise<ExpenseEntity | undefined> {
        return this.ExpenseRepository.findOne({ id });
    }

    public async create(Expense: ExpenseEntity): Promise<ExpenseEntity> {
        // Expense.id = uuid.v1();
        const newExpense = await this.ExpenseRepository.save(Expense);
        return newExpense;
    }

    public update(id: number, Expense: ExpenseEntity): Promise<ExpenseEntity> {
        Expense.id = id;
        return this.ExpenseRepository.save(Expense);
    }

    public async delete(id: number): Promise<void> {
        await this.ExpenseRepository.delete(id);
        return;
    }

}
