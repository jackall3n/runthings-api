import { Activity } from "../mongo/models";

class ActivityRepository {
  async getAll() {
    return Activity.find({});
  }
}

export { ActivityRepository };
