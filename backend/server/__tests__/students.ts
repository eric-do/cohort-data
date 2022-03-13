import request from 'supertest';
import { init, app, DI } from '../app';
const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST
} = process.env

describe("/api/students", () => {

  beforeAll(async () => {
    try {
      await init;
      DI.orm.config.set('host', MYSQL_HOST);
      DI.orm.config.set('port', 3306);
      DI.orm.config.set('user', MYSQL_USER);
      DI.orm.config.set('password', MYSQL_PASSWORD);
      DI.orm.config.set('dbName', MYSQL_DATABASE);
      DI.orm.config.getLogger().setDebugMode(false);
      await DI.orm.config.getDriver().reconnect();
      await DI.orm.getSchemaGenerator().clearDatabase();
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async () => {
    await DI.orm.close(true);
    DI.server.close();
  });

  test('It responds with an error if fields are missing', async () => {
    const student = {
      github: 'student-github',
      email: 'student@mail.com',
    };

    const response = await request(app)
      .post("/api/students")
      .send({ student })

    expect(response.statusCode).toBe(400);
  })

  test("It should respond to the POST method", async () => {
    const student = {
      github: 'student-github',
      email: 'student@mail.com',
      firstName: 'test',
      lastName: 'student'
    };

    const response = await request(app)
      .post("/api/students")
      .send({ student })

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('student');
  });

  test("It should respond to the GET method", async () => {
    const response = await request(app)
      .get("/api/students")

    expect(response.statusCode).toBe(200);
  });
});