import { Adoption } from "@/adoptions/infrastructure/typeorm/entities/adoption.entity";
import { User } from "@/users/infrastructure/typeorm/entities/users.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity("pets")
export class Pet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  color: string;

  @Column("simple-array")
  images: string[];

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => User, (owner) => owner.pets)
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @OneToOne(() => Adoption, (adoption) => adoption.pet)
  adoption: Adoption;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
