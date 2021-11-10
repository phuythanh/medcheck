import { EntityRepository, Repository } from 'typeorm';

import { ExpenseEntity } from '../entities/ExpenseEntity';

@EntityRepository(ExpenseEntity)
export class ExpenseRepository extends Repository<ExpenseEntity> {

}
