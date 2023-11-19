import AbstractView from "./abstract-view.js"

const createTodoListTemplate = () => {
    return `<ul class="todo-list">
            </ul>`
}

export default class TodoListView extends AbstractView {

    get template() {
        return createTodoListTemplate()
    }

    clearTodoList = () => {
        this.element.innerHTML = ''
    }
}