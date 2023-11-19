import AbstractView from "./abstract-view.js"

const createMainTemplate = () => {
    return `<main class="app-main">
            </main>`
}

export default class MainView extends AbstractView {

    get template() {
        return createMainTemplate()
    }
}