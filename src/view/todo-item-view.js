import AbstractView from "./abstract-view.js"

const createTodoItemTemplate = ({text, done}) => {
    return `<li class="${done ? "todo-item todo-item--done" : "todo-item"}">
                <div class="todo-item__status">
                <i class="bi bi-check2"></i>
                </div>
                <span class="todo-item__text">${text}</span>
                <button class="todo-item__remove-button">
                <i class="bi bi-trash3"></i>
                </button>
            </li>`
}

export default class TodoItemView extends AbstractView {
    #todoItem = null
    _callback = {}

    constructor(todoItem) {
        super()
        this.#todoItem = todoItem
    }

    get template() {
        return createTodoItemTemplate(this.#todoItem)
    }

    get todoItemId() {
        return this.#todoItem.id
    }

    setItemDoneClickHandler = (callback) => {
        this._callback.itemClick = callback
        this.element.addEventListener('click', this.#itemDoneClickHandler)
    }

    setItemDeleteClickHandler = (callback) => {
        this._callback.itemDeleteClick = callback
        this.element.querySelector('.todo-item__remove-button').addEventListener('click', this.#itemDeleteClickHandler)
    }

    #itemDoneClickHandler = (evt) => {
        evt.preventDefault()
        this._callback.itemClick?.(this.todoItemId)
    }

    #itemDeleteClickHandler = (evt) => {
        evt.preventDefault()
        this._callback.itemClick = null
        this._callback.itemDeleteClick?.(this.todoItemId)
    }
}