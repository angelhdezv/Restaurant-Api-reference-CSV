import Repository from "@lt/sources/Sql";
import { Pair } from "@util/Util";
import Restaurant from "@lt/models/Restaurant";
import Dish from "@lt/models/Dish";

import Generator from "@util/Generator";
import Executor from "@lt/sources/sql/Executor";
import * as Mapper from "@lt/sources/api/Mappers";

class Source extends Executor implements Repository
{
  
  async getDishList(fs: { restaurantId?:number }): Promise<Dish[]> //CHECK ARGS TYPES
  {
    const query =
      "SELECT d.* FROM dish d";
    const filter: Pair[] = [];
    
    if (fs.restaurantId) filter.push(new Pair("d.restaurant_id", fs.restaurantId));
    
    const res = await this.get(query, filter, new Mapper.DishMapper());
    //TODO CHECK FETCH
    return res; 
  }
  async getRestaurantList(fs: { restaurantId?:number }): Promise<Restaurant[]> //CHECK ARGS TYPES
  {
    const query =
      "SELECT r.* FROM restaurant r";
    const filter: Pair[] = [];
    
    if (fs.restaurantId) filter.push(new Pair("d.restaurant_id", fs.restaurantId));
    
    const res = await this.get(query, filter, new Mapper.RestaurantMapper());
    //TODO CHECK FETCH
    return this.fetchRestaurant(res); 
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
  async fetchRestaurant(restaurants: Restaurant[]): Promise<Restaurant[]> {
    const cQuery = "SELECT d.dish_id FROM dish d WHERE d.restaurant_id = ?";
    for (let restaurant of restaurants) {
      let dishes = [];
      let cDish = await this.getAny(cQuery, [restaurant.id]);
      for (let dish of cDish) {
        dishes.push(await this.getDishDetails(dish))
      }
      Object.assign(restaurant,
        {
          dishes: dishes
        });
    }
    return restaurants;
  }
  



async saveRestaurant(args: { name:string, location:string }): Promise<Restaurant> //CHECK ARGS TYPES
  {
    const restaurantId = Generator.getId();
    const query = "INSERT INTO restaurant";
    const attrs: Pair[] = [];
    attrs.push(new Pair("restaurant_id", restaurantId));
    attrs.push(new Pair("name", args.name));
    attrs.push(new Pair("location", args.location));
    await this.save(query, attrs);
    return this.getRestaurantDetails(restaurantId);
  }

 async saveDish(args: { name:string, price:number ,restaurantId: number }): Promise<Dish> //CHECK ARGS TYPES
  {
    const dishId = Generator.getId();
    const query = "INSERT INTO dish";
    const attrs: Pair[] = [];
    attrs.push(new Pair("dish_id", dishId));
    attrs.push(new Pair("name", args.name));
    attrs.push(new Pair("price", args.price));
    attrs.push(new Pair("restaurant_id", args.restaurantId));
    
    await this.save(query, attrs);
    return this.getDishDetails(dishId);
  }



  async setRestaurant(restaurantId: number, args: { name?,location? }): Promise<Restaurant> //CHECK ARGS TYPES
  {
    const query = "UPDATE restaurant";
    const columns: Pair[] = [];
    
    if (args.name) columns.push(new Pair("name", args.name));
    if (args.location) columns.push(new Pair("location", args.location));
    await this.set(query, columns, "restaurant_id", restaurantId);
    return this.getRestaurantDetails(restaurantId);
  }

  async setDish(dishId: number, args: { name?, price?, restaurantId? }): Promise<Dish> //CHECK ARGS TYPES
  {
    const query = "UPDATE dish";
    const columns: Pair[] = [];
    //TODO ADD COLUMNS
    
    if (args.name) columns.push(new Pair("name", args.name));
    if (args.price) columns.push(new Pair("price", args.price));
    if (args.restaurantId) columns.push(new Pair("restaurantId", args.restaurantId));

    await this.set(query, columns, "dish_id", dishId);
    return this.getDishDetails(dishId);
  }



  async deleteRestaurant(restaurantId: number): Promise<void>
  {
    const query ="UPDATE Dish SET restaurant_id=null WHERE restaurant_id = ?;" + `DELETE FROM restaurant WHERE restaurant_id = ?;`
    //TODO CHECK EXTRA DELETES
    const params = [restaurantId,restaurantId];
    return this.delete(query, params);
  }

  async deleteDish(dishId: number): Promise<void>
  {
    const query = `DELETE FROM dish WHERE dish_id = ?;`
    //TODO CHECK EXTRA DELETES
    const params = [dishId];
    return this.delete(query, params);
  }

  private static instance: Source;
  private constructor() { super(); }
  static getInstance(): Source { return this.instance || (this.instance = new this()); }
}

export default Source;