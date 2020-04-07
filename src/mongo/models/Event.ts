import { Document, model, Schema } from 'mongoose';
import { IUserSchema } from "./User";

export interface IEvent extends Document {
  description: string;
  duration: {
    start: string;
    end: string;
  }
  activity_types: string[];
  participants: IUserSchema['_id'][];
  variants: { distance: number, description: string };
}

const EventSchema = new Schema({
  description: String,
  duration: {
    start: String,
    end: String
  },
  activity_types: [{
    type: String
  }],
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  variants: [{
    distance: Number,
    description: String
  }]
});

export const Event = model<IEvent>('Event', EventSchema);
