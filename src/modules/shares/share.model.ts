import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { File, FileSchema } from 'src/modules/files/file.model';

@Schema({ versionKey: false })
export class Share extends Document {

  @Prop({ type: FileSchema, ref: File.name })
  photo: File & string;

  @Prop({ required: true })
  readonly displayName: string;

  @Prop({ required: true })
  readonly username: string;

  @Prop({ required: true })
  readonly email: string;

  @Prop({ required: true })
  readonly password: string;
}


export const ShareSchema = SchemaFactory.createForClass(Share)
  .set("toObject", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
    }
  })
  .set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
    }
  });

