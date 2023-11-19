import AbstractView from "./abstract-view.js"

const createFooterTemplate = (todoItems) => {
    const activeItems = todoItems.filter(item => item.done === false).length
    const doneItems = todoItems.filter(item => item.done === true).length


    return `<footer class="app-footer">
                ${activeItems} more to do, ${doneItems} done
            </footer>`
}

export default class FooterView extends AbstractView {
    #todoItems = null

    constructor(todoItemsModel) {
        super()
        this.#todoItems = todoItemsModel.todoItems
    }

    get template() {
        return createFooterTemplate(this.#todoItems)
    }

    clearFooter = () => {
        this.element.innerHTML = ''
    }
}