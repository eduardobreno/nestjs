import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { File, FileSchema } from 'src/modules/files/file.model';

@Schema({ versionKey: false })
export class Share extends Document {
  @Prop({ required: true })
  readonly from: Types.ObjectId;
  @Prop({ required: true })
  readonly to: Types.ObjectId;
  @Prop({ type: FileSchema, ref: File.name, required: true })
  file: File & string;
  @Prop({ default: Date.now })
  readonly createdAt: Date
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

