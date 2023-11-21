import { BASE_URL } from "../utils/consts.js"

export class Api {
    static getTodos = async (limit = 10) => {
        const response = await fetch(`${BASE_URL}/todos?_limit=${limit}`)
        const json = await response.json()

        return json
    }

    static addTodo = async (newTodoText) => {
        const response = await fetch(`${BASE_URL}/todos`, {
            method: 'POST',
            body: JSON.stringify({
                userId: 1,
                id: 555,
                title: newTodoText,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const json = await response.json()

        return json
    }

    static updateTodo = async (id, update) => {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const json = await response.json()

        return json
    }

    static deleteTodo = async (id) => {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
            method: 'DELETE',
        })

        const json = await response.json()

        return json
    }
}
