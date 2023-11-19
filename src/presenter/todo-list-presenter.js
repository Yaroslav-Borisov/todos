import { FilterType, RenderPosition } from "../utils/consts.js"
import { render } from "../utils/utils.js"
import FiltersView from "../view/filters-view.js"
import FooterView from "../view/footer-view.js"
import TodoFormView from "../view/todo-form.js"
import TodoItemView from "../view/todo-item-view.js"
import TodoListView from "../view/todo-list-view.js"

export default class TodoListPresenter {
    #todoItemsModel = null
    #mainComponent = null
    #todoList = []
    #filtersComponent = null
    #todoListComponent = new TodoListView()
    #footerComponent = null
    #todoFormComponent = null

    #filterType = FilterType.DEFAULT
    #formOpenMode = false

    constructor(todoItemsModel, mainComponent) {
        this.#todoItemsModel = todoItemsModel
        this.#todoItemsModel.subscribe(this.#renderTodoList)
        this.#mainComponent = mainComponent
        this.#filtersComponent = new FiltersView(todoItemsModel)
        this.#footerComponent = new FooterView(todoItemsModel)

    }

    get filteredList() {
        switch (this.#filterType) {
            case FilterType.DEFAULT:
                this.#todoList = this.#todoItemsModel.todoItems
                break
            case FilterType.ACTIVE:
                this.#todoList = this.#todoItemsModel.todoItems.filter(item => item.done === false)
                break
            case FilterType.DONE:
                this.#todoList = this.#todoItemsModel.todoItems.filter(item => item.done === true)
                break
        }

        return this.#todoList
    }

    init = () => {
        this.#renderFilters()
        this.#renderTodoListContainer()
        this.#renderTodoList()
        this.#initFiltersEvents()
        this.#renderForm()
        this.#initFormEvents()
        this.#renderFooter()
    }

    #renderFilters = () => {
        render(this.#mainComponent, this.#filtersComponent, RenderPosition.BEFOREBEGIN)
        this.#filtersComponent.setFilterClickHandler()
    }

    #renderTodoListContainer = () => {
        render(this.#mainComponent, this.#todoListComponent, RenderPosition.BEFOREEND)
    }
    
    #renderTodoList = () => {
        if (this.#todoListComponent !== null) {
            this.#todoListComponent.clearTodoList()

            for (let i = 0; i < this.filteredList.length; i++) {
                this.#renderTodoItem(this.filteredList[i])
            }
        }
    }

    #renderTodoItem = (todoItem) => {
        const todoItemComponent = new TodoItemView(todoItem)
        render(this.#todoListComponent, todoItemComponent, RenderPosition.BEFOREEND)

        todoItemComponent.setItemDoneClickHandler((todoItemId) => {
            this.#todoItemsModel.updateTodoItems(todoItemId)
        })

        todoItemComponent.setItemDeleteClickHandler((todoItemId) => {
            this.#todoItemsModel.deleteTodoItem(todoItemId)
        })
    }

    #renderFooter = () => {
        render(this.#mainComponent, this.#footerComponent, RenderPosition.AFTEREND)
    }

    #renderForm = () => {
        if (this.#todoFormComponent !== null) {
            this.#todoFormComponent.clearForm()
        }
        this.#todoFormComponent = new TodoFormView(this.#formOpenMode)
        render(this.#mainComponent, this.#todoFormComponent, RenderPosition.BEFOREEND)
    }

    #initFiltersEvents = () => {
        this.#filtersComponent.setFilterClickHandler((filterName) => {
            this.#filterType = filterName
            this.#renderTodoList()
        })
    }

    #initFormEvents = () => {
        this.#todoFormComponent.setOpenFormClickHandler(this.#changeFormMode)
    }

    #changeFormMode = () => {
        this.#formOpenMode = !this.#formOpenMode
        console.log(this.#formOpenMode)
        this.#renderForm()
    }


}