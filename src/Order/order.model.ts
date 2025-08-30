import { OrderStatus } from 'shared/constants';
import { Cart } from 'src/Cart/cart.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
  @Column({ type: 'int' })
  subTotal: number;
  @Column({ type: 'smallint', default: 0 })
  shippingFee: number;
  @OneToOne(() => Cart, (cart) => cart.order, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Column('uuid')
  cartId: string;
  
}
