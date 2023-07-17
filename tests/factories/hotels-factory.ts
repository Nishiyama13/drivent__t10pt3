import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function creteHotel() {
    return await prisma.hotel.create({
        data: {
            name: faker.name.findName(),
            image: faker.image.imageUrl()
        }
    })
};

export async function creteRoomByHotelId(hotelId: number) {
    return await prisma.room.create({
        data: {
            name: '201',
            capacity: 3,
            hotelId: hotelId
        }
    })
};


