import AbstractView from "./abstract-view.js"

const createTodoFormTemplate = (formOpenMode) => {
    return `<section class="add-todo">
                ${formOpenMode ? `<form class="add-todo__form">
                    <button class="close-button" type="button">
                        <i class="bi bi-x"></i>
                    </button>
                    <div class="text-input text-input--focus">
                        <input class="input" />
                    </div>
                    <button class="button button--filled">Add task</button>
                </form>` : `<button class="add-todo__show-form-button">
                    <i class="bi bi-plus-lg"></i>
                </button>`}
            </section>`
}

export default class TodoFormView extends AbstractView {
    #formOpenMode = null
    _callback = {}

    constructor(formOpenMode) {
        super()
        this.#formOpenMode = formOpenMode
    }

    get template() {
        return createTodoFormTemplate(this.#formOpenMode)
    }

    clearForm = () => {
        this.element.remove()
    }

    setOpenFormClickHandler = (callback) => {
        this._callback.openFormClick = () => {
            callback

            this.setCloseFormClickHandler()
        }
        this.element.querySelector('.add-todo__show-form-button').addEventListener('click', this.#openFormClickHandler)
    }

    setCloseFormClickHandler = (callback) => {
        this._callback.closeFormClick = callback
        // this.formOpenMode = !this.#formOpenMode
        console.log(this.element.querySelector('.close-button'))
        // this.element.querySelector('.close-button').addEventListener('click', this.#closeFormClickHandler)
    }

    #openFormClickHandler = (evt) => {
        evt.preventDefault()
        this._callback.openFormClick()
    }

    #closeFormClickHandler = (evt) => {
        evt.preventDefault()
        this._callback.closeFormClick()
    }

}