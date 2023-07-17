import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function createHotel() {
    return await prisma.hotel.create({
        data: {
            name: faker.name.findName(),
            image: faker.image.imageUrl()
        }
    })
};

export async function createRoomByHotelId(hotelId: number) {
    return await prisma.room.create({
        data: {
            name: faker.company.catchPhrase(),
            capacity: 4,
            hotelId: hotelId
        }
    })
};