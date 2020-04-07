import { Request, Response } from 'express';
import { Controller, GET, POST, PUT } from "../decorators";
import { TeamRepository } from "../repositories";

@Controller('/teams')
class TeamsController {
  constructor(
    private teamRepository = new TeamRepository()) {
  }

  @GET('/')
  async get(request: Request, response: Response) {
    try {
      const teams = await this.teamRepository.getAll();

      response.json(teams.map(team => {
        const { _id: id, ...rest } = team.toJSON();

        return {
          id, ...rest
        }
      }));

    } catch (e) {
      response.send(e.message);
    }
  }

  @POST('/')
  async create(request: Request, response: Response) {
    try {
      const { name, members } = request.body;

      const team = await this.teamRepository.create({
        name,
        members
      });

      response.json(team);

    } catch (e) {
      response.send(e.message);
    }
  }

  @PUT('/:id')
  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, members } = request.body;

      const team = await this.teamRepository.update(id, {
        name,
        members
      });

      response.json(team);
    } catch (e) {
      response.send(e.message);
    }
  }
}

export { TeamsController };
