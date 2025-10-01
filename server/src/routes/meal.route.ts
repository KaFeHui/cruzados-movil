import { Router } from "express";
import { MealController } from "../controllers/meal.controller";

const route = Router();

route.get("/", MealController.getAll);
route.get("/:id", MealController.getById);
route.post("/", MealController.create);

export default route;