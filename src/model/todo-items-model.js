import { createTodoItem } from "../mock/todo-item.js";
import { FilterType } from "../utils/consts.js";

const TASK_COUNT = 4
const todoItems = Array.from({ length: TASK_COUNT }, createTodoItem)

export default class TodoItemsModel {
    _observers = []
    #todoItems = []

    get todoItems() {
        this.#todoItems = todoItems
        return this.#todoItems
    }

    subscribe = (callback) => {
        this._observers.push(callback)
    }

    notify = () => {
        this._observers.forEach((callback) => callback())
    }

    updateTodoItems = (updatedItemId) => {
        const updatedItem = this.#todoItems.find((item) => item.id === updatedItemId)
        updatedItem.done = !updatedItem.done
        this.notify()
    } 

    deleteTodoItem = (updatedItemId) => {
        const updatedItem = this.#todoItems.find((item) => item.id === updatedItemId)
        const index = this.#todoItems.indexOf(updatedItem)
        this.#todoItems.splice(index, 1)
        this.notify()
    }

    filterTodoItems = (filterName) => {
        switch (filterName) {
            case FilterType.DEFAULT:
                this.#todoItems = todoItems
                console.log(this.#todoItems)
                this.notify()
                break
            case FilterType.ACTIVE:
                this.#todoItems = todoItems.filter(item => item.done === false)
                console.log(this.#todoItems)
                this.notify()
                break
            case FilterType.DONE:
                this.#todoItems = todoItems.filter(item => item.done === true)
                console.log(this.#todoItems)
                this.notify()
                break
        }
    }
}