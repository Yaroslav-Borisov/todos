import { createTodoItem } from "../mock/todo-item.js";
import Observer from "../observer.js";
import { FilterType } from "../utils/consts.js";

const TASK_COUNT = 4
const todoItems = Array.from({ length: TASK_COUNT }, createTodoItem)

export default class TodoItemsModel extends Observer {
    #todoItems = todoItems
    #filterType = FilterType.DEFAULT

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

    setfilterType(newFilterType) {
        this.#filterType = newFilterType
        this.notify()
    }

    makeTodoItemDone = (updatedItemId) => {
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

    addNewTodoItem = (todoItemText) => {
        const newTodoItem = createTodoItem()
        newTodoItem.text = todoItemText
        this.#todoItems.push(newTodoItem)
        this.notify()
    }
}