import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '../services/hotels-service';


export async function getAllHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const hotels = await hotelsService.getHotels();
      return res.status(httpStatus.OK).send(hotels);
    } catch (e) {
      next(e);
    }
}

export async function getHotelsByHotelId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const  hotelId  = Number(req.params.hotelId)

    try {
      const hotel = await hotelsService.getHotelsByHotelId(hotelId);
      return res.status(httpStatus.OK).send(hotel);
    } catch (e) {
      next(e);
    }
}
  