import { getRandomBoolean, getRandomElementArr, getRandomInt } from "../utils/utils.js"

const TODO_TEXTS = [
    'Learn the basics of React',
    'Learn the basics of Typescript',
    'Subscribe to the channel',
    'Finish reading the book',
    'Walk the dog'
]

export const createTodoItem = () => {
    const todoItem = {
        id: getRandomInt(1, 100000000000000),
        text: getRandomElementArr(TODO_TEXTS),
        done: getRandomBoolean(),
    }

    return todoItem
}