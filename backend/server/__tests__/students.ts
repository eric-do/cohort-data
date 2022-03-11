import request from 'supertest';
import { Express } from 'express';
import { init, app, DI } from '../app';
console.log({DI})
describe("/api/students", () => {

  beforeAll(async () => {
    try {
      await init;
      DI.orm.config.set('host', 'localhost');
      DI.orm.config.set('port', 5431);
      DI.orm.config.set('user', 'test');
      DI.orm.config.set('password', 'testpassword');
      DI.orm.config.set('dbName', 'education');
      DI.orm.config.set('migrations', { disableForeignKeys: false });
      DI.orm.config.getLogger().setDebugMode(false);
      await DI.orm.config.getDriver().reconnect();
      await DI.orm.getSchemaGenerator().clearDatabase();
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async () => {
    console.log({DI})
    await DI.orm.close(true);
    DI.server.close();
  });

  test("It should respond to the POST method", async () => {
    const student = {
      github: 'student-github',
      email: 'student@mail.com',
    };

    const response = await request(app)
      .post("/api/students")
      .send({ student })

    expect(response.statusCode).toBe(201);
  });

  test("It should respond to the GET method", async () => {
    const response = await request(app)
      .get("/api/students")

    expect(response.statusCode).toBe(200);
  });
});