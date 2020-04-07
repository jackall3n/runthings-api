import { Request, Response } from 'express';
import { Controller, GET, POST, PUT } from "../decorators";
import { EventRepository } from "../repositories";

@Controller('/events')
class EventsController {
  constructor(
    private eventRepository = new EventRepository()) {
  }

  @GET('/')
  async get(request: Request, response: Response) {
    try {
      const events = await this.eventRepository.getAll();

      response.json(events);

    } catch (e) {
      response.send(e.message);
    }
  }

  @POST('/')
  async create(request: Request, response: Response) {
    try {
      const { description, start, end, types, variants } = request.body;

      const event = await this.eventRepository.create({
        description,
        duration: {
          start,
          end,
        },
        activity_types: types,
        variants
      });

      response.json(event);

    } catch (e) {
      response.send(e.message);
    }
  }

  @PUT('/:id')
  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { description, start, end, types, variants } = request.body;

      const event = await this.eventRepository.update(id, {
        description,
        duration: {
          start,
          end,
        },
        activity_types: types,
        variants
      });

      response.json(event);
    } catch (e) {
      response.send(e.message);
    }
  }
}

export { EventsController };
