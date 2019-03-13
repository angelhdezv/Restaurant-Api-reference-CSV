import Restaurant from "@lt/models/Restaurant";
import Dish from "@lt/models/Dish";

interface Sql
{
 
  getDishList(fs: { restaurantId?:number }): Promise<Dish[]>; //CHECK ARGS TYPES

  getRestaurantDetails(restaurantId: number): Promise<Restaurant>;
  getDishDetails(dishId: number): Promise<Dish>;

  
  saveRestaurant(args: { name:string, location:string }): Promise<Restaurant>; //CHECK ARGS TYPES
  saveDish(args: { name:string, price:number, restaurantId:number}): Promise<Dish>; //CHECK ARGS TYPES

  setRestaurant(restaurantId: number, args: { name?, location? }): Promise<Restaurant>; //CHECK ARGS TYPES
  setDish(dishId: number, args: { name?, price?, restaurantId? }): Promise<Dish>; //CHECK ARGS TYPES

  deleteRestaurant(restaurantId: number): Promise<void>;
  deleteDish(dishId: number): Promise<void>;
}

export default Sql;