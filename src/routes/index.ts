import { Router } from "express";
import { searchDataRoutes } from "./searchDataRoutes";
// AUTENTICAÇÃO
//import { authentication } from "../middleware/authentication";

const router = Router();
// AUTENTICAÇÃO
//router.use(authentication)

router.use('/api/v1/searchdata', searchDataRoutes);


export { router };