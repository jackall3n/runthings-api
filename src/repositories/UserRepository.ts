import { Event, IStravaSession, IUser, StravaSession, User } from "../mongo/models";

class UserRepository {

  async update(user: Partial<IUser>) {
    if (!user?.strava?.id) {
    }

    let dbUser = await User.findOneAndUpdate({ "strava.id": user.strava?.id }, user);
    if (!dbUser) {
      throw new Error('No user found')
    }

    return await dbUser.save();
  }

  async createSession(session: IStravaSession) {
    const dbSession = new StravaSession(session);
    return await dbSession.save();
  }

  async updateSession(session: IStravaSession) {
    let dbSession = await StravaSession.findOneAndUpdate({ strava_id: session.strava_id }, session);

    if (!dbSession) {
      return await this.createSession(session);
    }

    return await dbSession.save();
  }

  async getAll() {
    return User.find({}, 'name profile_picture activities events');
  }
}

export { UserRepository };
