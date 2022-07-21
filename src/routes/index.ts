import { Router } from "express";
import { searchDataRoutes } from "./searchDataRoutes";

import { authentication } from "../middleware/authentication";

const router = Router();

router.use(authentication)

router.use('/api/v1/', searchDataRoutes);


export { router };