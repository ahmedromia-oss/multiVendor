import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class UpdateProductInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) =>
    value !== undefined ? Math.round(Number(value) * 100) : value,
  )
  price?: number;
}
