import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Category } from "./Category";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(type => Category, c => c.user)
    public Categories: Category[];

}
