import { Hotel, Room } from "@prisma/client";
import { notFoundError } from "../../errors";
import hotelRepository from "../../repositories/hotels-repository";

async function getHotels(): Promise<(Hotel & { Rooms: Room[]})[]> {
    const hotels = await hotelRepository.findHotels()
    return hotels
}

async function getHotelsByHotelId(hotelId: number): Promise<(Hotel & { Rooms: Room[]})> {
    const hotel = await hotelRepository.findHotelByHotelId(hotelId);

    if(!hotel) throw notFoundError();

    return hotel;
}

const hotelsService = {
    getHotels,
    getHotelsByHotelId
}

export default hotelsService;