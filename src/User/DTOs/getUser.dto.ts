import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';
import { UserType } from 'shared/constants';

// Register the enum for GraphQL
registerEnumType(UserType, {
  name: 'UserType',
  description: 'The supported user types',
});

@ObjectType()
export class GetUserDto {
  @Field(() => ID, { description: 'User unique identifier'  , nullable:true})
  @Expose()
  id: string;

  @Field({ description: 'User username' , nullable:true})
  @Expose()
  username: string;

  @Field({ description: 'User email address' , nullable:true })
  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  email: string;

  @Field(() => UserType, { description: 'User type/role'  , nullable:true})
  @Expose()
  userType: UserType;

  @Field({ description: 'Whether the user is approved' , nullable:true })
  @Expose()
  isApproved: boolean;

  @Field({ description: 'User creation date' , nullable:true })
  @Expose()
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  createdAt: string;

  @Field({ description: 'User last update date', nullable:true })
  @Expose()
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  updatedAt: string;
}