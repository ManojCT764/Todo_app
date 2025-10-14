const e = require('express')
const todoController = require('../../controlers/todoControler')

jest.mock('../../models/todoModel.js')

const mockSave = jest.fn()
const mockFind = jest.fn()

const Todo = require('../../models/todoModel.js')
const { param } = require('../../Routes/todoRoutes')
const { error } = require('winston')

Todo.find = mockFind
Todo.mockImplementation(() => {
    return {
        save: mockSave
    }
})

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
        it('if erything goes right, should return me all the todos', async () => {
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

        it('if something goes wrong, should handle errors', async () => { 
            const mockError = 'something went wrong, please try later'
            mockFind.mockRejectedValue(new Error(mockError))
            await todoController.getTodos(req , res)
            expect(mockFind).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: mockError })
        })
    })

    describe('For addTodo function', () => {
        beforeEach(() => {
            req.body = { title: "new todo" }
            Todo.prototype.save = mockSave
        })

        it('if everything goes right, should add a new todo', async () => {
            const mockSavedTodo = {
                "_id": "68e93220715527a8ca81972a",
                // "title": "new todo",
                "completed": false,
                "completedAt": null,
                "createdAt": "2025-10-10T16:19:44.289Z",
                "__v": 0
            }
            mockSave.mockResolvedValue(mockSavedTodo)
            await todoController.addTodo(req , res)
            expect(mockSave).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockSavedTodo)
        })

        it('if something goes wrong, should handle errors', async () => {
            const mockError = 'Error saving todo'
            mockSave.mockRejectedValue(new Error(mockError))
            await todoController.addTodo(req , res)
            expect(mockSave).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ error: mockError })
        })
    })

    
})