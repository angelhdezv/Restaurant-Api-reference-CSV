import Restaurant from "@lt/models/Restaurant";
import Dish from "@lt/models/Dish";
import  from "@lt/models/";
  
abstract class Mapper<T>
{
  transformList(dataSet: any): T[]
  {
    if (!dataSet) return [];
    const result = [];
    for (let data of dataSet)
      result.push(this.transform(data));
    return result;
  }
  abstract transform(data): T;
}
  
class RestaurantMapper extends Mapper<Restaurant>
{
  transform(data: any): Restaurant  
  {
    return new Restaurant(data.restaurant)
      .build({
        name: data.name,
        location: data.location,
        dishes: []
      });
  }
}

class DishMapper extends Mapper<Dish>
{
  transform(data: any): Dish  
  {
    return new Dish(data.dish)
      .build({
        name: data.name,
        price: data.price,
        restaurantId: data.restaurant_id
      });
  }
}

class Mapper extends Mapper<>
{
  transform(data: any):   
  {
    return new (data.)
      .build({
        : data.,
        : data.,
        : data.
      });
  }
}
  
export { Mapper, RestaurantMapper, DishMapper, Mapper}