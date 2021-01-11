const supertest = require('supertest')
const app = require('../../src/app')
const http = require('http')

const endpointUrl = '/api/calendarworker'
var server, request

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(done)
  request = supertest(server)
})

afterAll((done) => {
  server.close(done)
})

describe('Integreation test for Calendar Worker controllers : ' + endpointUrl, () => {
  describe('GET methode with ' + endpointUrl, () => {
    it('Should GET' + endpointUrl + ' return informations with name and version', async () => {
      const response = await request
        .get(endpointUrl)
      
      expect(response.statusCode).toBe(200)
      expect(response.body.name).toBeDefined()
      expect(response.body.version).toBeDefined()
    })
  })
})