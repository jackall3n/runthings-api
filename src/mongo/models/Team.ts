import { Document, model, Schema } from 'mongoose';

export interface ITeamMember {
  user: string;
  is_admin: boolean;
}

export interface ITeam {
  name: string;
  members: ITeamMember[]
}

export interface ITeamSchema extends Document, ITeam {
}

const TeamSchema = new Schema({
  name: String,
  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    is_admin: Boolean
  }]
});

export const Team = model<ITeamSchema>('Team', TeamSchema);
