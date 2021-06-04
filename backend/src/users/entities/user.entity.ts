import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Task } from '../../tasks/entities/task.entity';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    name?: string;

    @Prop()
    password?: string;

    @Prop()
    email: string;

    token?: string;
    _doc?: any;
    _id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
