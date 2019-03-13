
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
  async getList(req: Request, res: Response)
  {
    const { restaurant_id } = req.query;
    
    
    const result = await this.sql.getRestaurantList({
      restaurantId: restaurant_id
    });
    
    return Res.sendList(res, result);
  }

  async getDetails(req: Request, res: Response)
  {
    const id = req.params.id;
    const result = await this.sql.getRestaurantDetails(id);
    return Res.sendModel(res, result);
  }

  async save(req: Request, res: Response)
  {
    const { name,location } = req.body;
    
    
    const result = await this.sql.saveRestaurant({
      name: name, location: location
    });
    
    return Res.sendModel(res, result);
  }

  async update(req: Request, res: Response)
  {
    const id = req.params.id;
    const { name, location } = req.body;
   
    const result = await this.sql.setRestaurant(id, {
      name: name, location: location
    });
    
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
