import { Pet } from "@/pets/infrastructure/typeorm/entities/pet.entity";
import { User } from "@/users/infrastructure/typeorm/entities/users.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";

@Entity("adoptions")
export class Adoption {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Pet, (pet) => pet.adoption, { eager: true })
  @JoinColumn({ name: "pet_id" })
  pet: Pet;

  @ManyToOne(() => User, (user) => user.adoptions)
  @JoinColumn({ name: "adopter_id" })
  adopter: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
