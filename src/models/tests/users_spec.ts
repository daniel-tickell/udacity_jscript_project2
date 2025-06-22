import { User, UserStore } from "../users.js";
import Client from "../../database.js";
import app from '../../server.js'
import supertest from 'supertest';

const users = new UserStore();

describe("User Endpoints: ", () => {
  it("should have an index method", () => {
    expect(users.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(users.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(users.create).toBeDefined();
  });
  it("should have a authenticate method", () => {
    expect(users.authenticate).toBeDefined();
  });
});

describe("User tests: ", () => {
  it("index method should return the all users", async () => {
    const result = await users.index();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(10);
  });

  it("show method should return user 1", async () => {
    const result = await users.show(1);

    expect(result).toEqual({
      id: 1,
      username: "asmith",
      firstname: "Alice",
      lastname: "Smith",
      password: jasmine.any(String),
    });
    //check for hashed password
    expect(result.password).toContain("$2b$10");
  });

  it("create method should return user and hashed password", async () => {
    const result = await users.create({
      username: "thisguy",
      firstname: "This",
      lastname: "TestUser",
      password: "itsBeenALongDay",
    });
    expect(result).toEqual({
      id: jasmine.any(Number),
      username: "thisguy",
      firstname: "This",
      lastname: "TestUser",
      password: jasmine.any(String),
    });
    //check for hashed password
    expect(result.password).toContain("$2b$10");
  });

  it("Authenticate method should return the userbame for a valid user", async () => {
    const result = await users.authenticate("chuckBrown", "MySecretPass!23");
    expect(result).toEqual("chuckBrown");
  });

  it("Authenticate method should return null for a invalid user", async () => {
    const result = await users.authenticate("", "itsBeenALongDay");
    expect(result).toBeNull();
  });

  it('Index route should return 401 unauthenticated user', async () => {
    const response = await supertest(app).get('/users');
    expect(response.status).toBe(401);
    expect(typeof response.body).toBe('string');
  });

  it('User Query route should return 401 unauthenticated user', async () => {
    const response = await supertest(app).get('/users/1');
    expect(response.status).toBe(401);
    expect(typeof response.body).toBe('string');
  });

  it('User create route should return 200 User Created', async () => {
    const response = await supertest(app)
    .post('/users')
    .send({
      username: 'chuckBrownThe3rd',
      firstname: 'Charlie',
      lastname: 'Brown',
      password: 'MySecretPass!23456',
    })
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('string');
  });

it('should authenticate a user and return a token', async () => {
    const response = await supertest(app)
      .post('/authenticate')
      .send({
        username: 'chuckBrown',
        password: 'MySecretPass!23',
      });
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('string');
  });

  it('should return 400 if username or password is missing', async () => {
    const response = await supertest(app)
      .post('/authenticate')
      .send({
        username: 'testuser',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Username and password are required for authentication.');
  });
});

console.log("User Tests Complete");
