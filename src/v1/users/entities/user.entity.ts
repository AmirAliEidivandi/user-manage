import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  id: false,
})
export class UserEntity extends Document {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: String })
  nationalCode: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
