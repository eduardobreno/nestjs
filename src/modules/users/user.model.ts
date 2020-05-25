import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail, IsOptional, ValidateIf, } from 'class-validator';


export class UserPayload {
  @ApiProperty()
  readonly id?: string;

  @ApiProperty()
  readonly photo: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly displayName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ required: true })
  @ValidateIf(o => (o.id === undefined)) // validates only when needs
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ required: true })
  @ValidateIf(o => (o.id === undefined || (o.id && o.password))) // validates only when needs
  @MinLength(8)
  readonly password: string;
}

@Schema({ versionKey: false })
export class User extends Document {

  @Prop({ default: null })
  readonly photo: string;

  @Prop({ required: true })
  readonly displayName: string;

  @Prop({ required: true })
  readonly username: string;

  @Prop({ required: true })
  readonly email: string;

  @Prop({ required: true })
  readonly password: string;
}


export const UserSchema = SchemaFactory.createForClass(User)
  .set("toObject", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password
    }
  })
  .set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password
    }
  });

