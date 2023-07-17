import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '../services/hotels-service';


export async function getAllHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
      const hotels = await hotelsService.getHotels(userId);
      return res.status(httpStatus.OK).send(hotels);
    } catch (e) {
      next(e);
    }
}

export async function getRoomsByHotelId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const  hotelId  = Number(req.params.hotelId)

    if(!hotelId) {
      return res.send(httpStatus.BAD_REQUEST);
    }

    try {
      const rooms = await hotelsService.getRoomsByHotelId(userId, hotelId);
      return res.status(httpStatus.OK).send(rooms);
    } catch (e) {
      next(e);
    }
}

  