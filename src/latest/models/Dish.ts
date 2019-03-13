import Model from "@util/Model";

class Dish implements Model
{ 
  id: number;
  name: string;
  price: number;
  restaurantId: number;

  constructor(id: number)
  {
    
    this.id = id;
  }

  build(attrs: { name: string, price: number, restaurantId: number }): Dish
  {
    this.name = attrs.name;
    this.price = attrs.price;
    this.restaurantId = attrs.restaurantId;
    return this;
  }

  toJSON()
  {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      restaurant_id: this.restaurantId
    };
  }
}

export default Dish;