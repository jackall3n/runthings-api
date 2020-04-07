import { ITeam, Team } from "../mongo/models";

class TeamRepository {
  async getAll() {
    return Team.find({});
  }

  async update(id: string, team: Partial<ITeam>) {
    return Team.findByIdAndUpdate(id, team);
  }

  async create(team: Partial<ITeam>) {
    const dbTeam = new Team(team);

    return await dbTeam.save()
  }
}

export { TeamRepository };
