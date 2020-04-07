import axios from "axios";
import env from '../constants/env';
import { IStravaSessionSchema, IUserSchema, User } from "../mongo/models";
import { stringify } from 'query-string';

class StravaAPIService {
  async client(user: IUserSchema<IStravaSessionSchema>) {
    let { session } = user.strava;

    if (!session) {
      console.log('No session found for strava user');
    }

    const { expires_at } = session;

    console.log(session);

    if (expires_at < Math.round(new Date().getTime() / 1000)) {
      console.log('expired');
      session = await this.refreshSessionToken(session);
      console.log(session);
    }

    return axios.create({
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });
  }

  async refreshSessionToken(session: IStravaSessionSchema): Promise<IStravaSessionSchema> {
    if (!session) {
      throw new Error('No session found for strava user');
    }

    const { refresh_token } = session;

    const query = stringify({
      client_id: env.strava_client_id,
      client_secret: env.strava_client_secret,
      grant_type: 'refresh_token',
      refresh_token
    });

    const response = await axios.post(`${env.strava_url}/api/v3/oauth/token?${query}`);

    await session.update(response.data);

    return session
  }

  async getActivities(id: string) {
    try {
      const user = await User.findById(id).populate('strava.session').exec();

      console.log(user);
      if (!user) {
        throw new Error('No user found')
      }

      const client = await this.client(user);

      let activities: any[] = [];
      let lastBulk;
      let page = 1;

      do {
        console.log('fetching..., got:', activities.length);
        const response = await client.get<any>(`${env.strava_url}/api/v3/athlete/activities?per_page=${100}&page=${page}`);
        lastBulk = response.data;
        activities.push(...lastBulk);
        page++;
      }
      while (lastBulk.length === 100);

      console.log('here');
      return activities;
    } catch (e) {
      console.log(e);
    }
  }
}

export default StravaAPIService;
