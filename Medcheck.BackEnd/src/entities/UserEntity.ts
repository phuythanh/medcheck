import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CategoryEntity } from "./CategoryEntity";
import { ExpenseEntity } from "./ExpenseEntity";

@Entity("Users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @Column()
  public email: string;

  @IsNotEmpty()
  @Column()
  @Exclude()
  public password: string;

  @OneToMany((type) => CategoryEntity, (c) => c.user)
  public categories: CategoryEntity[];

  @OneToMany((type) => ExpenseEntity, (c) => c.user)
  public expenses: ExpenseEntity[];
}
