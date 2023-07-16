import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels, getHotelsByHotelId } from '../controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', getAllHotels)
  .get('/:hotelId', getHotelsByHotelId)
export { hotelsRouter };