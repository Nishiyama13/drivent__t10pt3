import { prisma } from '@/config';

async function findHotels() {
    return prisma.hotel.findMany({
        include: {
            Rooms: true
        }
    })
}

async function findHotelByHotelId(hotelId: number) {
    return prisma.hotel.findFirst({
        where: { id: hotelId },
        include: {
            Rooms: true
        }
    })
}

const hotelRepository = {
    findHotels,
    findHotelByHotelId
}

export default hotelRepository;