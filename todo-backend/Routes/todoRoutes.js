const express = require('express')
const {getTodos, addTodo} = require("../controlers/todoControler")

const router = express.Router()

router.get("/add-todo", getTodos)
router.post("/add-todo", addTodo)

module.exports = router