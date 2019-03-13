
import { Request, Response } from "express";
import Sql from "@lt/sources/Sql";
import Res from "@util/http/responses";

import Restaurant from "@lt/models/Restaurant";
import Generator from "@util/Generator";

class Restaurants
{
  private sql: Sql;

  constructor(p: { sql: Sql })
  {
    this.sql = p.sql;
  }

  async getDetails(req: Request, res: Response)
  {
    const id = req.params.id;
    const result = await this.sql.getRestaurantDetails(id);
    return Res.sendModel(res, result);
  }

  async save(req: Request, res: Response)
  {
    const { namelocation } = req.body;
    const result = await this.sql.saveRestaurant({}); // TODO CHECK ARGS
    /* (suggestion)
    const result = await this.sql.saveRestaurant({
      namelocation: namelocation
    });
    */
    return Res.sendModel(res, result);
  }

  async update(req: Request, res: Response)
  {
    const id = req.params.id;
    const { namelocation } = req.body;
    const result = await this.sql.setRestaurant(id, {}) //TODO CHECK ARGS
    /* (suggestion)
    const result = await this.sql.setRestaurant(id, {
      namelocation: namelocation
    });
    */
    return Res.sendModel(res, result);
  }

  async delete(req: Request, res: Response)
  {
    const id = req.params.id;
    await this.sql.deleteRestaurant(id);
    return Res.sendOk(res);
  }
}

export default Restaurants;
