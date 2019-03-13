import Restaurant from "@lt/models/Restaurant";
import Dish from "@lt/models/Dish";

interface Sql
{
  getDishList(fs: {}): Promise<Dish[]>; //TODO CHECK FILTERS
  //(Suggestion) -> getDishList(fs: { restaurantId? }): Promise<Dish[]>; //CHECK ARGS TYPES

  getRestaurantDetails(restaurantId: number): Promise<Restaurant>;
  getDishDetails(dishId: number): Promise<Dish>;

  saveRestaurant(args: {}): Promise<Restaurant>; //TODO CHECK ARGS
  //(Suggestion) -> saveRestaurant(args: { namelocation }): Promise<Restaurant>; //CHECK ARGS TYPES
  saveDish(args: {}): Promise<Dish>; //TODO CHECK ARGS
  //(Suggestion) -> saveDish(args: { namepricerestaurantId }): Promise<Dish>; //CHECK ARGS TYPES

  setRestaurant(restaurantId: number, args: {}): Promise<Restaurant>; //TODO CHECK ARGS
  //(Suggestion) -> setRestaurant(restaurantId: number, args: { namelocation? }): Promise<Restaurant>; //CHECK ARGS TYPES
  setDish(dishId: number, args: {}): Promise<Dish>; //TODO CHECK ARGS
  //(Suggestion) -> setDish(dishId: number, args: { namepricerestaurantId? }): Promise<Dish>; //CHECK ARGS TYPES

  deleteRestaurant(restaurantId: number): Promise<void>;
  deleteDish(dishId: number): Promise<void>;
}

export default Sql;