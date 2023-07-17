import { Hotel, Room } from "@prisma/client";
import { notFoundError, unauthorizedError } from "../../errors";
import hotelRepository from "../../repositories/hotels-repository";
import enrollmentRepository from "../../repositories/enrollment-repository";
import ticketsRepository from "../../repositories/tickets-repository";
import { cannotListHotelsError } from "../../errors/cannot-list-hotels-error";

async function verify( userId:number ) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment) throw notFoundError();

    if (enrollment.userId !== userId) throw unauthorizedError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket) throw notFoundError();
    if(ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw cannotListHotelsError();
}

async function getHotels(userId: number): Promise<Hotel[]>{
    await verify(userId);

    const hotels = await hotelRepository.findHotels();
    if (!hotels || hotels.length === 0) throw notFoundError();
    
    return hotels
}

async function getRoomsByHotelId(userId: number, hotelId: number): Promise<(Hotel & { Rooms: Room[]})> {
    await verify(userId);

    const hotel = await hotelRepository.findRoomsByHotelId(hotelId);
    if(!hotel || hotel.Rooms.length === 0) throw notFoundError();

    return hotel;
}

const hotelsService = {
    getHotels,
    getRoomsByHotelId
}

export default hotelsService;