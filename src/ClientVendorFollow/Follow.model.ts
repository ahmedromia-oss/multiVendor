import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
  Column,
} from 'typeorm';
import { Client } from 'src/Client/client.model';
import { Vendor } from 'src/Vendor/vendor.model';

@Entity('client_vendor_follows')
@Unique(['client', 'vendor']) // prevent duplicate follows
export class ClientVendorFollow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToOne(() => Vendor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vendorId' })
  vendor: Vendor;
  @Column({ type: 'uuid' })
  vendorId: string;

  @Column({ type: 'uuid' })
  clientId: string;

  @CreateDateColumn()
  createdAt: Date;
}
