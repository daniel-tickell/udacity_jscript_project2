import { UserStore } from '../users.js';
import Client from '../../database.js';
const user = new UserStore();
let createdUser;
let createdUserId;
beforeAll(async () => {
    console.log('--- CLEANING USER DATABASE TABLES ---');
    const conn = await Client.connect();
    const sql = 'TRUNCATE products RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
    console.log('--- CREATING TEST USER ---');
    createdUser = await user.create({
        firstname: 'TestFirstname',
        lastname: 'TestLastname',
        password: 'testUserPassword'
    });
    if (createdUser && createdUser.id) {
        createdUserId = createdUser.id;
    }
    else {
        fail(`User creation did not return a valid ID. ${createdUser}`);
        return;
    }
});
describe("User Endpoints: ", () => {
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user.index).toBeDefined();
    });
});
describe("Users Database create: ", () => {
    it('createdUser should exist', async () => {
        expect(createdUser).toEqual({
            id: createdUserId,
            firstname: 'TestFirstname',
            lastname: 'TestLastname',
            password: 'testUserPassword'
        });
    });
    it('show method should return the correct users', async () => {
        const result = await user.show(createdUserId);
        expect(result).toEqual({
            id: createdUserId,
            firstname: "TestFirstname",
            lastname: 'TestLastname',
            password: 'testUserPassword'
        });
    });
});
//# sourceMappingURL=users_spec.js.map