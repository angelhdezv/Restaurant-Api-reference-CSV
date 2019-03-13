import Sql from "@lt/sources/sql/Source";
import Restaurants from "@lt/controllers/Restaurants";
import Dishes from "@lt/controllers/Dishes";

class Controllers
{
  static createRestaurants()
  {
    return new Restaurants({
      sql: Sql.getInstance()
    });
  }

  static createDishes()
  {
    return new Dishes({
      sql: Sql.getInstance()
    });
  }
}

export default Controllers;