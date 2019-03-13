
import { Request, Response } from "express";
import Sql from "@lt/sources/Sql";
import Res from "@util/http/responses";

import Dish from "@lt/models/Dish";
import Generator from "@util/Generator";

class Dishes
{
  private sql: Sql;

  constructor(p: { sql: Sql })
  {
    this.sql = p.sql;
  }

  async getList(req: Request, res: Response)
  {
    const { restaurant_id } = req.query;
    
    
    const result = await this.sql.getDishList({
      restaurantId: restaurant_id
    });
    
    return Res.sendList(res, result);
  }

  async save(req: Request, res: Response)
  {
    const { name, price, restaurant_id } = req.body;
   
    
    const result = await this.sql.saveDish({
      name: name, price: price, restaurantId: restaurant_id
    });
    
    return Res.sendModel(res, result);
  }

  async update(req: Request, res: Response)
  {
    const id = req.params.id;
    const { name, price, restaurant_id } = req.body;
   
    const result = await this.sql.setDish(id, {
      name: name, price: price, restaurantId: restaurant_id
    });
    
    return Res.sendModel(res, result);
  }

  async delete(req: Request, res: Response)
  {
    const id = req.params.id;
    await this.sql.deleteDish(id);
    return Res.sendOk(res);
  }
}

export default Dishes;
