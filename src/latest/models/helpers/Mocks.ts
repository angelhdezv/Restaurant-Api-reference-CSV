import Generator from "@util/Generator";
import Restaurant from "@lt/models/Restaurant";
import Dish from "@lt/models/Dish";


class Mocks
{
  static Restaurant()
  {
    return [
      new Restaurant(3858350).build({ name: "voluptatum", location: "aliquid", dishes: [this.Dish()[5], this.Dish()[15]] }),
      new Restaurant(2024171).build({ name: "beatae", location: "laborum", dishes: [this.Dish()[5], this.Dish()[10]] }),
      new Restaurant(1745305).build({ name: "ut", location: "possimus", dishes: [this.Dish()[9]] }),
      new Restaurant(9621858).build({ name: "eos", location: "et", dishes: [this.Dish()[1], this.Dish()[4]] }),
      new Restaurant(4223046).build({ name: "amet", location: "rem", dishes: [this.Dish()[5]] }),
      new Restaurant(233861).build({ name: "non", location: "autem", dishes: [this.Dish()[3]] }),
      new Restaurant(9834688).build({ name: "et", location: "ut", dishes: [this.Dish()[0], this.Dish()[13]] }),
      new Restaurant(2832282).build({ name: "voluptas", location: "qui", dishes: [this.Dish()[8], this.Dish()[13]] })
    ];
  }

  static Dish()
  {
    return [
      new Dish(9849964).build({ name: "nesciunt", price: 22, restaurantId: 11 }),
      new Dish(7040386).build({ name: "ut", price: 44, restaurantId: 97 }),
      new Dish(6910999).build({ name: "id", price: 43, restaurantId: 52 }),
      new Dish(6222516).build({ name: "repellendus", price: 60, restaurantId: 38 }),
      new Dish(2432383).build({ name: "neque", price: 21, restaurantId: 70 }),
      new Dish(6005801).build({ name: "distinctio", price: 49, restaurantId: 42 }),
      new Dish(9658985).build({ name: "eum", price: 18, restaurantId: 54 }),
      new Dish(4186758).build({ name: "recusandae", price: 65, restaurantId: 7 })
    ];
  }

}
export default Mocks;