import { RenderPosition } from "./utils/consts.js";
import { render } from "./utils/utils.js";
import FiltersView from "./view/filters-view.js";
import HeaderView from "./view/header-view.js";
import TodoListView from "./view/todo-list-view.js";
import MainView from "./view/main-view.js";
import TodoItemView from "./view/todo-item-view.js";
import TodoFormView from "./view/todo-form.js";
import FooterView from "./view/footer-view.js";
import TodoItemsModel from "./model/todo-items-model.js";
import TodoListPresenter from "./presenter/todo-list-presenter.js";

const app = document.querySelector('#app')
const todoItemsModel = new TodoItemsModel()

const headerComponent = new HeaderView()
render(app, headerComponent, RenderPosition.BEFOREEND)

const mainComponent = new MainView()
render(app, mainComponent, RenderPosition.BEFOREEND)

const todoListPresenter = new TodoListPresenter(todoItemsModel, mainComponent)

todoListPresenter.init()




