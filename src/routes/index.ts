import express from "express";
import TodoRepo from "../repositories/todo.repository";
import todoRoutes from "./todo.route";
const router = express.Router();

router.get("/v1", (_, res) => {
  res.json({
    message: "Welcome to my API",
  });
});
// router.use("/todos", router.);
router.use("/todos", todoRoutes);


export default router;
