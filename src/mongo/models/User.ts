import { Document, model, Schema } from 'mongoose';
import { IEvent, IStravaSessionSchema } from "./";
import { IActivity } from "./Activity";

export interface IUser<S = IStravaSessionSchema['_id']> {
  name: {
    first: string;
    last: string;
  }
  address: {
    city: string,
    state: string,
    country: string
  },
  sex: string,
  profile_picture: string,
  activities: Array<IActivity['_id']>,
  strava: {
    id: number,
    session: S
  },
  event: Array<IEvent['_id']>
}

export interface IUserSchema<S = IStravaSessionSchema['_id']> extends Document, IUser<S> {
}

const UserSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  address: {
    city: String,
    state: String,
    country: String
  },
  sex: String,
  profile_picture: String,
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  strava: {
    id: Number,
    session: {
      type: Schema.Types.ObjectId,
      ref: 'StravaSession'
    }
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }]
});

export const User = model<IUserSchema>('User', UserSchema);
