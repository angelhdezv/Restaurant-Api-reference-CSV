import Model from "@util/Model";
import Dish from "@lt/models/Dish";

class Restaurant implements Model
{ 
  id: number;
  name: string;
  location: string;
  dishes: Dish[];

  constructor(id: number)
  {
    this.id = id;
  }

  build(attrs: { name: string, location: string, dishes: Dish[] }): Restaurant
  {
    this.name = attrs.name;
    this.location = attrs.location;
    this.dishes = attrs.dishes;
    return this;
  }

  toJSON()
  {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      dishes: this.dishes
    };
  }
}

export default Restaurant;