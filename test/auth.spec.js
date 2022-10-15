const supertest = require('supertest')
const { server: server_ } = require('../server')

// https://github.com/visionmedia/supertest
describe('auth system', () => {
  let agent = null
  let server = null

  beforeAll((done) => {
    server = server_.listen(done)
    agent = supertest.agent(server)
  })
  afterAll((done) => {
    server.close(done)
  })

  test('expect server to be up and running', async () => {
    const res = await agent.get('/')
    expect(res).toBeDefined()
  })
})
