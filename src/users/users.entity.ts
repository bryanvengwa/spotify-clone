import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
