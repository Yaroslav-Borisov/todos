import { FilterType } from "../utils/consts.js"
import AbstractView from "./abstract-view.js"

const createFiltersTemplate = (filterType) => {
    return `<aside class="app-filters">
                <section class="toggle-group">
                <button class='${filterType === 'all' ? 'button button--primary' : 'button'}' data-name="all">All</button>
                <button class='${filterType === 'active' ? 'button button--primary' : 'button'}' data-name="active">Active</button>
                <button class='${filterType === 'done' ? 'button button--primary' : 'button'}' data-name="done">Done</button>
                </section>
            </aside>`
}

export default class FiltersView extends AbstractView {
    #activeFilter = null
    #filterName = FilterType.DEFAULT
    _callback = {}

    constructor(filterType) {
        super()
        this.#activeFilter = filterType
    }

    get template() {
        return createFiltersTemplate(this.#activeFilter)
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
        const filterName = evt.target.getAttribute('data-name')
        this.#filterName = filterName
        this._callback.filterClick?.(this.#filterName)
    }
}