import { UserStore } from '../users.js';
import Client from '../../database.js';
const user = new UserStore();
beforeAll(async () => {
    console.log('--- CLEANING DATABASE TABLES ---');
    const conn = await Client.connect();
    const sql = 'TRUNCATE products RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
});
describe("Endpoints: ", () => {
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a update method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(user.index).toBeDefined();
    });
});
describe("Database create: ", () => {
    it('user create method should add a user', async () => {
        const createdUser = await user.create({
            firstname: 'TestFirstname',
            lastname: 'TestLastname',
            password: 'testUserPassword'
        });
        expect(createdUser).toEqual({
            id: jasmine.any(Number),
            firstname: 'TestFirstname',
            lastname: 'TestLastname',
            password: 'testUserPassword'
        });
    });
});
describe("Database update and query: ", () => {
    it('index method should return a list of users', async () => {
        const result = await user.index();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it('update method should update user', async () => {
        const result = await user.update({
            id: 1,
            firstname: "TestFirstname",
            lastname: 'TestLastname',
            password: 'updatedPassword'
        });
        expect(result).toEqual({
            id: jasmine.any(Number),
            firstname: "TestFirstname",
            lastname: 'TestLastname',
            password: 'updatedPassword'
        });
    });
    it('show method should return the correct users', async () => {
        const result = await user.show(1);
        expect(result).toEqual({
            id: 1,
            firstname: "TestFirstname",
            lastname: 'TestLastname',
            password: 'updatedPassword'
        });
    });
});
describe("Database delete: ", () => {
    it('delete method should remove the user', async () => {
        const deletedUser = await user.delete(1);
        expect(deletedUser === undefined);
    });
});
//# sourceMappingURL=users_spec.js.map