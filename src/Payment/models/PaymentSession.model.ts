// src/payments/provider.entity.ts
import { ProviderType } from 'shared/constants';
import { Cart } from 'src/Cart/cart.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class PaymentSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @OneToOne(() => Cart, (cart) => cart.paymentSession, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Column({ type: 'uuid', unique: true })
  cartId: string;
  @Column({ type: 'enum', enum: ProviderType, default: ProviderType.STRIPE })
  paymentProvider: string;
}
