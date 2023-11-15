const request = require('supertest');
const server = require('../server'); 

describe('Testing Rutas API', () => {
  it('debría obtener todos los Drivers', async () => {
    const response = await request(server).get('/drivers');
    expect(response.status).toBe(200);
    // Añade más aserciones según sea necesario
  });

  it('debería obtener un Driver por ID', async () => {
    const response = await request(server).get('/drivers/2');
    expect(response.status).toBe(200);
  });
});
