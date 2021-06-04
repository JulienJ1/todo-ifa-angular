import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type TaskDocument = Task & Document

@Schema()
export class Task {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    state: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user?: User | Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export class TaskFilter {
    user: any;
    state?: number;
}
