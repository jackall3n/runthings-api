import { Request, Response } from 'express';
import { Controller, GET } from "../decorators";
import { ActivityRepository } from "../repositories";

@Controller('/activities')
class ActivitiesController {
  constructor(
    private activityRepository = new ActivityRepository()) {
  }

  @GET('/')
  async get(request: Request, response: Response) {
    try {
      const activities = await this.activityRepository.getAll();

      response.json(activities);

    } catch (e) {
      response.send(e.message);
    }
  }
}

export { ActivitiesController };
