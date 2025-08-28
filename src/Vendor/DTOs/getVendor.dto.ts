import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, Length, IsUUID } from 'class-validator';
import { GetUserDto } from 'src/User/DTOs/getUser.dto';

@ObjectType()
export class GetVendorDto {
  @Field(() => GetUserDto)
  @Expose()
  @Type(()=>GetUserDto)
  user: GetUserDto;

  @Field({ nullable: true })
  @Expose()
  storeName?: string;

  @Field({ nullable: true })
  @Expose()
  description?: string;

  @Field({ nullable: true })
  @Expose()
  phone?: string;

  @Field({ nullable: true })
  @Expose()
  address?: string;
}
