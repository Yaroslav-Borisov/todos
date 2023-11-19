import { FilterType } from "../utils/consts.js"
import AbstractView from "./abstract-view.js"

const createFiltersTemplate = () => {
    return `<aside class="app-filters">
                <section class="toggle-group">
                <button class="button button--primary" data-name="all">All</button>
                <button class="button" data-name="active">Active</button>
                <button class="button" data-name="done">Done</button>
                </section>
            </aside>`
}

export default class FiltersView extends AbstractView {
    #todoItemsModel = null
    #filterName = FilterType.DEFAULT
    _callback = {}

    constructor(todoItemsModel) {
        super()
        this.#todoItemsModel = todoItemsModel
    }

    get template() {
        return createFiltersTemplate()
    }

    setFilterClickHandler = (callback) => {
        this._callback.filterClick = callback

        const filters = this.element.querySelectorAll('.button')
        
        filters.forEach((filter) => {
            filter.addEventListener('click', this.#filterClickHandler)
        })
    }

    #filterClickHandler = (evt) => {
        evt.preventDefault()

        const filters = this.element.querySelectorAll('.button')
        filters.forEach((filter) => {
            filter.classList.remove('button--primary')
        })

        evt.target.classList.add('button--primary')

        const filterName = evt.target.getAttribute('data-name')
        this.#filterName = filterName
        this._callback.filterClick?.(this.#filterName)
    }
}