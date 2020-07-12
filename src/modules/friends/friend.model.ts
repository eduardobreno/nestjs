import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/modules/users/user.model';

export enum FriendshipStatus {
  PENDING,
  ACCEPTED,
  REFUSED,
  BLOCKED
}

@Schema({ versionKey: false })
export class Friend extends Document {
  @Prop({ required: true, ref: User.name })
  readonly userId: Types.ObjectId;
  @Prop({ required: true, ref: User.name })
  readonly friendId: Types.ObjectId;
  @Prop({ default: FriendshipStatus.PENDING })
  readonly status: FriendshipStatus;
  @Prop({ default: Date.now })
  readonly createdAt: Date

}


export const FriendSchema = SchemaFactory.createForClass(Friend)
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

