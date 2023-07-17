import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels, getRoomsByHotelId } from '../controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', getAllHotels)
  .get('/:hotelId', getRoomsByHotelId)
export { hotelsRouter };