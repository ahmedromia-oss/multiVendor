import { ClientVendorFollow } from 'src/ClientVendorFollow/Follow.model';
import { Product } from 'src/Product/product.model';
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
export class Vendor {
  @PrimaryColumn('uuid')
  userId: string; // primary key & foreign key

  @OneToOne(() => User, { onDelete: 'CASCADE' , eager:true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', length: 100, nullable: true })
  storeName?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address?: string;
  @OneToMany(() => Product, (product) => product.vendor)
  products: Product[];

  @OneToMany(() => ClientVendorFollow, (follow) => follow.vendor)
  followers: ClientVendorFollow[];
}
