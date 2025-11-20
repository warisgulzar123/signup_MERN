import ensurAuthenticated from "../middlewares/auth.js";
import { Router } from "express";
const productsRouter = Router();
import router from "./auth_routers.js";

productsRouter.get('/', ensurAuthenticated, (req, res) => {
  console.log('loged in user detail ....', req.user);
  

  res.status(200).json([
    {
        name: 'mobile', price: 12000
    },
    {
        name: 'laptop', price: 45000
    }
  ]);
});

export default productsRouter;
