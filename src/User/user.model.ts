import { UserType } from 'shared/constants';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column( {type:'varchar' ,  length: 100 })
  username: string;

  @Column({type:'varchar' , unique: true })
  email: string;

  @Column({type:'varchar' , length:81})
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.CLIENT,
  })
  userType: UserType;

  @Column({type:'bool', default: false })
  isApproved: boolean;

  @CreateDateColumn({type:'timestamptz'})
  createdAt: Date;

  @UpdateDateColumn({type:'timestamptz'})
  updatedAt: Date;
}
