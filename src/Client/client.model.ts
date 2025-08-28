import { ClientVendorFollow } from 'src/ClientVendorFollow/Follow.model';
import { User } from 'src/User/user.model';
import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryColumn('uuid')
  userId: string; // PK + FK

  @OneToOne(() => User, { onDelete: 'CASCADE' , eager:true})
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  address?: string;
  @OneToMany(() => ClientVendorFollow, (follow) => follow.client)
  follows: ClientVendorFollow[];
}
