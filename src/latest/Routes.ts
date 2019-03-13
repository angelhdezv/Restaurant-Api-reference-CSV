import { Router } from "express";
import Factory from "@lt/controllers/Factory";
import Restaurants from "@lt/controllers/Restaurants";
import Dishes from "@lt/controllers/Dishes";

class Routes
{
  private router: Router;
  private restaurants: Restaurants;
  private dishes: Dishes;

  constructor()
  {
    this.router = Router();
    this.restaurants = Factory.createRestaurants();
    this.dishes = Factory.createDishes();
  }

  init(): Router
  {
    this.router.get("/restaurants/:id", (req, res) => this.restaurants.getList(req, res));
    this.router.post("/restaurants", (req, res) => this.restaurants.save(req, res));
    this.router.put("/restaurants/:id", (req, res) => this.restaurants.update(req, res));
    this.router.delete("/restaurants/:id", (req, res) => this.restaurants.delete(req, res));
    this.router.get("/dishes", (req, res) => this.dishes.getList(req, res));
    this.router.post("/dishes", (req, res) => this.dishes.save(req, res));
    this.router.put("/dishes/:id", (req, res) => this.dishes.update(req, res));
    this.router.delete("/dishes/:id", (req, res) => this.dishes.delete(req, res));

    return this.router;
  }
}

export default Routes;