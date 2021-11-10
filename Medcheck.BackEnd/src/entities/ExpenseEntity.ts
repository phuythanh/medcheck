import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryEntity } from "./CategoryEntity";
import { UserEntity } from "./UserEntity";

@Entity({name:"Expenses"})
export class ExpenseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  value: number;

  @Column({
    name: "user_id",
    nullable: true,
  })
  public userId: number;

  @Column({
    name: "category_id",
    nullable: true,
  })
  public categoryId: number;

  @ManyToOne((type) => UserEntity, (user) => user.categories)
  @JoinColumn({ name: "user_id" })
  public user?: UserEntity;

  @ManyToOne((type) => CategoryEntity, (category) => category.expenses)
  @JoinColumn({ name: "category_id" })
  public category?: CategoryEntity;
}
