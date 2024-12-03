import { Router } from 'express';
import SearchController from '../controllers/SearchController';
// import JwtMiddleware from '../middlewares/JwtMiddleware';
import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();
const searchController = new SearchController();


router.post('/', jwtMiddleware.auth, searchController.newSearch.bind(searchController));
router.get('/',  jwtMiddleware.auth,searchController.getAllSearches.bind(searchController));
router.get('/report/:id', jwtMiddleware.auth,searchController.getReportById.bind(searchController));

export default router;
