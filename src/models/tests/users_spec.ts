import { User, UserStore } from '../users.js';
import Client from '../../database.js'

const users = new UserStore();

describe("User Endpoints: ", () => {
  it('should have an index method', () => {
    expect(users.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(users.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(users.create).toBeDefined();
  });
});

describe("User tests: ", () => {

  it('index method should return the all users', async () => {
  const result = await users.index();
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThanOrEqual(10);
  });

  it('show method should return user 1', async () => {
  const result = await users.show(1);
  
  expect(result).toEqual({
        id: 1,
        username: 'asmith',       
        firstname: 'Alice',
        lastname: 'Smith',
        password: jasmine.any(String)
    });
  //check for hashed password
  expect(result.password).toContain('$2b$10');
  });

  it('create method should return user and hashed password', async () => {
  const result = await users.create(
    {
      username: "thisguy",
      firstname: 'This',
      lastname: 'TestUser',
      password: 'itsBeenALongDay'
    });
    expect(result).toEqual({
        id: jasmine.any(Number),    
        username: 'thisguy',    
        firstname: 'This',
        lastname: 'TestUser',
        password: jasmine.any(String)
    });
    //check for hashed password
    expect(result.password).toContain('$2b$10');
  });

  it('Authenticate method should return the userbame for a valid user', async () => {
  const result = await users.authenticate('chuckBrown','MySecretPass!23');
    expect(result).toEqual('chuckBrown');
  });

  it('Authenticate method should return null for a invalid user', async () => {
  const result = await users.authenticate('','itsBeenALongDay');
    expect(result).toBeNull();
  });

});

console.log('User Tests Complete');