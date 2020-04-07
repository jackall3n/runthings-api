import { Event, IEvent } from "../mongo/models";

class EventRepository {
  async getAll() {
    const events = await Event.find({});


    return events.map(event => {
      const { _id, ...rest } = event.toJSON();

      return {
        id: _id,
        ...rest
      }
    })
  }

  async update(id: string, event: Partial<IEvent>) {
    return Event.findByIdAndUpdate(id, event);
  }

  async create(event: Partial<IEvent>) {
    const dbEvent = new Event(event);

    return await dbEvent.save()
  }
}

export { EventRepository };
