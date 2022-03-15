import request from 'supertest';
import { init, app, DI } from '../app';
import { generateStudent } from '../../.jest/helpers';
const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST
} = process.env

describe("/api/students", () => {

  beforeEach(async () => {
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

  afterEach(async () => {
    await DI.orm.close(true);
    DI.server.close();
  });

  test('It responds with an error if fields are missing', async () => {
    const student = generateStudent();
    delete student.firstName;
    delete student.lastName;

    const response = await request(app)
      .post("/api/students")
      .send({ student })

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  })

  test('It responds with an error if email is invalid format', async () => {
    const student = {
      ...generateStudent(),
      email: 'bad_email'
    }

    const response = await request(app)
      .post("/api/students")
      .send({ student })

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  })

  test("It should respond to a POST containing valid data", async () => {
    const student = generateStudent();

    const response = await request(app)
      .post("/api/students")
      .send({ student })

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('student');
    expect(response.body.student).toHaveProperty('id');
  });

  test("It should respond to the GET method", async () => {
    await request(app)
      .post("/api/students")
      .send({ student: generateStudent() });

    await request(app)
      .post("/api/students")
      .send({ student: generateStudent() });

    const response = await request(app)
      .get("/api/students")

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('students');
    expect(response.body.students).toHaveLength(2)
  });

  test("It should GET student by email", async () => {
    const student = generateStudent();

    await request(app)
      .post("/api/students")
      .send({ student });

    await request(app)
      .post("/api/students")
      .send({ student: generateStudent() });

    const response = await request(app)
      .get("/api/students")
      .query({
        email: student.email
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('students');
    expect(response.body.students).toHaveLength(1)
    expect(response.body.students[0].email).toBe(student.email)
  });

  test("It should GET student by github", async () => {
    const student = generateStudent();

    await request(app)
      .post("/api/students")
      .send({ student });

    await request(app)
      .post("/api/students")
      .send({ student: generateStudent() });

    const response = await request(app)
      .get("/api/students")
      .query({
        github: student.github
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('students');
    expect(response.body.students).toHaveLength(1)
    expect(response.body.students[0].github).toBe(student.github)
  });
});