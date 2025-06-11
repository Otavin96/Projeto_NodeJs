import { Column } from "typeorm";

export class Address {
  @Column()
  street: string;

  @Column()
  numberHouse: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
