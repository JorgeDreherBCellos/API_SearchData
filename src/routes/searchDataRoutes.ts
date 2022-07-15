import { Router } from 'express';
import { listSearchDataController } from '../modules/SearchData/useCases/listSearchData';

const searchDataRoutes = Router();

searchDataRoutes.get('/searchdata', (request, response) => {
  return listSearchDataController.handle(request, response);
})

export { searchDataRoutes };