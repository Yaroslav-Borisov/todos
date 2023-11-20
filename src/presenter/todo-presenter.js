import TodoItemsModel from "../model/todo-items-model.js"
import { FilterType, RenderPosition } from "../utils/consts.js"
import { render } from "../utils/utils.js"
import FiltersView from "../view/filters-view.js"
import FooterView from "../view/footer-view.js"
import HeaderView from "../view/header-view.js"
import MainView from "../view/main-view.js"
import TodoFormView from "../view/todo-form.js"
import TodoItemView from "../view/todo-item-view.js"
import TodoListView from "../view/todo-list-view.js"

const app = document.querySelector('#app')

export default class TodoListPresenter {
    #todoItemsModel = new TodoItemsModel()
    #headerComponent = new HeaderView()
    #mainComponent = new MainView()
    #filtersComponent = null
    #todoListComponent = new TodoListView()
    #footerComponent = null
    #todoFormComponent = null
    #formOpenMode = false

    constructor() {
        this.#todoItemsModel.subscribe(this.#renderFilters)
        this.#todoItemsModel.subscribe(this.#initFiltersEvents)
        this.#todoItemsModel.subscribe(this.#renderTodoList)
        this.#todoItemsModel.subscribe(this.#renderForm)
        this.#todoItemsModel.subscribe(this.#renderFooter)
    }

    get todoItems() {
        return this.#todoItemsModel.todoItems
    }

    get filteredTodoItems() {
        return this.#todoItemsModel.filteredTodoItems
    }

    get filterType() {
        return this.#todoItemsModel.filterType
    }

    init = () => {
        this.#renderApp()
    }

    #renderApp = () => {
        this.#renderHeader()
        this.#renderMain()
        this.#renderFilters()
        this.#renderTodoListContainer()
        this.#renderTodoList()
        this.#renderForm()
        this.#initFormEvents()
        this.#renderFooter()
    }

    #renderHeader = () => {
        render(app, this.#headerComponent, RenderPosition.BEFOREEND)
    }

    #renderMain = () => {
        render(app, this.#mainComponent, RenderPosition.BEFOREEND)
    }

    #renderFilters = () => {
        if (this.#filtersComponent !== null) {
            this.#filtersComponent.removeElement()
        }

        this.#filtersComponent = new FiltersView(this.filterType)
        render(this.#mainComponent, this.#filtersComponent, RenderPosition.BEFOREBEGIN)
        this.#initFiltersEvents()
    }

    #renderTodoListContainer = () => {
        render(this.#mainComponent, this.#todoListComponent, RenderPosition.BEFOREEND)
    }

    #renderTodoList = () => {
        if (this.#todoListComponent !== null) {
            this.#todoListComponent.removeElement()
            this.#todoListComponent = new TodoListView()
            this.#renderTodoListContainer()
        }

        for (let i = 0; i < this.filteredTodoItems.length; i++) {
            this.#renderTodoItem(this.filteredTodoItems[i])
        }
    }

    #renderTodoItem = (todoItem) => {
        const todoItemComponent = new TodoItemView(todoItem)
        render(this.#todoListComponent, todoItemComponent, RenderPosition.BEFOREEND)

        todoItemComponent.setItemDoneClickHandler((todoItemId) => {
            this.#todoItemsModel.makeTodoItemDone(todoItemId)
        })

        todoItemComponent.setItemDeleteClickHandler((todoItemId) => {
            this.#todoItemsModel.deleteTodoItem(todoItemId)
        })
    }

    #renderFooter = () => {
        if (this.#footerComponent !== null) {
            this.#footerComponent.removeElement()
        }

        this.#footerComponent = new FooterView(this.todoItems)
        render(this.#mainComponent, this.#footerComponent, RenderPosition.AFTEREND)
    }

    #renderForm = () => {
        if (this.#todoFormComponent !== null) {
            this.#todoFormComponent.removeElement()
        }

        this.#todoFormComponent = new TodoFormView(this.#formOpenMode)
        render(this.#mainComponent, this.#todoFormComponent, RenderPosition.BEFOREEND)
        this.#initFormEvents()
    }

    #initFiltersEvents = () => {
        this.#filtersComponent.setFilterClickHandler((filterName) => {
            this.#todoItemsModel.setfilterType(filterName)
        })
    }

    #initFormEvents = () => {
        this.#todoFormComponent.setOpenFormClickHandler(this.#changeFormMode)
        this.#todoFormComponent.setCloseFormClickHandler(this.#changeFormMode)
        this.#todoFormComponent.setAddNewTaskClickHandler(this.#addNewItem)
    }

    #changeFormMode = () => {
        this.#formOpenMode = !this.#formOpenMode
        this.#renderForm()
    }

    #addNewItem = () => {
        const newItemText = this.#todoFormComponent.inputTextContent

        if (newItemText.trim().length !== 0) {
            this.#todoItemsModel.addNewTodoItem(this.#todoFormComponent.inputTextContent)
        }
        
        this.#changeFormMode()
    }
}