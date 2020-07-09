import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { File } from '../files/file.model';

@Schema({ versionKey: false })
export class User extends Document {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: File.name, default: null })
  photoFileId: MongooseSchema.Types.ObjectId;

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

