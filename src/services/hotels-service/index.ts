import hotelRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError, cannotListHotelsError } from "@/errors";

async function verify( userId:number ) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket || ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw cannotListHotelsError();
}

async function getHotels(userId: number){
    await verify(userId);

    const hotels = await hotelRepository.findHotels();
    if (!hotels || hotels.length === 0) throw notFoundError();
    
    return hotels
}

async function getRoomsByHotelId(userId: number, hotelId: number){
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