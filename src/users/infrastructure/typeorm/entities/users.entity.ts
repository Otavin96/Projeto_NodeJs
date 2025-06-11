import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Address } from "./address.entity";
import { Pet } from "@/pets/infrastructure/typeorm/entities/pet.entity";
import { Adoption } from "@/adoptions/infrastructure/typeorm/entities/adoption.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column(() => Address)
  address: Address;

  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];

  @OneToMany(() => Adoption, (adoption) => adoption.adopter)
  adoptions: Adoption[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
