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
