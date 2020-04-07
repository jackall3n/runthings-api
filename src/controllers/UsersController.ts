import { Request, Response } from 'express';
import { GET } from "../decorators/get";
import { Controller } from "../decorators/controller";
import { UserRepository } from "../repositories";
import StravaAPIService from "../services/StravaAPIService";

@Controller('/users')
class UsersController {
  constructor(
    private userRepository = new UserRepository(),
    private stravaAPIService = new StravaAPIService()) {
  }

  @GET('/')
  async get(request: Request, response: Response) {
    try {
      const users = await this.userRepository.getAll();

      response.json(users.map(user => {
        const { _id, ...rest } = user.toJSON();

        return {
          id: _id,
          ...rest
        }
      }));
    } catch (e) {
      response.send(e.message);
    }
  }

  @GET('/resync/:id')
  async resync(request: Request, response: Response) {
    try {
      const activities = await this.stravaAPIService.getActivities(request.params.id);

      response.json(activities);
    } catch (e) {
      response.send(e);
    }
  }
}

export { UsersController };
