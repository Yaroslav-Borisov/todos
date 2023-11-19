import AbstractView from '../view/abstract-view.js'
import { RenderPosition } from './consts.js'

export const getRandomBoolean = () => {
    return Math.random() < 0.5
}

export const getRandomInt = (start, end) => {
    if (start > end) {
        [start, end] = [end, start]
    }

    return ((Math.random() * (end - start)) + start).toFixed(0)
}

export const getRandomElementArr = (arr) => {
    return arr[getRandomInt(0, arr.length - 1)]
}

export const createElement = (template) => {
    const newElement = document.createElement('div')
    newElement.innerHTML = template

    return newElement.firstChild
}

export const render = (container, element, position) => {
    const parent = container instanceof AbstractView ? container.element : container
    const child = element instanceof AbstractView ? element.element : element

    switch (position) {
        case RenderPosition.BEFOREBEGIN:
            parent.before(child)
            break
        case RenderPosition.AFTERBEGIN:
            parent.prepend(child)
            break
        case RenderPosition.BEFOREEND:
            parent.append(child)
            break
        case RenderPosition.AFTEREND:
            parent.after(child)
            break
    }
}