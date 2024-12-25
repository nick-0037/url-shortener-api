const request = require('supertest');
const app = require('../server.js');
const URL = require('../models/Url.js');
const { connectDB, mongoose } = require('../mongo');

beforeAll(async () => {
  connectDB()
})

afterAll(async () => {
  await mongoose.connection.close();
})

jest.mock('../models/Url.js');

describe('Short URL API Endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('POST /shorten - Creates a new short URL', async () => {
    const mockUrl = {
      _id: '1',
      url: 'https://www.example.com',
      shortCode: 'abc123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    URL.create.mockResolvedValue(mockUrl);

    const response = await request(app)
      .post('/shorten')
      .send({ url: mockUrl.url });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: mockUrl._id,
      url: mockUrl.url,
      shortCode: mockUrl.shortCode,
      createdAt: mockUrl.createdAt,
      updatedAt: mockUrl.updatedAt
    })
    expect(URL.create).toHaveBeenCalledWith({
      shortCode: expect.any(String),
      url: mockUrl.url
    })
  });

  test('GET /shorten/:shortCode - Retrieves the original URL', async () => {
    const mockUrl = {
      _id: '1',
      url: 'https://www.example.com',
      shortCode: 'abc123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    URL.findOne.mockResolvedValue(mockUrl);

    const response = await request(app).get('/shorten/abc123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: mockUrl._id,
      url: mockUrl.url,
      shortCode: mockUrl.shortCode,
      createdAt: mockUrl.createdAt,
      updatedAt: mockUrl.updatedAt
    });
    expect(URL.findOne).toHaveBeenCalledWith({ shortCode: 'abc123' });
  });

  test('PUT /shorten/:shortCode - Updates the original URL', async () => {
    const mockUrl = {
      _id: '1',
      url: 'https://www.example.com',
      shortCode: 'abc123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      save: jest.fn().mockResolvedValue(true)
    };

    URL.findOne.mockResolvedValue(mockUrl);

    const updateUrl = 'https://www.updated-url.com';
    const response = await request(app)
      .put('/shorten/abc123')
      .send({ url: updateUrl });
    
    expect(response.status).toBe(200);
    expect(mockUrl.url).toBe(updateUrl);
    expect(URL.findOne).toHaveBeenCalledWith({ shortCode: 'abc123' });
    expect(mockUrl.save).toHaveBeenCalled();
  });

  test('DELETE /shorten/:shortCode - Deletes a short URL', async () => {
    const mockUrl = {
      _id: '1',
      url: 'https://www.example.com',
      shortCode: 'abc123'
    };

    URL.findOneAndDelete.mockResolvedValue(mockUrl);

    const response = await request(app).delete('/shorten/abc123');

    expect(response.status).toBe(204);
    expect(URL.findOneAndDelete).toHaveBeenCalledWith({ shortCode: 'abc123' });
  })

  test('GET /shorter/:shortCode/stats - Retrieves stats for the short URL', async () => {
    const mockUrl = {
      _id: '1',
      url: 'https://www.example.com',
      shortCode: 'abc123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accessCount: 10 
    };

    URL.findOne.mockResolvedValue(mockUrl);

    const response = await request(app).get('/shorten/abc123/stats');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: mockUrl._id,
      url: mockUrl.url,
      shortCode: mockUrl.shortCode,
      createdAt: mockUrl.createdAt,
      updatedAt: mockUrl.updatedAt,
      accessCount: mockUrl.accessCount,
    });
    expect(URL.findOne).toHaveBeenCalledWith({ shortCode: 'abc123' })
  })
})