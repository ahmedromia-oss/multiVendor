import { InputType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  
  IsPositive,
  Min,
  Max,
  IsInt,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => Float, { nullable: true })
  @IsPositive()
  @Transform(({ value }) => {
    return value !== undefined ? Math.round(Number(value) * 100) : value;
  })
  price: number;
  @Field(() => Number)
  @IsInt({message:"Must be not float"})
  @IsPositive()
  @Min(1)
  @Max(1000000)
  stockQuantity: number;
}
