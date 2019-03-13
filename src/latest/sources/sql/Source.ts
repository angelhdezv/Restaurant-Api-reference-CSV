import Repository from "@lt/sources/Sql";
import { Pair } from "@util/Util";
import Restaurant from "@lt/models/Restaurant";
import Dish from "@lt/models/Dish";

import Generator from "@util/Generator";
import Executor from "@lt/sources/sql/Executor";
import * as Mapper from "@lt/sources/sql/Mappers";

class Source extends Executor implements Repository
{
  async getDishList(fs: {}): Promise<Dish[]>
  //(Suggestion) -> async getDishList(fs: { restaurantId? }): Promise<Dish[]> //CHECK ARGS TYPES
  {
    const query =
      `SELECT d.* FROM dish d`;
    const filter: Pair[] = [];
    //TODO ADD FILTERS
    /* (Suggestion)
    if (fs.restaurantId) filter.push(new Pair("d.restaurant_id", fs.restaurantId));
    */
    const res = await this.get(query, filter, new Mapper.DishMapper());
    //TODO CHECK FETCH
    return res; 
  }



  async getRestaurantDetails(restaurantId: number): Promise<Restaurant>
  {
    const query =
      `SELECT r.* FROM restaurant r WHERE r.restaurant_id = ?`;
    const params = [restaurantId];
    const res = await this.getDetails(query, params, new Mapper.RestaurantMapper());
    //TODO CHECK FETCH
    return res[0];
  }

  async getDishDetails(dishId: number): Promise<Dish>
  {
    const query =
      `SELECT d.* FROM dish d WHERE d.dish_id = ?`;
    const params = [dishId];
    const res = await this.getDetails(query, params, new Mapper.DishMapper());
    //TODO CHECK FETCH
    return res[0];
  }



  async saveRestaurant(args: {}): Promise<Restaurant>
  //(Suggestion) -> async saveRestaurant(args: { namelocation }): Promise<Restaurant> //CHECK ARGS TYPES
  {
    const restaurantId = Generator.getId();
    const query = "INSERT INTO restaurant";
    const attrs: Pair[] = [];
    attrs.push(new Pair("restaurant_id", restaurantId));
    //TODO ADD COLUMNS
    /* (Suggestion)
    attrs.push(new Pair("namelocation", args.namelocation));
    */
    await this.save(query, attrs);
    return this.getRestaurantDetails(restaurantId);
  }

  async saveDish(args: {}): Promise<Dish>
  //(Suggestion) -> async saveDish(args: { namepricerestaurantId }): Promise<Dish> //CHECK ARGS TYPES
  {
    const dishId = Generator.getId();
    const query = "INSERT INTO dish";
    const attrs: Pair[] = [];
    attrs.push(new Pair("dish_id", dishId));
    //TODO ADD COLUMNS
    /* (Suggestion)
    attrs.push(new Pair("namepricerestaurant_id", args.namepricerestaurantId));
    */
    await this.save(query, attrs);
    return this.getDishDetails(dishId);
  }



  async setRestaurant(restaurantId: number, args: {}): Promise<Restaurant>
  //(Suggestion) -> async setRestaurant(restaurantId: number, args: { namelocation? }): Promise<Restaurant> //CHECK ARGS TYPES
  {
    const query = "UPDATE restaurant";
    const columns: Pair[] = [];
    //TODO ADD COLUMNS
    /* (Suggestion)
    if (args.namelocation) columns.push(new Pair("namelocation", args.namelocation));
    */
    await this.set(query, columns, "restaurant_id", restaurantId);
    return this.getRestaurantDetails(restaurantId);
  }

  async setDish(dishId: number, args: {}): Promise<Dish>
  //(Suggestion) -> async setDish(dishId: number, args: { namepricerestaurantId? }): Promise<Dish> //CHECK ARGS TYPES
  {
    const query = "UPDATE dish";
    const columns: Pair[] = [];
    //TODO ADD COLUMNS
    /* (Suggestion)
    if (args.namepricerestaurantId) columns.push(new Pair("namepricerestaurant_id", args.namepricerestaurantId));
    */
    await this.set(query, columns, "dish_id", dishId);
    return this.getDishDetails(dishId);
  }



  async deleteRestaurant(restaurantId: number): Promise<void>
  {
    const query = `
      DELETE FROM restaurant WHERE restaurant_id = ?;`
    //TODO CHECK EXTRA DELETES
    const params = [restaurantId];
    return this.delete(query, params);
  }

  async deleteDish(dishId: number): Promise<void>
  {
    const query = `
      DELETE FROM dish WHERE dish_id = ?;`
    //TODO CHECK EXTRA DELETES
    const params = [dishId];
    return this.delete(query, params);
  }

  private static instance: Source;
  private constructor() { super(); }
  static getInstance(): Source { return this.instance || (this.instance = new this()); }
}

export default Source;