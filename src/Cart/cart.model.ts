import { CartStatus } from 'shared/constants';
import { CartItem } from 'src/CartItem/CartItem.model';
import { Client } from 'src/Client/client.model';
import { Order } from 'src/Order/order.model';
import { PaymentSession } from 'src/Payment/models/PaymentSession.model';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
  OneToOne,
} from 'typeorm';

@Entity()
export class Cart {
  @OneToOne(() => PaymentSession, (paymentSession) => paymentSession.cart, {
    cascade: true,
    nullable: true,
  })
  paymentSession: PaymentSession;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column('uuid')
  clientId: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  items: CartItem[];

  @Column({
    type: 'enum',
    enum: CartStatus,
    default: CartStatus.ACTIVE,
  })
  status: CartStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  get totalAmount(): number {
    return this.items?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;
  }
  @OneToOne(() => Order, (order) => order.cart, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
