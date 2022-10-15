const supertest = require('supertest')
const { server: server_ } = require('../server')
const { queryData, persistData } = require('../src/router/auth')

describe('auth system', () => {
  let agent = null
  let server = null
  let mockNewUser = {
    name: 'jarl',
    fName: 'jarrrl',
    dob: new Date().toISOString(),
    sex: 'male',
    email: 'jarl@jarl.com',
    password: 'jarl',
    testing: true,
  }
  let token = null

  beforeAll((done) => {
    server = server_
    agent = supertest.agent(server)
    server = server.listen(done)
  })

  afterAll(async () => {
    await server.close()

    console.log('clean up db')
    const data = await queryData('./db.json')
    const data_ = {
      ...data,
      users: data.users.filter((u) => u.testing == false || u.testing == undefined),
    }
    await persistData('./db.json', data_)
  })

  test('expect server to be up and running', async () => {
    const res = await agent.get('/')
    expect(res).toBeDefined()
  })

  test('POST /auth/signup - Test signup', async () => {
    const res = await agent
      .post('/auth/signup')
      .send(mockNewUser)
      .set('Content-Type', 'application/json')
      .set('X-Application', 'testing')

    expect(res.status).toBe(201)
  })

  test('POST /auth/login - Login', async () => {
    const res = await agent
      .post('/auth/login')
      .send({
        user: mockNewUser.email,
        pass: mockNewUser.password,
      })
      .set('Content-Type', 'application/json')
      .set('X-Application', 'testing')

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.token).toBeDefined()

    token = res.body.token
  })

  test('POST /auth/logout - Logout', async () => {
    console.log(token)
    const res = await agent
      .post('/auth/logout')
      .set('Content-Type', 'application/json')
      .set('X-Application', 'testing')
      .set('Authorization', 'Bearer ' + token)

    expect(res.status).toBe(200)
  })
})
