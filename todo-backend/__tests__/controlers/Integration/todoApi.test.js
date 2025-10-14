const request = require('supertest')
const {MongoMemoryServer} = require('mongodb-memory-server')
const mongoose = require('mongoose')
const app = require('../../../server')
const Todo = require('../../../models/todoModel')
const todoRoutes = require('../../../Routes/todoRoutes');
app.use('/api', todoRoutes);

describe('Todo API Integration Tests', () => {
    let mongoServer;
    
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.disconnect() // Disconnect from any previous connections
        await mongoose.connect(mongoUri)
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop()
    })

    afterEach(async () => {
        await Todo.deleteMany() // Clear the database after each test
    })

    describe('GET /api/get-todos', () => {
        it('should fetch and return all todos', async () => {
            await Todo.create([{ title: 'Test Todo 1' }, { title: 'Test Todo 2' }]);
            const res = await request(app).get('/api/get-todos');
            expect(res.statusCode).toBe(200);

        })
    })

    describe('POST /api/add-todo', () => {
        it('should add a new todo and return it', async () => {
            const newTodo = { title: 'New Test Todo' };
            const res = await request(app)
                .post('/api/add-todo')
                .send(newTodo);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.title).toBe(newTodo.title);

            const todoInDb = await Todo.findById(res.body._id);
            expect(todoInDb).not.toBeNull();
            expect(todoInDb.title).toBe(newTodo.title);
        })
    })
})