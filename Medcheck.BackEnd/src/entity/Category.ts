import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Category {
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
  public userId: string;

  @ManyToOne((type) => User, (user) => user.Categories)
  @JoinColumn({ name: "user_id" })
  public user: User;
}
