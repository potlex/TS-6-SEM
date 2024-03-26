const request = require('supertest');
const app = require('./server'); 
const Book = require('./models/book'); 
const User = require('./models/user'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('GET /api/books', () => {
    it('should return all books when no id provided', async () => {
      const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }];
      jest.spyOn(Book, 'find').mockResolvedValue(mockBooks);
  
      const response = await request(app).get('/api/books');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBooks);
    });
  
    it('should return a specific book when id provided', async () => {
      const mockBook = { title: 'Book 1' };
      jest.spyOn(Book, 'findOne').mockResolvedValue(mockBook);
  
      const response = await request(app).get('/api/books').query({ id: 123 });
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBook);
    });
  
    it('should return 404 error if no book found with provided id', async () => {
      jest.spyOn(Book, 'findOne').mockResolvedValue(null);
  
      const response = await request(app).get('/api/books').query({ id: 123 });
  
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ errorCode: 31, errorMessage: 'Wrong book' });
    });
  
    it('should return 404 error if no books found', async () => {
      jest.spyOn(Book, 'find').mockResolvedValue(null);
  
      const response = await request(app).get('/api/books');
  
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ errorCode: 31, errorMessage: 'Wrong book' });
    });
  
    it('should return 500 error if an internal server error occurs', async () => {
      jest.spyOn(Book, 'find').mockRejectedValue(new Error('Internal Server Error'));
  
      const response = await request(app).get('/api/books');
  
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ errorCode: 31, errorMessage: 'Internal Server Error' });
    });
  });

describe('GET /api/books/:id', () => {
    it('should return a specific book when valid id provided', async () => {
      const mockBook = { title: 'Book 1' };
      jest.spyOn(Book, 'findOne').mockResolvedValue(mockBook);
  
      const response = await request(app).get('/api/books/123');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBook);
    });
  
    it('should return 404 error if no book found with provided id', async () => {
      jest.spyOn(Book, 'findOne').mockResolvedValue(null);
  
      const response = await request(app).get('/api/books/123');
  
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ errorCode: 31, errorMessage: 'Wrong book' });
    });
  
    it('should return 500 error if an internal server error occurs', async () => {
      jest.spyOn(Book, 'findOne').mockRejectedValue(new Error('Internal Server Error'));
  
      const response = await request(app).get('/api/books/123');
  
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ errorCode: 31, errorMessage: 'Internal Server Error' });
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete a book when valid id provided', async () => {
      const mockBook = { title: 'Book 1' };
      jest.spyOn(Book, 'findOneAndDelete').mockResolvedValue(mockBook);
  
      const response = await request(app).delete('/api/books/123');
  
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  
    it('should return 404 error if no book found with provided id', async () => {
      jest.spyOn(Book, 'findOneAndDelete').mockResolvedValue(null);
  
      const response = await request(app).delete('/api/books/123');
  
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ errorCode: 31, errorMessage: 'Wrong book' });
    });
  
    it('should return 500 error if an internal server error occurs', async () => {
      jest.spyOn(Book, 'findOneAndDelete').mockRejectedValue(new Error('Internal Server Error'));
  
      const response = await request(app).delete('/api/books/123');
  
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ errorCode: 31, errorMessage: 'Internal Server Error' });
    });
  });

  describe('GET /api/protected', () => {
    it('should return "You are authenticated" message when valid token provided', async () => {
      const token = jwt.sign({ userId: 'test_user_id' }, 'idk');
  
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'You are authenticated' });
    });
  
    it('should return 401 error if token is missing', async () => {
      const response = await request(app).get('/api/protected');
  
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Missing token' });
    });
  
    it('should return 403 error if token is invalid', async () => {
      const invalidToken = 'invalid_token';
  
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${invalidToken}`);
  
      expect(response.status).toBe(403);
      expect(response.body).toEqual({ message: 'Invalid token' });
    });
  });

  describe('POST /api/register', () => {
    it('should create a new user when valid data provided', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false
      };
      const hashedPassword = 'hashed_password';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      const mockUser = { email: userData.email, password: hashedPassword, isAdmin: userData.isAdmin };
      jest.spyOn(User.prototype, 'save').mockResolvedValue(mockUser);
  
      const response = await request(app)
        .post('/api/register')
        .send(userData);
  
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'User created' });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(User.prototype.save).toHaveBeenCalledWith();
    });
  
    it('should return 500 error if an internal server error occurs', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false
      };
      const errorMessage = 'Internal Server Error';
      jest.spyOn(User.prototype, 'save').mockRejectedValue(new Error(errorMessage));
  
      const response = await request(app)
        .post('/api/register')
        .send(userData);
  
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });

  describe('POST /api/login', () => {
    it('should return token and isAdmin true when valid credentials provided', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        isAdmin: true
      };
      const mockUser = { _id: 'user_id', email: userData.email, password: 'hashed_password', isAdmin: userData.isAdmin };
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const mockToken = 'mock_token';
      jest.spyOn(jwt, 'sign').mockReturnValue(mockToken);
  
      const response = await request(app)
        .post('/api/login')
        .send(userData);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: mockToken, isAdmin: true });
      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser._id, isAdmin: mockUser.isAdmin }, 'idk');
    });
  
    it('should return 401 error if invalid credentials provided', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
  
      const response = await request(app)
        .post('/api/login')
        .send(userData);
  
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Invalid credentials' });
    });
  
    it('should return 500 error if an internal server error occurs', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };
      const errorMessage = 'Internal Server Error';
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error(errorMessage));
  
      const response = await request(app)
        .post('/api/login')
        .send(userData);
  
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });

  describe('POST /api/report', () => {
    afterAll(async () => {
        await app.close(); 
    });

    it('should return 400 if report type is missing', async () => {
        const res = await request(app)
            .post('/api/report')
            .send({ startDate: '2024-03-01', endDate: '2024-03-31' });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid report type');
    });

    it('should return 400 if start date or end date is missing for sales report', async () => {
        const res = await request(app)
            .post('/api/report')
            .send({ type: 'sales' });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing date for sales report');
    });

    it('should return 200 and create a new report', async () => {
        const res = await request(app)
            .post('/api/report')
            .send({ type: 'sales', startDate: '2024-03-01', endDate: '2024-03-31' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('report_id');
        expect(res.body.state).toBe('Pending');
    });
});