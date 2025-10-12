const e = require('express')
const todoController = require('../../controlers/todoControler')

jest.mock('../../models/todoModel.js')

const mockSave = jest.fn()
const mockFind = jest.fn()

const Todo = require('../../models/todoModel.js')
const { param } = require('../../Routes/todoRoutes')

Todo.find = mockFind

describe('When Todo Controller is invoked', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {}
        }
        res = {
            json: jest.fn(),
            status: jest.fn(() => res) // To allow chaining like res.status(200).json(...)
        }
    })

    describe('For getTodos function', () => {
        it('should return me all the todos', async () => {
            const mockTodos = [
                    {
                        "_id": "68e93220715527a8ca81972a",
                        "title": "new todo",
                        "completed": false,
                        "completedAt": null,
                        "createdAt": "2025-10-10T16:19:44.289Z",
                        "__v": 0
                    }]
            mockFind.mockResolvedValue(mockTodos)
            await todoController.getTodos(req , res)
            expect(mockFind).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockTodos)
        })
    })
})