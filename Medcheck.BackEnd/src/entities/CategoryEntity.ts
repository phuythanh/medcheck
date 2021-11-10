import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { ExpenseEntity } from "./ExpenseEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "Categories" })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    name: "user_id",
    nullable: true,
  })
  public userId: number;

  @ManyToOne((type) => UserEntity, (user) => user.categories)
  @JoinColumn({ name: "user_id" })
  public user?: UserEntity;

  @OneToMany((type) => ExpenseEntity, (category) => category.category)
  public expenses?: ExpenseEntity[];
}
