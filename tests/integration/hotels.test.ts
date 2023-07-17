import faker from "@faker-js/faker";
import app, { init } from '@/app';
import supertest from "supertest";
import httpStatus from "http-status";
import * as jwt from 'jsonwebtoken';
import { createEnrollmentWithAddress, createPayment, createTicket, createTicketTypeRemote, createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import { TicketStatus } from "@prisma/client";

beforeAll(async () => {
    await init();
    await cleanDb();
});

afterEach(async () => {
    await cleanDb();
})

const server = supertest(app);

describe('GET/hotels', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get("/hotels")

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/enrollments').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    
        const response = await server.get('/enrollments').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 402 when user ticket is remote', async() => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketTypeRemote();
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            const payments = await createPayment(ticket.id, ticketType.price);

            const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED)
        });

        it('should respond with status 404 when user has no enrollment',async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const ticketType = await createTicketTypeRemote();

            const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        })

    })


})