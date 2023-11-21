import { Api } from "../api/index.js";
import { createTodoItem } from "../mock/todo-item.js";
import Observer from "../observer.js";
import { FilterType } from "../utils/consts.js";

export default class TodoItemsModel extends Observer {
    #todoItems = []
    #filterType = FilterType.DEFAULT

    constructor () {
        super()
        this.loadTodos()
    }

    get todoItems() {
        return this.#todoItems
    }

    get filteredTodoItems() {
        switch (this.#filterType) {
            case FilterType.DEFAULT:
                return this.#todoItems
            case FilterType.ACTIVE:
                return this.#todoItems.filter(item => item.done === false)
            case FilterType.DONE:
                return this.#todoItems.filter(item => item.done === true)
        }
    }

    get filterType() {
        return this.#filterType
    }

    loadTodos = async () => {
        const rawData = await Api.getTodos(4)
        console.log(rawData)
        this.#todoItems = this.#adaptToFront(rawData)
        this.notify()
    }

    setfilterType(newFilterType) {
        this.#filterType = newFilterType
        this.notify()
    }

    makeTodoItemDone = async (updatedItemId) => {
        const updatedItem = this.#todoItems.find((item) => item.id === updatedItemId)
        console.log(updatedItem)
        const raw = await Api.updateTodo(updatedItemId, {completed: !updatedItem.done})
        const updatedTodo = this.#adaptToFront(raw)

        const oldItem = this.#todoItems.find((item) => item.id === updatedItemId)
        const index = this.#todoItems.indexOf(oldItem)
        this.#todoItems[index] = updatedTodo
        console.log(this.#todoItems)
        this.notify()
    }

    deleteTodoItem = async (deletingItemId) => {
        const raw = await Api.deleteTodo(deletingItemId)
        const deletingItem = this.#todoItems.find((item) => item.id === deletingItemId)
        const index = this.#todoItems.indexOf(deletingItem)
        this.#todoItems.splice(index, 1)
        this.notify()
    }

    addNewTodoItem = async (newTodoItemText) => {
        // const id = this.#todoItems.length
        // const newTodo = {
        //     id: 555,
        //     title: newTodoItemText,
        //     completed: false,
        // }

        const raw = await Api.addTodo(newTodoItemText)
        const newTodoItem = this.#adaptToFront(raw)
        console.log(newTodoItem)
        // this.#todoItems.push(newTodoItem)
        // console.log(this.#todoItems)
        this.notify()
    }

    #adaptToFront = (rawData) => {
        const adapt = ({id, title: text, completed: done}) => ({id, text, done})
        if(Array.isArray(rawData)) {
            return rawData.map(adapt)
        } else {
            return adapt(rawData)
        }
    }
}