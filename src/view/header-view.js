import AbstractView from "./abstract-view.js"

const createHeaderTemplate = () => {
    return `<header class="app-header">
                <span class="logo">TODOS</span>
            </header>`
}

export default class HeaderView extends AbstractView {
    get template() {
        return createHeaderTemplate()
    }
}