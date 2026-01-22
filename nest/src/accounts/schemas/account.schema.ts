import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true, trim: true, unique: true })
  userName: string;

  @Prop({ required: true, trim: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  state: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
