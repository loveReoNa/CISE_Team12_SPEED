import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Evidence extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  abstract: string;

  @Prop({ required: true })
  publicationYear: number;

  @Prop([String])
  keywords: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  uploadedBy: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const EvidenceSchema = SchemaFactory.createForClass(Evidence);